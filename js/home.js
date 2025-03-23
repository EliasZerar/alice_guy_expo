// animation 5 salles 5 épreuves
document.addEventListener('DOMContentLoaded', function() {
    const textElement = document.querySelector('.text-animation');
    let phrases = ["salles", "épreuves"];
    let currentPhrase = 0;
    let currentChar = 0;
    let isDeleting = false;
    let lastTime = Date.now();
    let typingSpeed = 190;
    let deletingSpeed = 90;

    function type() {
        let now = Date.now();
        let delta = now - lastTime;

        if ((isDeleting && delta > deletingSpeed) || (!isDeleting && delta > typingSpeed)) {
            if (isDeleting) {
                if (currentChar > 0) {
                    currentChar--;
                    textElement.textContent = phrases[currentPhrase].substring(0, currentChar);
                } else {
                    isDeleting = false;
                    currentPhrase = (currentPhrase + 1) % phrases.length;
                    lastTime = now;
                }
            } else {
                if (currentChar < phrases[currentPhrase].length) {
                    currentChar++;
                    textElement.textContent = phrases[currentPhrase].substring(0, currentChar);
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
window.onload = function() {
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

    gsap.from(camera, {
        scrollTrigger: {
            trigger: ".alice-img",
            start: "top bottom",
            end: "center center",
            scrub: true,
            markers: false
        },
        right: startPosition(),
        ease: "none"
    });

    adjustCameraPosition();
    window.addEventListener('resize', () => {
        adjustCameraPosition();
        gsap.set(camera, { right: startPosition() });
    });
};