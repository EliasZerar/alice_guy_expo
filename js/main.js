// nav mobile
document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.querySelector('.menu-icon');
    const menu = document.querySelector('.menu');
    const burger = document.querySelector('.burger');

    menuIcon.addEventListener('click', function () {
        if (window.innerWidth < 1000) {
            if (menu.style.right === '0px') {
                menu.style.right = '-100%';
                burger.classList.remove('open');
            } else {
                menu.style.right = '0';
                burger.classList.add('open');
            }
        }
    });
});

// nav active link
// document.addEventListener('DOMContentLoaded', function () {
//     const currentPage = window.location.pathname.split('/').pop() || 'index.html';

//     const links = document.querySelectorAll('.menu a');

//     links.forEach(link => {
//         const linkHref = link.getAttribute('href');
//         if (linkHref === currentPage) {
//             link.classList.add('active');
//         }
//     });
// });

// document.addEventListener('DOMContentLoaded', function () {
//     const links = document.querySelectorAll('.menu a');
//     const underline = document.querySelector('.underline');

//     function moveUnderline(link) {
//         const linkRect = link.getBoundingClientRect();
//         const menuRect = link.closest('.menu').getBoundingClientRect();

//         const left = linkRect.left - menuRect.left;
//         const width = linkRect.width;

//         underline.style.left = `${left}px`;
//         underline.style.width = `${width}px`;

//         localStorage.setItem('underlinePosition', JSON.stringify({ left, width }));
//     }

//     function setActiveLink(link) {
//         links.forEach(l => l.classList.remove('active'));
//         link.classList.add('active');
//         moveUnderline(link);
//     }

//     const savedUnderlinePosition = localStorage.getItem('underlinePosition');
//     if (savedUnderlinePosition) {
//         const { left, width } = JSON.parse(savedUnderlinePosition);
//         underline.style.left = `${left}px`;
//         underline.style.width = `${width}px`;
//     } else {
//         // Définir l'underline sous le premier lien actif ou par défaut
//         const defaultActiveLink = document.querySelector('.menu a.active') || document.querySelector('.menu a');
//         if (defaultActiveLink) {
//             setActiveLink(defaultActiveLink);
//         }
//     }

//     links.forEach(link => {
//         link.addEventListener('click', function (e) {
//             e.preventDefault();
//             setActiveLink(this);
//             setTimeout(() => {
//                 window.location.href = this.getAttribute('href');
//             }, 300);
//         });
//     });

//     window.addEventListener('resize', function () {
//         const activeLink = document.querySelector('.menu a.active');
//         if (activeLink) {
//             moveUnderline(activeLink);
//         }
//     });
// });
