 // Enregistrement des plugins une seule fois
 gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

 const timeline = document.querySelector(".timeline");
 const svgContainer = document.querySelector(".svg-container");
 const dotMobile = document.getElementById("dot-mobile");
 const dotDesktop = document.getElementById("dot-desktop");
 const path = document.querySelector("#scrollPath");

 // Animation du dot mobile (déplacement vertical en fonction du scroll)
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

 // Animation du dot desktop le long du path SVG
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

 // Animation des cartes de la timeline
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

 // Si tu veux garder updateDotPosition, définis-la ici :
 function updateDotPosition() {
     // Code pour repositionner les dots si besoin au resize/scroll
 }

 // Tu n'as pas besoin de ces listeners si updateDotPosition est vide
 window.addEventListener('scroll', updateDotPosition);
 window.addEventListener('resize', updateDotPosition);
 window.addEventListener('load', updateDotPosition);

 const testLocal = () => {
    localStorage.removeItem('gameFinished');
    console.log(localStorage);
 }