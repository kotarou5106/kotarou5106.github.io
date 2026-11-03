# jiale → kotarou 按需增量同步

在 kotarou 仓库根目录运行（使用 macOS 自带 Ruby 和标准库，无需安装 gem）：

```sh
ruby scripts/sync-jiale.rb
```

默认源目录是 `~/Projects/jiale0584.github.io`，也可指定：

```sh
ruby scripts/sync-jiale.rb --source /Users/Apple/Projects/jiale0584.github.io
ruby scripts/sync-jiale.rb --dry-run
```

命令输出 JSON，列出 `added`、`skipped`、`conflicts`、`errors` 和 `path_conflicts`。
出现内容差异或无法适配的语法时退出码为 1；请先检查报告。同步命令只生成内容，之后按现有 Git 提交、推送流程发布。

## 身份、路径与保护规则

- 源身份为仓库名和 `_posts/` 相对路径；每篇文章另存原始 URL 和源文件 SHA-256。
- `jiale-sync-manifest.json` 记录源文章、依赖资源和目标文件校验值，应随文章一起提交并保留。
- 默认仅新增。已同步且校验一致时跳过，不重写文章、资源或 manifest；源文、源资源、目标文章或目标资源变化时报告差异，不覆盖。
- 无同步记录的旧文章只在正文、标题、原始时间、分类和标签均完全相同时识别为相同文章；不单凭标题去重。来源身份已存在而缺少同步记录时报告冲突，供人工核查。
- 新路径为 `content/post/jiale-<原日期文件名>/index.md`，Front Matter 的 `slug` 与目录一致，URL 使用既有 `/p/:slug/`。目录或 slug 已占用时追加来源路径哈希，保留标题和日期。
- 本地资源放在 bundle 的 `assets/<内容哈希前缀>-<原文件名>`，同内容资源优先复用既有 bundle/static 文件。外部 URL 原样保留；源资源缺失或越出源仓库时报告错误。
- 不认识的 Liquid 语法会报告异常，保留源内容待适配。已支持资源 URL 中的 `site.baseurl`、`site.url`、`relative_url`、`absolute_url`。代码块和行内代码中的模板示例保持原样。

## 内容适配

- 标题、描述及其他内容元数据沿用源值；分类映射到 `categories`、标签映射到 `tags`。不合并、重命名或补充分类/标签。
- 保留原日期的时分秒；显式时区保持原偏移。源文无时区时间按作者发布提交和本地写作环境使用的 `+08:00` 解释，输出带时区的 ISO 8601。更新时间字段（如果存在）适配到 `lastmod`。
- `lang` 放到既有文章使用的 `params.lang`，避免 Hugo 把作者内容语言当成站点多语言路由。Jekyll 布局、侧边栏位置、预渲染文件路径和永久链接等渲染控制字段不作为 Hugo 布局指令沿用。
- Markdown 是源仓库 `_plugins/blog_writer_shared_renderer.rb` 明确指定的 canonical editable document。3 篇文章原有的 `_blog_writer/` HTML 是预渲染缓存，本次从 Markdown 保留正文及 TeX，在目标站使用现有 MathJax 渲染。
- 行内 `$…$` 转为现有 Goldmark passthrough 支持的 `\(...\)`，保护反斜杠和下划线。
- 块公式使用局部 `<div data-jiale-math="display">` HTML 保护，避免 Goldmark 把公式里的独立 `=` 当成 Setext 标题。公式中的 HTML 特殊字符做实体编码，由浏览器解码后交给 MathJax，LaTeX 内容不变。此转换不需要改主题、布局、样式或站点 Markdown 配置。

## 2026-11-03 首次同步验收

| 项目 | 结果 |
| --- | --- |
| 源 jiale 文章 | 10 篇，保持不变 |
| kotarou 原有文章 | 32 篇，保持不变 |
| 新增 / 原已存在跳过 | 10 / 0 篇 |
| 同步后文章 | 42 篇，Hugo 生产构建及 Blog 索引均为 42 |
| 身份冲突 / 路径冲突 / 转换异常 | 均为 0 |
| 分类 / 标签 | 10 篇全部保留 `LLM`；原标签全部为空，未新增标签 |
| 资源 | 9 张本地 PNG；源、目标及生成文件逐字节一致 |
| 正文 | 10 篇均在还原必要格式适配后与源正文完全一致 |
| 原文件保护 | jiale 的 57 个文章/资源文件、kotarou 的 156 个原 content 文件全部 SHA-256 一致；jiale Git 工作区仍干净 |
| 公式 / 围栏代码块 | 1,173 个行内公式、190 个块公式在生成 HTML 中保留原始 TeX；1 个 `text` 围栏代码块语言和内容保留 |
| 重复运行 | 新增 0，跳过 10；文章、资源和 manifest 的字节及 mtime 均不变 |

原始时间（Hugo 实际解析的 `date` 和 `publishDate` 一致）：

| 标题 | 日期时间 |
| --- | --- |
| Transformer 架构复习 | 2026-09-03T20:13:32+08:00 |
| 现代LLM 的改进 | 2026-09-24T18:01:34+08:00 |
| LLM 训练优化 | 2026-09-27T00:24:34+08:00 |
| LoRA & QLoRA | 2026-09-27T15:52:01+08:00 |
| MoE | 2026-09-27T20:19:34+08:00 |
| GPU 和 LLM | 2026-09-28T13:17:00+08:00 |
| LLM & RL | 2026-09-28T16:33:42+08:00 |
| vLLM | 2026-09-28T15:45:55+08:00 |
| OPSD | 2026-09-29T14:29:57+08:00 |
| Agent RL 概论 | 2026-10-02T20:56:27+08:00 |

### 构建与实际渲染核对

为避免把工作区中原有的图片删除和未跟踪资源混入发布验收，从 Git HEAD 导出临时副本，仅加入本次同步文件，使用与既有 Actions 相同的 Hugo **0.160.1 extended** 执行：

```sh
hugo --environment production --gc --minify --printPathWarnings
```

构建成功，无 URL 冲突警告：78 个 Hugo 页面（包含分类、标签等非文章页）、42 篇文章、91 个非页面 bundle 文件。10 篇新增文章全部真实生成；Blog JSON 索引和 `/categories/llm/` 均包含它们。站点原有 `timeZone = "Asia/Shanghai"` 足够，无配置修改。

Chromium 浏览器抽查 **Transformer 架构复习、现代LLM 的改进、LLM & RL、Agent RL 概论**：实际 MathJax 公式节点分别为 **99、355、397、113**，共 **964**，无 MathJax 或页面脚本错误；抽查涉及的 7 张图片全部成功解码。其余 2 张图片通过字节和生成资源路径核对。`/blog/?category=LLM` 两页合计找到全部 10 篇新文章。

源文章没有脚注或 `<figure>`，因此另在隔离样例中确认：`<figure>` 图注、内部锚点、Markdown 脚注的前向链接和返回链接、代码块均保留；同标题不同文章不会去重；路径冲突自动避让；相同资源复用；显式非东八区时间保留；源文、源资源和目标内容修改均报告冲突且不覆盖。
