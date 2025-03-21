window.onload = function() {
    const landingPage = document.getElementById('landing-page');

    const hasVisited = sessionStorage.getItem('hasVisited');

    if (!hasVisited) {
        sessionStorage.setItem('hasVisited', 'true');

        setTimeout(() => {
            landingPage.style.opacity = 0;
            setTimeout(() => {
                landingPage.remove();
            }, 500); // Durée de la transition CSS
        }, 3100); // Attente avant de faire disparaître la landing page
    } else {
        landingPage.remove();
    }
};