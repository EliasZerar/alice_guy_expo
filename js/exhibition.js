// Enregistrement des plugins une seule fois
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const timeline = document.querySelector(".timeline");
const svgContainer = document.querySelector(".svg-container");
const dotMobile = document.getElementById("dot-mobile");
const dotDesktop = document.getElementById("dot-desktop");
const path = document.querySelector("#scrollPath");

if (dotMobile && svgContainer) {
    gsap.to(dotMobile, {
        scrollTrigger: {
            trigger: timeline,
            start: "top 30%",
            end: "bottom 70%",
            scrub: 0.5,
            onUpdate: self => {
                const progress = self.progress;
                const containerHeight = svgContainer.offsetHeight;
                dotMobile.style.top = `${containerHeight * progress}px`;
            }
        }
    });
}

if (dotDesktop && path) {
    gsap.to(dotDesktop, {
        scrollTrigger: {
            scrub: 0.5,
            trigger: timeline,
            start: "top 30%",
            end: "bottom 70%"
        },
        motionPath: {
            path: path,
            align: path,
            autoRotate: false,
            alignOrigin: [0.5, 0.5]
        },
        ease: "none"
    });
}

document.querySelectorAll(".collection-step").forEach((step) => {
    const card = step.querySelector(".collection-card");
    const screenWidth = window.innerWidth;
    const isRight = card.classList.contains('collection-card-right');
    const fromDirection = screenWidth > 1100 ? (isRight ? 100 : -100) : 100;

    gsap.fromTo(
        card,
        { x: fromDirection, opacity: 0 },
        {
            scrollTrigger: {
                trigger: step,
                start: "top center",
                toggleActions: "play none none reverse",
            },
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
        }
    );
});

const testLocal = () => {
    if (localStorage.getItem("gameFinished") === "true") {
        localStorage.removeItem("gameFinished");
    } else {
        localStorage.setItem("gameFinished", "true");
    }
    location.reload();
}

document.addEventListener("DOMContentLoaded", () => {
    const gameFinished = localStorage.getItem("gameFinished");

    if (gameFinished === "true") {
        setTimeout(() => {
            toSection();
        }, 300);
    }
});


function unlockImagesAndShowCards() {
    const imgContainers = document.querySelectorAll(".img-container img");
    imgContainers.forEach(img => {
        const src = img.getAttribute("src");
        if (src.includes("-lock")) {
            img.setAttribute("src", src.replace("-lock", ""));
        }
    });

    const objectCards = document.querySelectorAll(".collection-card");
    if (objectCards.length > 0) {
        objectCards.forEach(card => {
            card.classList.remove("hidden");
        });
    }
}

function toSection() {
    const section = document.querySelector(".collection-steps");
    const offset = -100;
    const top = section.getBoundingClientRect().top + window.pageYOffset + offset;

    window.scrollTo({ 
        top, 
        behavior: "smooth" 
    });

    setTimeout(() => {
        unlockImagesAndShowCards();
    }, 600);
}


const clic = document.querySelector(".clic");
clic.addEventListener("click", () => {
    toSection();
});


document.addEventListener("DOMContentLoaded", () => {
    const promoBtn = document.getElementById("promo-button");
    const popup = document.getElementById("promo-popup");
    const closePopup = document.getElementById("close-popup");

    const isFinished = localStorage.getItem("gameFinished") === "true";

    if (isFinished) {
        promoBtn.disabled = false;
        promoBtn.classList.add("enabled");
    }

    promoBtn.addEventListener("click", () => {
        if (!promoBtn.disabled) {
            popup.classList.remove("hidden");
            document.body.classList.add("popup-open"); 
        }
    });

    const closePromoPopup = () => {
        popup.classList.add("hidden");
        document.body.classList.remove("popup-open"); 
    };

    closePopup.addEventListener("click", closePromoPopup);

    popup.addEventListener("click", (e) => {
        if (e.target === popup) {
            closePromoPopup();
        }
    });
});
