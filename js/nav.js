window.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".menu a");
    const underline = document.querySelector(".underline");

    if (!underline) return;

    const activeLink = document.querySelector(".menu a.active");
    let menuRect = document.querySelector(".menu").getBoundingClientRect();

    function getOffset(link) {
        const rect = link.getBoundingClientRect();
        return {
            left: rect.left - menuRect.left,
            width: rect.width
        };
    }

    function updateUnderline() {
        if (activeLink) {
            const { left, width } = getOffset(activeLink);
            underline.style.left = `${left}px`;
            underline.style.width = `${width}px`;
        }
    }

    window.onload = updateUnderline;

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
});
