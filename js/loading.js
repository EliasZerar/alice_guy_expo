window.addEventListener('load', function() {
    const loadingPage = document.getElementById('loading-page');
    const hasVisited = sessionStorage.getItem('hasVisited');

    if (!hasVisited) {
        sessionStorage.setItem('hasVisited', 'true');
        setTimeout(() => {
            loadingPage.style.opacity = 0;
            setTimeout(() => {
                loadingPage.remove();
            }, 500); 
        }, 3100);
    } else {
        loadingPage.remove();
    }
});
