// Ключи и значения объектов (текущего и из localStorage) всегда идентичны

// (+) Добавить чтение из LocalStorage (В ВИДЕ ОБЪЕКТА?)
// (+) Заполнение этими значениями списка при загрузке страницы
// В ф-ии удаления и завершения надо добавить:
    // 1. (+) При удалении задачи, она удаляется и из объекта в localStorage
    // 2. При завершении задачи, она сначала удаляется из объекта с актуальными задачами,
    // а затем помещается в объект с завершёнными задачами.
// (+) Анимации и норм вид 
// Сделать таймер

// СТИЛИ
// - Текст плейсхолдера в input'e должен анимированно исчезать, при нажатии на поле ввода

// Переменная для задания ключа при записи в LocalStorage
let numOfItems = 0;
// Объект для хранения всех задач и дальнейшего помещения в LocalStorage
let TasksInLocalStorage = {};



// Обработчик события, запускающийся при загрузке всего DOM дерева
// (это быстрее, чем ждать загрузки всех картинок, таблиц и прочего)
addEventListener("DOMContentLoaded", function insertTask(event){

    // Если такой объект в localStorage существует, то...
    if (localStorage.key("TasksInLocalStorage") != null){

        TasksInLocalStorageOld = JSON.parse(localStorage.getItem("TasksInLocalStorage"));
        console.log("Хранилище из LocalStorage = ", TasksInLocalStorageOld);

        // Цикл добавления всех задач из хранилища в DOM дерево
        for (key in TasksInLocalStorageOld){
            // Получили значение (текст) задачи
            let currentTask = TasksInLocalStorageOld[key];
            // Получили элемент, куда будем производить вставку задачи
            const todoList = document.querySelector(".todo-list");
            // Получили шаблок
            const template = document.querySelector("template");
            // Получаем абзац, куда вставим текст
            const textOfTodoTask = template.content.querySelector("p");

            // Заменяем текст в параграфе
            textOfTodoTask.textContent = currentTask;
            // Клонируем содержимое шаблона
            let task = template.content.cloneNode(true);
            // Вставляем заполненный шаблон в DOM дерево
            todoList.append(task);

            // Обновляем наш актуальный объект со всеми задачами
            TasksInLocalStorage[key] = TasksInLocalStorageOld[key];

            // Обновляем глобальный счётчик задач
            numOfItems = key;
            console.log("Всего поставлено ", numOfItems, " задач");
            numOfItems++;
        }
    }
});

// Обработчик добавления задачи в To-do
addEventListener("keydown", function insertTask(event){
    // При нажатии клавиши 'Enter'
    if((event.keyCode == 13) && (document.querySelector("#task-maker").value != "")){
        // Получили значение из input'а
        const todoValue = document.querySelector("#task-maker").value;
        // Получили элемент, куда будем производить вставку задачи
        const todoList = document.querySelector(".todo-list");
        // Получили шаблок
        const template = document.querySelector("template");
        // Получаем абзац, куда вставим текст
        const textOfTodoTask = template.content.querySelector("p");

        // Заменяем текст в параграфе
        textOfTodoTask.textContent = todoValue;

        // Клонируем содержимое шаблона
        let task = template.content.cloneNode(true);

        todoList.append(task);

        // Теперь нужно удалить введённый текст из input'а
        document.querySelector("#task-maker").value = "";

        // Записываем новую пару ключ-значени в объект
        TasksInLocalStorage[numOfItems] = todoValue;

        // Увеличиваем глобальный счётчик задач
        numOfItems++;

        // Заносим обновлённый объект в localStorage
        localStorage.setItem("TasksInLocalStorage", JSON.stringify(TasksInLocalStorage));
    }
});

// Функци удаления задачи из списка To-Do
function deleteTask(elem){

    // Получаем общий элемент с задачей ".todo-task"
    const groupOfElems = elem.parentNode.parentNode;

    // Выбираем текст задачи из параграфа
    let textOfTask = groupOfElems.childNodes[1].textContent;

    // Получаем массив ключей из localStorage
    let arrOfKeys = Object.keys(TasksInLocalStorage);

    // Ищем в локальном хранилище такое значение
    for (let numOfKeyInArr in arrOfKeys){

        if (textOfTask === TasksInLocalStorage[arrOfKeys[numOfKeyInArr]]){

            // Удаляем найденное свойство
            delete TasksInLocalStorage[arrOfKeys[numOfKeyInArr]];

            // Вносим новый объект в localStorage, заменяя им прошлую версию
            localStorage.setItem("TasksInLocalStorage", JSON.stringify(TasksInLocalStorage));
        }
    }
    // Удаление задачи из DOM дерева
    groupOfElems.remove();
}

// Перестраивание местоположения блока с таймером в зависимости от ширины экрана
const timerBlock = document.querySelector(".timer");

// Изначальная проверка - помещается ли блок
if (window.innerWidth < 1326){
    timerBlock.style.position = "static";
    timerBlock.style.margin = "30px auto";
}

// Активируется ТОЛЬКО при изменении экрана
window.addEventListener('resize', () => {
    relocateTimer(timerBlock);
});

function relocateTimer(timerBlock){
    if (window.innerWidth < 1326){
        timerBlock.style.position = "static";
        timerBlock.style.margin = "30px auto";
    } else{
        timerBlock.style.position = "absolute";
        timerBlock.style.margin = "0";
    }
}

// Активация звука будильника на 5 секунд
function playAlarm(){
    // Инициализируем звуковой файл
    let alarm = new Audio("audio/alarm.mp3");
    // Начинаем проигрывание
    alarm.play();
    // Выключаем через 5 секунд
    setTimeout(()=>{
        alarm.pause(); 
    }, 5000);
    // Возвращаем на начало звуковой дорожки
    alarm.currentTime = 0.0;
}


console.log("Актуальное хранилище", TasksInLocalStorage);

console.log(TasksInLocalStorage.length);


// Обработчик события, вызывающийся в случае, если открыто НЕСКОЛЬКО ВКЛАДОК 
// и происходит какая-то манипуляция с localStorage
window.addEventListener("storage", event => {
    console.log(event);
})