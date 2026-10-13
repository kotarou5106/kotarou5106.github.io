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
})();
