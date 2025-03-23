window.addEventListener('load', function() {
    const loadingPage = document.getElementById('loading-page');
    const hasVisited = sessionStorage.getItem('hasVisited');

    if (!hasVisited) {
        sessionStorage.setItem('hasVisited', 'true');
        setTimeout(() => {
            loadingPage.style.opacity = 0;
            setTimeout(() => {
                loadingPage.remove();
            }, 500); // Durée de la transition CSS
        }, 3100); // Attente avant de faire disparaître la landing page
    } else {
        loadingPage.remove();
    }
});
