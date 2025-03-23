window.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".menu a");
    const underline = document.querySelector(".underline");

    if (!underline) return;

    const activeLink = document.querySelector(".menu a.active");
    const menuRect = document.querySelector(".menu").getBoundingClientRect();

    // Fonction pour récupérer la position et la largeur du lien actif
    function getOffset(link) {
        const rect = link.getBoundingClientRect();
        return {
            left: rect.left - menuRect.left,
            width: rect.width
        };
    }

    // Attendre que la page soit complètement chargée pour ajuster la position
    window.onload = function() {
        // Init position sur le lien actif
        if (activeLink) {
            const { left, width } = getOffset(activeLink);
            underline.style.left = `${left}px`;
            underline.style.width = `${width}px`;

            console.log(`Left: ${left}, Width: ${width}`);
        }
    };

    // Gérer les clics
    links.forEach(link => {
        link.addEventListener("click", (e) => {
            const href = link.getAttribute("href");

            // Ne pas rediriger tout de suite
            e.preventDefault();

            const { left, width } = getOffset(link);

            // Anime l'underline
            underline.style.left = `${left}px`;
            underline.style.width = `${width}px`;

            // Attendre la fin de l'animation avant de naviguer
            setTimeout(() => {
                window.location.href = href;
            }, 400); // même durée que la transition CSS
        });
    });
});