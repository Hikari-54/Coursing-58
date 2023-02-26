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
                        ( rect.height / 4 );

        if(document.querySelector("#what-is-coursing").offsetWidth > 980){
            document.querySelector("#curved-1").style.top = `${abs_height}px`;
            document.querySelector("#curved-2").style.top = `${abs_height}px`;
            document.querySelector("#curved-3").style.top = `${abs_height}px`;
        } else{
            document.querySelector("#curved-1").style.top = `${abs_height}px`;
            document.querySelector("#curved-3").style.top = `${abs_height + rect.height + 60}px`;                 

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

        if(document.querySelector("#what-is-coursing").offsetWidth > 980){
            document.querySelector("#curved-1").style.top = `${abs_height}px`;
            document.querySelector("#curved-2").style.top = `${abs_height}px`;
            document.querySelector("#curved-3").style.top = `${abs_height}px`;
        } else{
            document.querySelector("#curved-1").style.top = `${abs_height}px`;
            document.querySelector("#curved-3").style.top = `${abs_height + rect.height + 60}px`;                 

        };
    };
});