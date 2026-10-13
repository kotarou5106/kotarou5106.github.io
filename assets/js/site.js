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

    function initBlog() {
        var root = document.querySelector("[data-blog-page]");
        if (!root) return;

        var indexElement = root.querySelector("[data-blog-index]");
        var searchInput = root.querySelector("[data-blog-search]");
        var items = Array.from(root.querySelectorAll("[data-post-url]"));
        var empty = root.querySelector("[data-blog-empty]");
        var pagination = root.querySelector("[data-blog-pagination]");
        var pageNumbers = root.querySelector("[data-page-numbers]");
        var previous = root.querySelector("[data-page-prev]");
        var next = root.querySelector("[data-page-next]");
        var jump = root.querySelector("[data-page-jump]");
        var postsPerPage = 5;
        var timer;
        var posts;

        try {
            posts = JSON.parse(indexElement.textContent);
        } catch (error) {
            return;
        }

        var postsByUrl = new Map(posts.map(function (post) { return [post.url, post]; }));
        var state = readState();

        function readState() {
            var params = new URLSearchParams(window.location.search);
            return {
                category: params.get("category") || "",
                tag: params.get("tag") || "",
                query: params.get("q") || "",
                page: Math.max(1, parseInt(params.get("page"), 10) || 1)
            };
        }

        function normalize(value) {
            return String(value || "").trim().toLocaleLowerCase();
        }

        function matches(post) {
            var category = normalize(state.category);
            var tag = normalize(state.tag);
            var query = normalize(state.query);
            var categories = (post.categories || []).map(normalize);
            var tags = (post.tags || []).map(normalize);

            return (!category || categories.includes(category)) &&
                (!tag || tags.includes(tag)) &&
                (!query || normalize(post.title + " " + post.body).includes(query));
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
            var filtered = items.filter(function (item) {
                var post = postsByUrl.get(item.dataset.postUrl);
                return post && matches(post);
            });
            var totalPages = Math.max(1, Math.ceil(filtered.length / postsPerPage));
            state.page = Math.min(state.page, totalPages);
            var first = (state.page - 1) * postsPerPage;
            var visible = new Set(filtered.slice(first, first + postsPerPage));

            items.forEach(function (item) { item.hidden = !visible.has(item); });
            empty.hidden = filtered.length !== 0;
            pagination.hidden = filtered.length === 0;
            previous.disabled = state.page === 1;
            next.disabled = state.page === totalPages;
            jump.max = totalPages;
            renderPageNumbers(totalPages);
            setPressed("category", state.category);
            setPressed("tag", state.tag);
            if (searchInput.value !== state.query) searchInput.value = state.query;
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

        root.querySelectorAll("[data-filter-group]").forEach(function (group) {
            group.addEventListener("click", function (event) {
                var button = event.target.closest("[data-filter-value]");
                if (!button) return;
                state[group.dataset.filterGroup] = button.dataset.filterValue;
                state.page = 1;
                apply("push", false);
            });
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

    initBlog();

    window.requestAnimationFrame(function () {
        document.querySelectorAll(".animate").forEach(function (element, index) {
            element.style.transitionDelay = index * 150 + "ms";
            element.classList.add("show");
        });
    });
})();
