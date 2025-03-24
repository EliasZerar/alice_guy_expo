const swiper = new Swiper(".mySwiper", {
    loop: true,
    effect: "coverflow",
    grabCursor: false,
    centeredSlides: true,
    slidesPerView: 2,  // Valeur par défaut : Affiche 2 slides
    loopAdditionalSlides: 2,
    coverflowEffect: {
        rotate: 0,        // Valeur de base de la rotation
        stretch: 42,      // Valeur de base de l'espacement des slides
        depth: 50,        // Valeur de base de la profondeur
        modifier: 6,      // Valeur de base du modificateur
        slideShadows: true,
    },
    navigation: {
        nextEl: ".swiper-button-next-custom",  // Flèche personnalisée suivante
        prevEl: ".swiper-button-prev-custom",  // Flèche personnalisée précédente
    },
    preloadImages: true,
    breakpoints: {
        // Pour les écrans au-dessus de 1100px (valeurs par défaut)
        1100: {
            slidesPerView: 2, // Affiche 2 slides
            coverflowEffect: {
                rotate: 1,        // Pas de rotation
                stretch: 43,      // Espacement moyen
                depth: 50,        // Profondeur moyenne
                modifier: 6,      // Modificateur standard
            }
        },
        // Pour les écrans entre 768px et 1100px (tablettes et petits écrans)
        900: {
            slidesPerView: 2, // Afficher 2 slides
            coverflowEffect: {
                rotate: 1,    // Rotation légère
                stretch: 38,  // Moins d'espacement
                depth: 50,    // Moins de profondeur
                modifier: 6,  // Réduire l'intensité du coverflow
            }
        },
        // Pour les écrans entre 480px et 767px (écrans moyens)
        800: {
            slidesPerView: 2,  // Afficher 1 slide
            coverflowEffect: {
                rotate: 1,    // Pas de rotation
                stretch: 35,  // Moins d'espacement
                depth: 50,    // Moins de profondeur
                modifier: 4,  // Moins d'intensité du coverflow
            }
        },
        0: {
            slidesPerView: 1,  // Afficher 1 slide
            coverflowEffect: {
                rotate: 1,    // Pas de rotation
                stretch: 35,  // Moins d'espacement
                depth: 50,    // Moins de profondeur
                modifier: 4,  // Moins d'intensité du coverflow
            }
        }
    },
    on: {
        slideChange: function () {
            // Cache tous les titres
            document.querySelectorAll('.swiper-title').forEach(title => title.style.display = 'none');
            
            // Affiche le titre correspondant au slide actif
            let currentIndex = this.realIndex % 5; // Comme tu as 5 titres
            document.querySelectorAll('.swiper-title')[currentIndex].style.display = 'block';
        }
    }
});
