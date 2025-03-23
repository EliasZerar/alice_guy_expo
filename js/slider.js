const swiper = new Swiper(".mySwiper", {
    loop: true,
    effect: "coverflow",
    grabCursor: false,
    centeredSlides: true,
    slidesPerView: 2, 
    loopAdditionalSlides: 2, 
    coverflowEffect: {
      rotate: 0,
      stretch: 46,
      depth: 50,
      modifier: 6,
      slideShadows: true,
    },
    navigation: {
      nextEl: ".swiper-button-next-custom",  // Flèche personnalisée suivante
      prevEl: ".swiper-button-prev-custom",  // Flèche personnalisée précédente
    },
    preloadImages: true,  // Assure-toi que les images sont préchargées
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
