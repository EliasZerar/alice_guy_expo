// animation 5 salles 5 épreuves
document.addEventListener('DOMContentLoaded', function () {
    const textElement = document.querySelector('.text-animation');
    let currentLang = localStorage.getItem('selectedLang') || (navigator.language || 'fr').substring(0, 2);
    const phrases = {
        fr: ['salles', 'épreuves'],
        en: ['rooms', 'challenges']
    };

    let currentPhrase = 0;
    let currentChar = 0;
    let isDeleting = false;
    let lastTime = Date.now();
    const typingSpeed = 190;
    const deletingSpeed = 90;

    function updateLang() {
        currentLang = localStorage.getItem('selectedLang') || 'fr';
    }

    function type() {
        let now = Date.now();
        let delta = now - lastTime;

        updateLang();

        if ((isDeleting && delta > deletingSpeed) || (!isDeleting && delta > typingSpeed)) {
            if (isDeleting) {
                if (currentChar > 0) {
                    currentChar--;
                    textElement.textContent = phrases[currentLang][currentPhrase].substring(0, currentChar);
                } else {
                    isDeleting = false;
                    currentPhrase = (currentPhrase + 1) % phrases[currentLang].length;
                }
            } else {
                if (currentChar < phrases[currentLang][currentPhrase].length) {
                    currentChar++;
                    textElement.textContent = phrases[currentLang][currentPhrase].substring(0, currentChar);
                } else {
                    isDeleting = true;
                    lastTime = now + 1000;
                }
            }
            lastTime = now;
        }

        requestAnimationFrame(type);
    }

    requestAnimationFrame(type);
});


// animation caméra
document.addEventListener('DOMContentLoaded', function () {
    gsap.registerPlugin(ScrollTrigger);
    const camera = document.querySelector('.camera-img');

    function adjustCameraPosition() {
        if (window.innerWidth >= 1200) {
            gsap.set(camera, { right: "4%" });
        } else {
            gsap.set(camera, { right: "0%" });
        }
    }

    function startPosition() {
        if (window.innerWidth < 500) {
            return '-30%';
        } else if (window.innerWidth < 700) {
            return '-20%';
        } else if (window.innerWidth < 1000) {
            return '-20%';
        } else {
            return '-20%';
        }
    }

    gsap.set(camera, { right: startPosition() });

    gsap.to(camera, {
        scrollTrigger: {
            trigger: ".alice-img",
            start: "top bottom",
            end: "center center",
            scrub: true,
            markers: false
        },
        right: window.innerWidth >= 1200 ? "4%" : "0%",
        ease: "none"
    });

    window.addEventListener('resize', () => {
        gsap.set(camera, { right: startPosition() });
        ScrollTrigger.refresh()
    });
});

