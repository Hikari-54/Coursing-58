"use strict";

// Функционал бургер меню
const iconMenu = document.querySelector(".menu__icon");
const menuBody = document.querySelector(".menu__body");
// Проверяем существует ли такой объект
if (iconMenu){
    iconMenu.addEventListener("click", function(e){
        // Этот класс будет запрещать листать страницу при открытом меню
        document.body.classList.toggle("_lock");
        iconMenu.classList.toggle("_active");
        menuBody.classList.toggle("_active");
    });
};

// Плавная прокрутка при клике на ссылки с data-атрибутами
const menuLinks = document.querySelectorAll(".menu__link[data-goto]");
if (menuLinks.length > 0){
    menuLinks.forEach(menuLink => {  
        menuLink.addEventListener("click", onMenuLinkClick);
    });

    function onMenuLinkClick(e){
        // Отключаем работу ссылки по-умолчанию (она теперь никуда не переходит)
        e.preventDefault(); 

        // Это будет сама ссылка
        const menuLink = e.target; 

        // 1. menuLink.dataset.goto - проверяет заполнен ли атрибут (если не null)
        // 2. document.querySelector("menuLink.dataset.goto") - существует ли объект, на который ссылается data-атрибут
        if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)){
            // Получаем объект, на который ссылается содержимое data-атрибута
            const goToBlock = document.querySelector(menuLink.dataset.goto);

            // Подсчёт положения объекта с учётом высоты шапки
            // 1. положение блока на странице
            // 2. window.scrollY = количество прокрученных пикселей по вертикали
            // 3. вычитаем высоту шапки
            const goToBlockValue = goToBlock.getBoundingClientRect().top + pageYOffset - document.querySelector("header").offsetHeight;

            // Убираем открытое бургер-меню при переходе по "ссылке"
            if(iconMenu.classList.contains("_active")){
                document.body.classList.remove("_lock");
                iconMenu.classList.remove("_active");
                menuBody.classList.remove("_active");
            }

            // Инициация скролла до цели ссылки
            window.scrollTo({
                top: goToBlockValue,
                behavior: "smooth"
            });
        }
    }
};

// Lazy Load Яндекс карты
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initYandexMap, 5000);
});

document.addEventListener('scroll', initYandexMapOnEvent);
document.addEventListener('mousemove', initYandexMapOnEvent);
document.addEventListener('touchstart', initYandexMapOnEvent);

function initYandexMapOnEvent (e) {
    initYandexMap();
    e.currentTarget.removeEventListener(e.type, initYandexMapOnEvent);
}

function initYandexMap () {
    if (window.yandexMapDidInit) {
        return false;
    }
    window.yandexMapDidInit = true;

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;

    script.src = 'https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Afc1fe5586b83f8c316c3655189f49949fb1b4ca8cf641cf62f3fc43d7d74fe69&amp;width=100%25&amp;height=400&amp;lang=ru_RU&amp;scroll=false';

    document.getElementById("map-wrap").appendChild(script);
}

// Для изогнутых пунктирных линий в Плюсах курсинга 

// При загрузке
window.addEventListener('load', (e) => {
    const plusses_flex_item_1 = document.querySelector("#plusses-flex-item-1");
    if (plusses_flex_item_1.getBoundingClientRect() != null){

        const rect = plusses_flex_item_1.getBoundingClientRect();
        let abs_height = document.querySelector("header").offsetHeight +
                        document.querySelector(".UTZ").offsetHeight +
                        document.querySelector("#what-is-coursing").offsetHeight + 
                        document.querySelector("#plusses .divider-flex").offsetHeight + 
                        ( rect.height / 3.3 );

        if(document.querySelector("#what-is-coursing").offsetWidth >= 1400){
            document.querySelector("#curved-1").style.top = `${abs_height}px`;
            document.querySelector("#curved-2").style.top = `${abs_height}px`;
            document.querySelector("#curved-3").style.top = `${abs_height}px`;

            document.querySelector("#curved-1").style.left = `${217 + document.querySelector(".container").getBoundingClientRect().x}px`;
            document.querySelector("#curved-2").style.left = `${217 + document.querySelector(".container").getBoundingClientRect().x + 308 + 25}px`;
            document.querySelector("#curved-3").style.left = `${217 + document.querySelector(".container").getBoundingClientRect().x + 308 + 25 + 308 + 25}px`;

        } else if(document.querySelector("#what-is-coursing").offsetWidth > 980){
            document.querySelector("#curved-1").style.top = `${abs_height}px`;
            document.querySelector("#curved-2").style.top = `${abs_height}px`;
            document.querySelector("#curved-3").style.top = `${abs_height}px`;

            document.querySelector("#curved-1").style.left = `${15.5}%`;
            document.querySelector("#curved-2").style.left = `${39.5}%`;
            document.querySelector("#curved-3").style.left = `${63.8}%`;
        } else{
            document.querySelector("#curved-1").style.top = `${abs_height + ( rect.height / 25 )}px`;
            document.querySelector("#curved-3").style.top = `${abs_height + rect.height + ( rect.height / 2.8 )}px`;
        
            document.querySelector("#curved-1").style.left = `${32}%`;
            document.querySelector("#curved-3").style.left = `${32}%`;
        };
    };
});

