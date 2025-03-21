window.onload = function() {
    setTimeout(function() {
        var landingPage = document.getElementById('landing-page');
        landingPage.style.opacity = 0;
        
        setTimeout(function() {
            landingPage.remove(); 
        }, 500); // durée de la transition CSS
    }, 3100); // durée avant que la landing page commence à disparaître
};