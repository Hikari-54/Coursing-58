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