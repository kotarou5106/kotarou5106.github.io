(function () {
    var media = window.matchMedia("(prefers-color-scheme: dark)");

    function applyTheme(theme) {
        var dark = theme === "dark" || (theme === "system" && media.matches);
        document.documentElement.dataset.theme = dark ? "dark" : "light";
        document.querySelectorAll("[data-set-theme]").forEach(function (button) {
            button.setAttribute("aria-pressed", button.dataset.setTheme === theme ? "true" : "false");
        });
    }

    document.querySelectorAll("[data-set-theme]").forEach(function (button) {
        button.addEventListener("click", function () {
            var theme = button.dataset.setTheme;
            if (theme === "system") localStorage.removeItem("theme");
            else localStorage.setItem("theme", theme);
            applyTheme(theme);
        });
    });

    media.addEventListener("change", function () {
        if (!localStorage.getItem("theme")) applyTheme("system");
    });

    applyTheme(localStorage.getItem("theme") || "system");

    document.querySelectorAll(".article-content pre").forEach(function (pre) {
        var cell = pre.closest("td");
        if (cell && cell !== cell.parentElement.lastElementChild) return;
        var button = document.createElement("button");
        button.type = "button";
        button.className = "copy-code";
        button.textContent = "Copy";
        button.addEventListener("click", function () {
            var code = pre.querySelector("code");
            navigator.clipboard.writeText(code ? code.textContent : pre.textContent || "").then(function () {
                button.textContent = "Copied";
                window.setTimeout(function () { button.textContent = "Copy"; }, 1600);
            });
        });
        pre.appendChild(button);
    });

    function initArticleToc() {
        var root = document.querySelector("[data-article-toc]");
        if (!root) return;

        var panel = root.querySelector(".article-toc-panel");
        var openButton = root.querySelector("[data-toc-open]");
        var closeButtons = root.querySelectorAll("[data-toc-close]");
        var links = Array.from(root.querySelectorAll('.article-toc-scroll a[href^="#"]'));
        var wide = window.matchMedia("(min-width: 1350px)");
        var userChoice = null;

        function setOpen(open, moveFocus) {
            root.dataset.state = open ? "open" : "closed";
            panel.setAttribute("aria-hidden", open ? "false" : "true");
            panel.inert = !open;
            openButton.setAttribute("aria-expanded", open ? "true" : "false");
            openButton.tabIndex = open ? -1 : 0;
            closeButtons.forEach(function (button) {
                button.setAttribute("aria-expanded", open ? "true" : "false");
            });
            if (moveFocus) {
                if (open) panel.querySelector("[data-toc-close]").focus();
                else openButton.focus();
            }
        }

        function openToc() {
            userChoice = true;
            setOpen(true, true);
        }

        function closeToc() {
            userChoice = false;
            setOpen(false, true);
        }

        openButton.addEventListener("click", openToc);
        closeButtons.forEach(function (button) {
            button.addEventListener("click", closeToc);
        });

        wide.addEventListener("change", function () {
            if (userChoice === null) setOpen(wide.matches, false);
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && root.dataset.state === "open") {
                closeToc();
                return;
            }
            if (event.key !== "Tab" || wide.matches || root.dataset.state !== "open") return;
            var focusable = Array.from(panel.querySelectorAll("a, button"));
            var first = focusable[0];
            var last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        });

        links.forEach(function (link) {
            link.addEventListener("click", function () {
                if (!wide.matches) {
                    userChoice = false;
                    setOpen(false, false);
                    var heading = document.getElementById(decodeURIComponent(link.hash.slice(1)));
                    if (heading) {
                        heading.tabIndex = -1;
                        window.requestAnimationFrame(function () {
                            heading.focus({ preventScroll: true });
                        });
                        heading.addEventListener("blur", function () {
                            heading.removeAttribute("tabindex");
                        }, { once: true });
                    }
                }
            });
        });

        var headings = links.map(function (link) {
            return document.getElementById(decodeURIComponent(link.hash.slice(1)));
        }).filter(Boolean);

        if (headings.length) {
            var frame;
            function updateActiveHeading() {
                frame = null;
                var threshold = window.innerHeight * 0.28;
                var active = headings[0];
                headings.forEach(function (heading) {
                    if (heading.getBoundingClientRect().top <= threshold) active = heading;
                });
                links.forEach(function (link) {
                    if (decodeURIComponent(link.hash.slice(1)) === active.id) link.setAttribute("aria-current", "location");
                    else link.removeAttribute("aria-current");
                });
                var current = root.querySelector('[aria-current="location"]');
                if (current && root.dataset.state === "open") current.scrollIntoView({ block: "nearest" });
            }
            function requestActiveHeadingUpdate() {
                if (!frame) frame = window.requestAnimationFrame(updateActiveHeading);
            }
            window.addEventListener("scroll", requestActiveHeadingUpdate, { passive: true });
            window.addEventListener("resize", requestActiveHeadingUpdate);
            updateActiveHeading();
        }

        setOpen(wide.matches, false);
    }

    function initBlog() {
        var root = document.querySelector("[data-blog-page]");
        if (!root) return;

        var indexElement = root.querySelector("[data-blog-index]");
        var searchInput = root.querySelector("[data-blog-search]");
        var fallback = root.querySelector("[data-blog-fallback]");
        var tagFilters = root.querySelector("[data-tag-filters]");
        var empty = root.querySelector("[data-blog-empty]");
        var pagination = root.querySelector("[data-blog-pagination]");
        var pageNumbers = root.querySelector("[data-page-numbers]");
        var previous = root.querySelector("[data-page-prev]");
        var next = root.querySelector("[data-page-next]");
        var jump = root.querySelector("[data-page-jump]");
        var postsPerPage = 5;
        var untagged = "未标注标签";
        var uncategorized = "未分类";
        var timer;
        var posts;

        try {
            posts = JSON.parse(indexElement.textContent);
        } catch (error) {
            return;
        }

        var categoryTags = new Map();
        var tagCategories = new Map();

        posts.forEach(function (post) {
            post.categories = post.categories.length ? post.categories : [uncategorized];
            post.tags = post.tags.length ? post.tags : [untagged];
            post.categories.forEach(function (category) {
                if (!categoryTags.has(category)) categoryTags.set(category, new Set());
                post.tags.forEach(function (tag) {
                    categoryTags.get(category).add(tag);
                    if (!tagCategories.has(tag)) tagCategories.set(tag, new Set());
                    tagCategories.get(tag).add(category);
                });
            });
        });

        var categories = Array.from(categoryTags.keys()).sort(function (a, b) { return a.localeCompare(b); });
        var tags = Array.from(tagCategories.keys()).sort(function (a, b) { return a.localeCompare(b); });
        var state = readState();

        function readState() {
            var params = new URLSearchParams(window.location.search);
            var next = {
                category: canonical(params.get("category"), categories),
                tag: canonical(params.get("tag"), tags),
                query: params.get("q") || "",
                page: Math.max(1, parseInt(params.get("page"), 10) || 1)
            };
            if (next.category && next.tag && !tagCategories.get(next.tag).has(next.category)) next.category = "";
            return next;
        }

        function normalize(value) {
            return String(value || "").trim().toLocaleLowerCase();
        }

        function canonical(value, values) {
            var normalized = normalize(value);
            return values.find(function (item) { return normalize(item) === normalized; }) || "";
        }

        function matchesSearch(post) {
            var query = normalize(state.query);
            return !query || normalize(post.title + " " + post.description + " " + post.body).includes(query);
        }

        function createButton(value, label, category) {
            var button = document.createElement("button");
            button.type = "button";
            button.dataset.filterValue = value;
            if (category) button.dataset.filterCategory = category;
            button.textContent = label;
            button.setAttribute("aria-pressed", state.tag === value ? "true" : "false");
            return button;
        }

        function renderTagFilters() {
            tagFilters.replaceChildren();
            var all = document.createElement("div");
            all.className = "filter-chips tag-all";
            all.appendChild(createButton("", "All"));
            tagFilters.appendChild(all);

            var visibleCategories = state.category ? [state.category] : categories;
            visibleCategories.forEach(function (category) {
                var cluster = document.createElement("div");
                cluster.className = "tag-filter-cluster";
                if (!state.category) {
                    var label = document.createElement("span");
                    label.className = "tag-cluster-label";
                    label.textContent = category;
                    cluster.appendChild(label);
                }
                var chips = document.createElement("div");
                chips.className = "filter-chips";
                Array.from(categoryTags.get(category)).sort(function (a, b) { return a.localeCompare(b); }).forEach(function (tag) {
                    chips.appendChild(createButton(tag, tag, category));
                });
                cluster.appendChild(chips);
                tagFilters.appendChild(cluster);
            });
        }

        function createPostList(list, showCategories) {
            var ul = document.createElement("ul");
            ul.className = "post-list blog-post-list";
            list.forEach(function (post) {
                var li = document.createElement("li");
                var link = document.createElement("a");
                link.href = post.url;
                var copy = document.createElement("span");
                copy.className = "post-list-copy";
                var title = document.createElement("span");
                title.className = "post-list-title";
                title.textContent = post.title;
                copy.appendChild(title);
                if (showCategories) {
                    var postCategories = document.createElement("span");
                    postCategories.className = "post-list-categories";
                    postCategories.textContent = "分类：" + post.categories.join(" / ");
                    copy.appendChild(postCategories);
                }
                var time = document.createElement("time");
                time.dateTime = post.date;
                time.textContent = post.dateDisplay;
                link.append(copy, time);
                li.appendChild(link);
                ul.appendChild(li);
            });
            return ul;
        }

        function renderTagView(pagePosts) {
            var fragment = document.createDocumentFragment();
            var header = document.createElement("header");
            header.className = "result-context";
            var relatedCategories = Array.from(tagCategories.get(state.tag)).sort(function (a, b) { return a.localeCompare(b); });
            var path = document.createElement("p");
            path.className = "result-path";
            path.textContent = (state.category || relatedCategories.join(" / ")) + " / " + state.tag;
            var heading = document.createElement("h2");
            heading.textContent = state.tag;
            var relationship = document.createElement("p");
            relationship.className = "result-relationship";
            relationship.textContent = "所属分类：" + relatedCategories.join(" / ");
            header.append(path, heading, relationship);
            fragment.append(header, createPostList(pagePosts, true));
            return fragment;
        }

        function renderHierarchy(pagePosts, scopePosts) {
            var fragment = document.createDocumentFragment();
            var visibleCategories = state.category ? [state.category] : categories;

            visibleCategories.forEach(function (category) {
                var categoryPosts = pagePosts.filter(function (post) { return post.categories.includes(category); });
                if (!categoryPosts.length) return;
                var section = document.createElement("section");
                section.className = "category-result";
                var heading = document.createElement("h2");
                heading.textContent = category;
                section.appendChild(heading);

                Array.from(categoryTags.get(category)).sort(function (a, b) { return a.localeCompare(b); }).forEach(function (tag) {
                    var groupPosts = categoryPosts.filter(function (post) { return post.tags.includes(tag); });
                    if (!groupPosts.length) return;
                    var total = scopePosts.filter(function (post) {
                        return post.categories.includes(category) && post.tags.includes(tag);
                    }).length;
                    var group = document.createElement("section");
                    group.className = "tag-result";
                    var groupHeading = document.createElement("h3");
                    groupHeading.textContent = tag;
                    var count = document.createElement("span");
                    count.textContent = total + " 篇";
                    groupHeading.appendChild(count);
                    group.append(groupHeading, createPostList(groupPosts, false));
                    section.appendChild(group);
                });
                fragment.appendChild(section);
            });
            return fragment;
        }

        function filteredPosts() {
            return posts.filter(function (post) {
                if (!matchesSearch(post)) return false;
                if (state.tag) return post.tags.includes(state.tag);
                if (state.category) return post.categories.includes(state.category);
                return true;
            });
        }

        function showResults(content) {
            var panel = document.createElement("div");
            panel.className = "result-panel result-enter";
            panel.appendChild(content);
            fallback.replaceChildren(panel);
            window.requestAnimationFrame(function () { panel.classList.add("show"); });
        }

        function setPressed(group, value) {
            root.querySelectorAll('[data-filter-group="' + group + '"] [data-filter-value]').forEach(function (button) {
                button.setAttribute("aria-pressed", button.dataset.filterValue === value ? "true" : "false");
            });
        }

        function renderPageNumbers(totalPages) {
            pageNumbers.replaceChildren();
            for (var page = 1; page <= totalPages; page += 1) {
                var button = document.createElement("button");
                button.type = "button";
                button.textContent = page;
                button.dataset.page = page;
                button.setAttribute("aria-label", "Page " + page);
                if (page === state.page) button.setAttribute("aria-current", "page");
                pageNumbers.appendChild(button);
            }
        }

        function render() {
            var filtered = filteredPosts();
            var totalPages = Math.max(1, Math.ceil(filtered.length / postsPerPage));
            state.page = Math.min(state.page, totalPages);
            var first = (state.page - 1) * postsPerPage;
            var pagePosts = filtered.slice(first, first + postsPerPage);

            empty.hidden = filtered.length !== 0;
            pagination.hidden = filtered.length === 0;
            previous.disabled = state.page === 1;
            next.disabled = state.page === totalPages;
            jump.max = totalPages;
            renderPageNumbers(totalPages);
            renderTagFilters();
            setPressed("category", state.category);
            setPressed("tag", state.tag);
            if (searchInput.value !== state.query) searchInput.value = state.query;
            if (filtered.length) showResults(state.tag ? renderTagView(pagePosts) : renderHierarchy(pagePosts, filtered));
            else fallback.replaceChildren();
        }

        function updateUrl(mode) {
            var url = new URL(window.location.href);
            [["category", state.category], ["tag", state.tag], ["q", state.query]].forEach(function (entry) {
                if (entry[1]) url.searchParams.set(entry[0], entry[1]);
                else url.searchParams.delete(entry[0]);
            });
            if (state.page > 1) url.searchParams.set("page", state.page);
            else url.searchParams.delete("page");
            window.history[mode + "State"]({}, "", url);
        }

        function apply(mode, scroll) {
            render();
            updateUrl(mode);
            if (scroll) root.scrollIntoView({ behavior: "smooth", block: "start" });
        }

        root.addEventListener("click", function (event) {
            var button = event.target.closest("[data-filter-value]");
            if (!button || !root.contains(button)) return;
            var group = button.closest("[data-filter-group]");
            if (group.dataset.filterGroup === "category") {
                state.category = button.dataset.filterValue;
                state.tag = "";
            } else {
                state.tag = button.dataset.filterValue;
                if (state.tag && !state.category) state.category = button.dataset.filterCategory || "";
            }
            state.page = 1;
            apply("push", false);
        });

        searchInput.addEventListener("input", function () {
            window.clearTimeout(timer);
            timer = window.setTimeout(function () {
                state.query = searchInput.value.trim();
                state.page = 1;
                apply("replace", false);
            }, 250);
        });

        searchInput.addEventListener("keydown", function (event) {
            if (event.key !== "Enter") return;
            event.preventDefault();
            window.clearTimeout(timer);
            state.query = searchInput.value.trim();
            state.page = 1;
            apply("push", false);
        });

        pagination.addEventListener("click", function (event) {
            var pageButton = event.target.closest("[data-page]");
            if (pageButton) state.page = Number(pageButton.dataset.page);
            else if (event.target.closest("[data-page-prev]") && !previous.disabled) state.page -= 1;
            else if (event.target.closest("[data-page-next]") && !next.disabled) state.page += 1;
            else return;
            apply("push", true);
        });

        jump.addEventListener("keydown", function (event) {
            if (event.key !== "Enter") return;
            event.preventDefault();
            var page = Number(jump.value);
            if (page >= 1 && page <= Number(jump.max)) {
                state.page = page;
                apply("push", true);
            }
            jump.value = "";
        });

        window.addEventListener("popstate", function () {
            state = readState();
            render();
        });

        render();
    }

    initArticleToc();
    initBlog();

    window.requestAnimationFrame(function () {
        document.querySelectorAll(".animate").forEach(function (element, index) {
            element.style.transitionDelay = index * 150 + "ms";
            element.classList.add("show");
        });
    });
})();
