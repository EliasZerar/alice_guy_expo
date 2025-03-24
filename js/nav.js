window.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".menu a");
    const underline = document.querySelector(".underline");

    if (!underline) return;

    // Nettoyage des chemins pour les comparer plus facilement
    const normalizePath = (path) => path.replace(/\/index\.html$/, "/").replace(/\/$/, "") || "/";

    const currentPath = normalizePath(window.location.pathname);
    let menuRect = document.querySelector(".menu").getBoundingClientRect();

    function getOffset(link) {
        const rect = link.getBoundingClientRect();
        return {
            left: rect.left - menuRect.left,
            width: rect.width
        };
    }

    function updateActiveLink() {
        let found = false;
        links.forEach(link => {
            link.classList.remove("active");

            const linkPath = normalizePath(new URL(link.href).pathname);
            if (!found && currentPath === linkPath) {
                link.classList.add("active");
                found = true;
            }
        });

        updateUnderline();
    }

    function updateUnderline() {
        const activeLink = document.querySelector(".menu a.active");
        if (activeLink) {
            const { left, width } = getOffset(activeLink);
            underline.style.left = `${left}px`;
            underline.style.width = `${width}px`;
            underline.style.opacity = 1;
        } else {
            underline.style.opacity = 0;
        }
    }

    window.addEventListener("resize", () => {
        menuRect = document.querySelector(".menu").getBoundingClientRect();
        updateUnderline();
    });

    links.forEach(link => {
        link.addEventListener("click", (e) => {
            const href = link.getAttribute("href");
            e.preventDefault();
            const { left, width } = getOffset(link);
            underline.style.left = `${left}px`;
            underline.style.width = `${width}px`;
            setTimeout(() => {
                window.location.href = href;
            }, 400);
        });
    });

    window.addEventListener("load", () => {
        updateActiveLink();
        setTimeout(updateUnderline, 100);
    });

    const selectLang = document.querySelector('.language');
    selectLang?.addEventListener('change', () => {
        setTimeout(updateUnderline, 300);
    });
});