// При изменении размера страницы
window.addEventListener('resize', (e) => {
    const plusses_flex_item_1 = document.querySelector("#plusses-flex-item-1");
    if (plusses_flex_item_1.getBoundingClientRect() != null){

        const rect = plusses_flex_item_1.getBoundingClientRect();
        let abs_height = document.querySelector("header").offsetHeight +
                        document.querySelector(".UTZ").offsetHeight +
                        document.querySelector("#what-is-coursing").offsetHeight + 
                        document.querySelector("#plusses .divider-flex").offsetHeight + 
                        ( rect.height / 4 );

        if(document.querySelector("#what-is-coursing").offsetWidth >= 1340){
            document.querySelector("#curved-1").style.top = `${abs_height}px`;
            document.querySelector("#curved-2").style.top = `${abs_height}px`;
            document.querySelector("#curved-3").style.top = `${abs_height}px`;

            document.querySelector("#curved-1").style.left = `${217 + document.querySelector(".container").getBoundingClientRect().x}px`;
            document.querySelector("#curved-2").style.left = `${217 + document.querySelector(".container").getBoundingClientRect().x + 308 + 25}px`;
            document.querySelector("#curved-3").style.left = `${217 + document.querySelector(".container").getBoundingClientRect().x + 308 + 25 + 308 + 25}px`;

        } else if(document.querySelector("#what-is-coursing").offsetWidth > 980){
            document.querySelector("#curved-1").style.top = `${abs_height}px`;
            document.querySelector("#curved-2").style.top = `${abs_height}px`;
            document.querySelector("#curved-3").style.top = `${abs_height}px`;

            document.querySelector("#curved-1").style.left = `${15.5}%`;
            document.querySelector("#curved-2").style.left = `${39.5}%`;
            document.querySelector("#curved-3").style.left = `${63.8}%`;
        } else{
            document.querySelector("#curved-1").style.top = `${abs_height + ( rect.height / 25 )}px`;
            document.querySelector("#curved-3").style.top = `${abs_height + rect.height + ( rect.height / 2.8 )}px`;
        
            document.querySelector("#curved-1").style.left = `${32}%`;
            document.querySelector("#curved-3").style.left = `${32}%`;
        };
    };
});

// Для анимации 
const animItems = document.querySelectorAll(".anim-items");
if (animItems.length > 0){
    window.addEventListener("scroll", animOnScroll);

    function animOnScroll() {
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            // Высота объекта
            const animItemHeight = animItem.offsetHeight;
            // Позиция объекта относительно верха
            const animItemOffset = offset(animItem).top;
            // Коэф начала анимации
            const animStart = 4;

            // Точка старта, если объект ниже
            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if(animItemHeight > window.innerHeight){ // Точка старта, если объект выше
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }
            
            if ((scrollY > (animItemOffset - animItemPoint)) && (scrollY < (animItemOffset + animItemHeight))){
                animItem.classList.add("_active");
            } 
            // else{
            //     animItem.classList.remove("_active");
            // }
        }
    }
    function offset(elem) {
        const rect = elem.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return{
            top: rect.top + scrollTop,
            left: rect.left + scrollLeft,
        };
    }
    setTimeout(() => {
        animOnScroll();
    }, 300);
}