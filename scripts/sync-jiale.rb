#!/usr/bin/env ruby
# frozen_string_literal: true

# One-way, add-only synchronization. Uses only Ruby's standard library.
require 'yaml'
require 'json'
require 'date'
require 'time'
require 'digest'
require 'pathname'
require 'fileutils'
require 'optparse'
require 'uri'
require 'cgi'

module JialeSync
  REPOSITORY = 'jiale0584/jiale0584.github.io'
  ROOT = File.expand_path('..', __dir__)
  MANIFEST = 'scripts/jiale-sync-manifest.json'

  def self.sha(bytes)
    Digest::SHA256.hexdigest(bytes)
  end

  def self.read_post(path)
    text = File.read(path, encoding: 'UTF-8')
    match = text.match(/\A---\r?\n(.*?)\r?\n---[^\n]*\n(.*)\z/m)
    raise "Unsupported front matter: #{path}" unless match
    # Psych 3 (macOS system Ruby) needs quoted timestamps in flow mappings.
    yaml = match[1].gsub(/(?<=: )(\d{4}-\d\d-\d\d[ T]\d\d:\d\d:\d\d(?:\s*[+-]\d\d:?\d\d|Z)?)(?=\s*[,}\n])/, '"\1"')
    [YAML.safe_load(yaml, permitted_classes: [Time, Date]), match[2]]
  end

  def self.date(value, fallback = nil)
    text = (value || fallback).to_s
    raise 'Missing original publication date' if text.empty?
    # Source posts have local wall-clock timestamps; publication commits and
    # the authoring environment use +08:00. Explicit source offsets win.
    text += ' +08:00' unless text.match?(/(?:Z|[+-]\d\d:?\d\d)\z/)
    Time.parse(text).iso8601
  end

  # Yield editable prose while keeping fenced/inline code and HTML tags opaque.
  # Math is handled before Markdown sees it, so underscores and backslashes
  # survive Goldmark unchanged. No prose, whitespace or LaTeX is rewritten.
  def self.convert_body(body, &rewrite_url)
    opaque = []
    protect = lambda { |s| opaque << s; "\u0000JIALE#{opaque.length - 1}\u0000" }
    text = body.gsub(/^ {0,3}(`{3,}|~{3,})[^\n]*\n.*?^ {0,3}\1[ \t]*(?:\n|\z)/m) { |s| protect.call(s) }
    text = text.gsub(/(`+)[^`]*?\1/m) { |s| protect.call(s) }
    text = text.gsub(/\{\{\s*['"]([^'"]+)['"]\s*\|\s*(?:relative_url|absolute_url)\s*\}\}/) { Regexp.last_match(1) }
    text = text.gsub(/\{\{\s*site\.(?:baseurl|url)\s*\}\}/, '')
    raise 'Unadapted Liquid/Hugo template syntax; no content written' if text.match?(/\{%|\{\{/)
    text = text.gsub(/\$\$.*?\$\$|\\\[.*?\\\]/m) do |s|
      # Goldmark can parse a standalone '=' inside $$ as a Setext heading
      # before passthrough runs. A raw HTML block keeps the exact TeX opaque.
      protect.call("\n\n<div data-jiale-math=\"display\">\n#{CGI.escapeHTML(s)}\n</div>\n\n")
    end
    text = text.gsub(/\\\(.*?\\\)/m) { |s| protect.call(CGI.escapeHTML(s)) }
    text = text.gsub(/(?<![\\$])\$([^$\n]+?)\$(?!\$)/) { protect.call('\\(' + CGI.escapeHTML(Regexp.last_match(1)) + '\\)') }
    # Only URL positions are changed. Normal external URLs are returned intact.
    text = text.gsub(/((?:src|href|poster)\s*=\s*)(["'])(.*?)\2/i) do
      m = Regexp.last_match
      m[1] + m[2] + rewrite_url.call(m[3]) + m[2]
    end
    text = text.gsub(/(\]\(<?)([^\s)>]+)(>?)/) do
      m = Regexp.last_match
      m[1] + rewrite_url.call(m[2]) + m[3]
    end
    text = text.gsub(/^(\s*\[(?!\^)[^\]\n]+\]:\s*<?)([^\s>]+)(>?)/) do
      m = Regexp.last_match
      m[1] + rewrite_url.call(m[2]) + m[3]
    end
    text.gsub(/\u0000JIALE(\d+)\u0000/) { opaque[Regexp.last_match(1).to_i] }
  end

  def self.run(argv)
    options = { source: File.expand_path('~/Projects/jiale0584.github.io'), dry: false }
    OptionParser.new do |parser|
      parser.banner = 'Usage: ruby scripts/sync-jiale.rb [--source PATH] [--dry-run]'
      parser.on('--source PATH') { |v| options[:source] = File.expand_path(v) }
      parser.on('--dry-run') { options[:dry] = true }
    end.parse!(argv)
    source = options[:source]
    raise "Source _posts not found: #{source}" unless File.directory?(File.join(source, '_posts'))
    manifest_path = File.join(ROOT, MANIFEST)
    manifest = File.exist?(manifest_path) ? JSON.parse(File.read(manifest_path)) : { 'version' => 1, 'repository' => REPOSITORY, 'posts' => {} }
    raise 'Unexpected manifest repository/version' unless manifest['repository'] == REPOSITORY && manifest['version'] == 1
    existing = Dir.glob(File.join(ROOT, 'content/post/**/*.{md,markdown,html}')).map do |path|
      meta, body = read_post(path)
      { path: path, meta: meta, body: body }
    end
    used_slugs = existing.map { |p| (p[:meta]['slug'] || File.basename(File.dirname(p[:path]))).downcase }
    used_urls = existing.map { |p| p[:meta]['url'] }.compact
    # Index existing published bundle/static assets by bytes, never by filename.
    asset_index = {}
    existing.each do |post|
      next unless File.basename(post[:path]).match?(/\Aindex\./)
      directory = File.dirname(post[:path])
      slug = post[:meta]['slug'] || File.basename(directory)
      Dir.glob(File.join(directory, '**/*')).select { |p| File.file?(p) && p != post[:path] }.each do |asset|
        relative = Pathname.new(asset).relative_path_from(Pathname.new(ROOT)).to_s
        url = (post[:meta]['url'] || "/p/#{slug}/").sub(/\/?\z/, '/') + asset.delete_prefix(directory + '/')
        asset_index[sha(File.binread(asset))] ||= [relative, url]
      end
    end
    Dir.glob(File.join(ROOT, 'static/**/*')).select { |p| File.file?(p) }.each do |asset|
      relative = Pathname.new(asset).relative_path_from(Pathname.new(ROOT)).to_s
      asset_index[sha(File.binread(asset))] ||= [relative, '/' + relative.delete_prefix('static/')]
    end
    report = { source_count: 0, added: [], skipped: [], conflicts: [], errors: [], path_conflicts: [] }
    changed = false
    Dir.glob(File.join(source, '_posts/**/*.{md,markdown}')).sort.each do |path|
      report[:source_count] += 1
      relative = Pathname.new(path).relative_path_from(Pathname.new(source)).to_s
      begin
        meta, body = read_post(path)
        source_sha = sha(File.binread(path))
        record = manifest['posts'][relative]
        if record
          differences = []
          differences << 'source article changed' unless source_sha == record['source_sha256']
          record.fetch('source_resources', {}).each do |name, hash|
            file = File.join(source, name)
            differences << "source resource changed/missing: #{name}" unless File.file?(file) && sha(File.binread(file)) == hash
          end
          record.fetch('target_files').each do |name, hash|
            file = File.join(ROOT, name)
            differences << "target changed/missing: #{name}" unless File.file?(file) && sha(File.binread(file)) == hash
          end
          if differences.empty?
            report[:skipped] << relative
          else
            report[:conflicts] << { source: relative, reasons: differences }
          end
          next
        end
        identities = existing.select do |post|
          origin = post[:meta]['jiale_source'] || {}
          origin['repository'] == REPOSITORY && origin['path'] == relative
        end
        unless identities.empty?
          report[:conflicts] << { source: relative, reasons: ['source identity exists without manifest; inspect before adoption'], targets: identities.map { |p| p[:path] } }
          next
        end
        name = File.basename(path, File.extname(path))
        slug = "jiale-#{name}".downcase
        base = slug
        counter = 0
        while used_slugs.include?(slug) || used_urls.include?("/p/#{slug}/") || File.exist?(File.join(ROOT, 'content/post', slug))
          counter += 1
          slug = "#{base}-#{sha(relative)[0, 8]}#{counter == 1 ? '' : "-#{counter}"}"
        end
        report[:path_conflicts] << { source: relative, slug: slug } if counter > 0
        bundle = "content/post/#{slug}"
        files = {}
        reused_targets = {}
        resources = {}
        resource_urls = {}
        rewrite = lambda do |url|
          next url if url.match?(/\A(?:[a-z][a-z\d+.-]*:|\/\/|#)/i)
          raw_path, suffix = url.split(/(?=[?#])/, 2)
          decoded = URI::DEFAULT_PARSER.unescape(raw_path)
          candidate = File.expand_path(decoded.start_with?('/') ? decoded.sub(/\A\//, '') : decoded, decoded.start_with?('/') ? source : File.dirname(path))
          raise "Unresolved local link: #{url}" unless candidate.start_with?(source + '/') && File.file?(candidate)
          raise "Resource escapes source: #{url}" unless File.realpath(candidate).start_with?(File.realpath(source) + '/')
          rel = Pathname.new(candidate).relative_path_from(Pathname.new(source)).to_s
          bytes = File.binread(candidate)
          hash = sha(bytes)
          resources[rel] = hash
          destination = resource_urls[hash]
          unless destination
            if asset_index[hash]
              target, destination = asset_index[hash]
              reused_targets[target] = hash
            else
              asset = "assets/#{hash[0, 12]}-#{File.basename(candidate)}"
              files["#{bundle}/#{asset}"] = bytes
              destination = asset
            end
            resource_urls[hash] = destination
          end
          destination + suffix.to_s
        end
        converted = convert_body(body, &rewrite)
        publication = date(meta['date'], name[0, 10])
        categories = meta.fetch('categories', meta.fetch('category', []))
        tags = meta.fetch('tags', [])
        categories = categories.split if categories.is_a?(String)
        tags = tags.split if tags.is_a?(String)
        title_slug = name.sub(/\A\d{4}-\d\d-\d\d-/, '')
        origin_url = "https://jiale0584.github.io/blog/#{publication[0, 4]}/#{title_slug}/"
        front = meta.reject { |k, _| %w[layout date lang categories category tags toc permalink slug url published blog_writer_rendered_body last_modified_at updated updated_at lastmod].include?(k) }
        front.merge!('date' => publication, 'categories' => categories, 'tags' => tags, 'slug' => slug, 'draft' => meta['published'] == false)
        front['params'] = (meta['params'] || {}).merge('lang' => meta['lang']) if meta['lang']
        modified = meta['lastmod'] || meta['last_modified_at'] || meta['updated_at'] || meta['updated']
        front['lastmod'] = date(modified) if modified
        front['jiale_source'] = { 'repository' => REPOSITORY, 'path' => relative, 'url' => origin_url, 'sha256' => source_sha }
        # Never deduplicate on title. A prior untracked import can only be
        # recognized by identical complete body AND original metadata.
        equivalents = existing.select do |p|
          p[:body] == converted && p[:meta]['title'] == meta['title'] &&
            date(p[:meta]['date']) == publication && p[:meta].fetch('categories', []) == categories && p[:meta].fetch('tags', []) == tags
        end
        if equivalents.length == 1
          target = equivalents[0][:path]
          files = { Pathname.new(target).relative_path_from(Pathname.new(ROOT)).to_s => File.binread(target) }
          report[:skipped] << relative
        elsif equivalents.length > 1
          raise 'Multiple exact existing copies; inspect duplicates'
        else
          files["#{bundle}/index.md"] = YAML.dump(front) + "---\n" + converted
          files.each_key { |target| raise "Refusing to overwrite #{target}" if File.exist?(File.join(ROOT, target)) }
          unless options[:dry]
            files.each do |target, bytes|
              full = File.join(ROOT, target)
              FileUtils.mkdir_p(File.dirname(full))
              File.open(full, File::WRONLY | File::CREAT | File::EXCL) { |file| file.write(bytes) }
            end
          end
          used_slugs << slug
          files.each do |target, bytes|
            next if target.end_with?('/index.md')
            asset_index[sha(bytes)] ||= [target, "/p/#{slug}/#{target.delete_prefix(bundle + '/')}" ]
          end
          report[:added] << { source: relative, target: "#{bundle}/index.md", title: meta['title'], date: publication, resources: resources.length }
        end
        manifest['posts'][relative] = { 'source_sha256' => source_sha, 'source_resources' => resources, 'target_files' => files.transform_values { |bytes| sha(bytes) }.merge(reused_targets) }
        changed = true
      rescue StandardError => error
        report[:errors] << { source: relative, error: error.message }
      end
    end
    if changed && !options[:dry]
      File.write(manifest_path, JSON.pretty_generate(manifest) + "\n")
    end
    puts JSON.pretty_generate(report)
    report[:conflicts].empty? && report[:errors].empty? ? 0 : 1
  end
end

exit JialeSync.run(ARGV) if $PROGRAM_NAME == __FILE__
