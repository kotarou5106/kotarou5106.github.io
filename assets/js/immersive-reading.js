(function () {
    var article = document.querySelector("[data-immersive-article]");
    if (!article) return;

    var root = document.documentElement;
    var button = document.querySelector("[data-immersive-toggle]");
    var fallback = false;
    var busy = false;
    var position = null;

    function active() {
        return document.fullscreenElement === root || fallback;
    }

    function capturePosition() {
        // Anchor to the visible content, rather than a percentage of a long page.
        var elements = article.querySelectorAll(".article-header, .article-content > *");
        var anchor = Array.from(elements).find(function (element) {
            return element.getBoundingClientRect().bottom > 0;
        }) || article;
        return { anchor: anchor, top: anchor.getBoundingClientRect().top, x: window.scrollX, y: window.scrollY };
    }

    function syncState() {
        var saved = position || capturePosition();
        position = null;
        root.classList.add("immersive-switching");
        root.classList.toggle("immersive-reading", active());
        if (button) button.setAttribute("aria-pressed", active() ? "true" : "false");

        function restore() {
            var y = saved.y === 0 ? 0 : window.scrollY + saved.anchor.getBoundingClientRect().top - saved.top;
            window.scrollTo({ left: saved.x, top: y, behavior: "instant" });
        }
        restore();
        // Fullscreen viewport resizing may finish after fullscreenchange.
        window.requestAnimationFrame(function () {
            restore();
            window.requestAnimationFrame(function () {
                restore();
                root.classList.remove("immersive-switching");
                busy = false;
            });
        });
    }

    async function toggle() {
        if (busy || (document.fullscreenElement && document.fullscreenElement !== root)) return;
        busy = true;
        position = capturePosition();
        root.classList.add("immersive-switching");
        if (fallback) {
            fallback = false;
            syncState();
        } else if (document.fullscreenElement === root) {
            try {
                await document.exitFullscreen();
            } catch (error) {
                syncState();
            }
        } else if (root.requestFullscreen && document.fullscreenEnabled) {
            try {
                await root.requestFullscreen();
            } catch (error) {
                fallback = true;
                syncState();
            }
        } else {
            fallback = true;
            syncState();
        }
    }

    document.addEventListener("fullscreenchange", syncState);
    document.addEventListener("keydown", function (event) {
        if (event.defaultPrevented || event.repeat || event.isComposing || event.keyCode === 229 ||
            event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;
        var editing = event.composedPath().some(function (target) {
            return target instanceof HTMLElement && (target.isContentEditable ||
                target.matches("input, textarea, select, [role='textbox']"));
        });
        if (editing) return;
        if (event.key.toLowerCase() === "f" || (event.key === "Escape" && active())) {
            event.preventDefault();
            toggle();
        }
    });

    if (button) {
        button.hidden = false;
        button.addEventListener("click", toggle);
    }
})();
