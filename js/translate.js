const loadTranslations = async (fileName) => {
    const response = await fetch(`json/${fileName}.json`);
    const data = await response.json();
    return data;
};

const applyTranslations = (translations) => {
    Object.keys(translations).forEach(key => {
        const translation = translations[key];
        document.querySelectorAll(`.${key}`).forEach(el => {
            el.textContent = translation;
        });
    });
};

const getCurrentPageName = () => {
    const path = window.location.pathname;
    const pageName = path.split('/').pop().replace('.html', '');
    return pageName || 'index';
};

const changeLanguage = (select) => {
    const selectedLanguage = select.value;
    localStorage.setItem('selectedLang', selectedLanguage);

    loadTranslations('menu').then(menuTranslations => {
        if (!menuTranslations[selectedLanguage]) {
            console.error("Langue non trouvée pour le menu : " + selectedLanguage);
            return;
        }
        applyTranslations(menuTranslations[selectedLanguage]);
    }).catch(error => {
        console.error("Erreur lors du chargement des traductions du menu : ", error);
    });

    const pageFileName = getCurrentPageName();

    if (pageFileName) {
        loadTranslations(pageFileName).then(pageTranslations => {
            if (!pageTranslations[selectedLanguage]) {
                console.error("Langue non trouvée pour la page : " + selectedLanguage);
                return;
            }
            applyTranslations(pageTranslations[selectedLanguage]);

            const dayDate = document.querySelector('.day-date');
            
            joursSemaine = selectedLanguage === 'en'
                ? ['Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.', 'Sun.']
                : ['Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.', 'Dim.'];
            
            generateDays();
        }).catch(error => {
            console.error("Erreur lors du chargement des traductions de la page : ", error);
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('selectedLang');
    const userLang = navigator.language || navigator.userLanguage;
    console.log("Langue du navigateur : " + userLang);
    const lang = savedLang || userLang.split('-')[0];
    const selectedLang = (lang === "fr" || lang === "en") ? lang : "fr";
    document.querySelector('.language').value = selectedLang;
    changeLanguage(document.querySelector('.language'));
});
