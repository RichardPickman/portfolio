import  i18Obj from './translate.js';

const lightSections = [
    '.skills-container', '.portfolio-container', '.video-container', '.price-container'
]

const localLang = localStorage.getItem("lang")
const localTheme = localStorage.getItem("theme")

window.onload = function () {
    const hamburger = document.querySelector(".hamburger");
    const close = document.querySelector(".close");
    const menu = document.querySelector(".menu");
    const navLinks = document.querySelectorAll('.menu-li');
    const btns = document.querySelectorAll('.empty-button');
    const images = document.querySelectorAll('.portfolio-item > img');
    const langBtns = document.querySelectorAll('.lng-link')
    const sunBtn = document.querySelector('.logo-sun')
    const moonBtn = document.querySelector('.logo-moon')

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("is-active");
        menu.classList.toggle("open");
    })

    close.addEventListener("click", () => {
        menu.classList.remove("open")
        hamburger.classList.remove("is-active");
    })
    
    const closeMenu = () => {
        menu.classList.remove("open")
        hamburger.classList.remove("is-active");
    }
    
    navLinks.forEach((el) => el.addEventListener('click', closeMenu));
    
    function preloadSummerImages() {
        const seasons = ['winter', 'spring', 'summer', 'autumn'];
        seasons.forEach(pic => {
            for(let i = 1; i <= 6; i++) {
                const img = new Image();
                img.src = `./assets/img/${pic}/${i}.jpg`;
            }
        })
    }
    
    function changeImage(event) {
        images.forEach((img, i) => img.setAttribute('src', `./assets/img/${event.target.dataset.season}/${i + 1}.jpg`));
    }
    
    const portfolioBtnHandler = (e) => {
        changePortfolioBtnStyle(e)
        changeImage(e)
    }
    
    const changePortfolioBtnStyle = (e) => {
        btns.forEach(btn => {
            btn.dataset.selected = false
        })
    
        e.target.dataset.selected = true
    }
    
    btns.forEach(btn => {
        btn.addEventListener('click', (e) => portfolioBtnHandler(e));
    })

    const getTranslate = (lang) => {
        const language = document.querySelectorAll('[data-i18]')
        const dict = i18Obj[lang]
        language.forEach(elem => {
            const data = elem.dataset.i18
            elem.innerText = dict[data]
        })
    }

    const langSelected = (e) => {
        langBtns.forEach(btn => {
            btn.dataset.lang = false
        })
        e.target.dataset.lang = true
    }

    const changeLang = (e) => {
        const language = e.innerText.replace(/\s/g, '')
        localStorage.setItem("lang", language)
        
        getTranslate(language)
    }

    const langHandler = (e) => {
        langSelected(e)
        changeLang(e.target)
    }

    langBtns.forEach(btn => {
        btn.addEventListener('click', (e) => langHandler(e))
    })

    const themeTumbler = () => {
        const titleLine = document.querySelectorAll('.line-object')
        const title = document.querySelectorAll('.section-title')
        const priceInfo = document.querySelectorAll('.price-info')
        const body = document.querySelector('.body')

        body.classList.toggle("light-body")
        document.body.style.transition = '0.8s';

        title.forEach(elem => {
            elem.style.transition = '0.8s';
            elem.classList.toggle("light-section-title")
        })

        titleLine.forEach(elem => {
            elem.style.transition = '0.8s';
            elem.classList.toggle("light-line-object")
        })

        priceInfo.forEach(elem => {
            elem.style.transition = '0.8s';
            elem.classList.toggle("light-price-info")
        })

        lightSections.forEach(elem => {
            const lightTheme = document.querySelector(elem)
            
            lightTheme.style.transition = '0.8s';
            lightTheme.classList.toggle("light-theme")
        })

        btns.forEach(elem => {
            elem.style.transition = '0.8s';
            elem.classList.toggle("light-empty-button")
        })


    }

    sunBtn.addEventListener('click', () => {
        sunBtn.style.display = 'none';
        moonBtn.style.display = 'block';
        localStorage.clear
        localStorage.setItem("theme", "light")
        themeTumbler()
    })

    moonBtn.addEventListener('click', () => {
        moonBtn.style.display = 'none';
        sunBtn.style.display = 'block';
        localStorage.clear
        localStorage.setItem("theme", "dark")
        themeTumbler()
    })

    if (localLang === 'ru') {
        const ru = document.getElementById('ru')
        ru.click()
        getTranslate('ru')
    }

    if (localTheme === "light") {
        sunBtn.click()
    }
    
    preloadSummerImages()
}
