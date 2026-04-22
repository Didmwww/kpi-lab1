/* --- ЛАБОРАТОРНА 6: ЗОВНІШНІЙ СКРИПТ (Збережено) --- */

function startUserDialogue() {
    let userName = prompt("Вітаємо на порталі! Як до вас звертатися?", "Гравець");
    if (userName !== null && userName !== "") {
        let age;
        while (true) {
            let input = prompt(`Приємно познайомитись, ${userName}! Скільки вам років?`, "18");
            if (input === null) return;
            age = parseInt(input);
            if (!isNaN(age) && age > 0) break;
            alert("Помилка! Будь ласка, введіть число.");
        }

        if (age >= 18) {
            confirm("Ви вже дорослий гравець. Бажаєте відкрити доступ до гайдів?");
        } else {
            alert("Приємно, що молодь цікавиться містобудуванням!");
        }
    }
}

function showDevInfo(surname, name, position = "Студент ФІОТ, Web Developer") {
    const container = document.getElementById("dev-card");
    if (container) {
        container.innerHTML = `
            <div style="background: #e8f4f8; padding: 15px; border-left: 5px solid #2980b9; margin: 20px 0;">
                <p><strong>Розробник:</strong> ${surname} ${name}</p>
                <p><strong>Посада:</strong> ${position}</p>
            </div>
        `;
    }
}

function compareStrings() {
    let s1 = prompt("Введіть назву першої улюбленої гри:");
    let s2 = prompt("Введіть назву другої улюбленої гри:");
    
    if (s1 !== null && s2 !== null) {
        if (s1.length > s2.length) {
            alert("Довша назва: " + s1);
        } else if (s2.length > s1.length) {
            alert("Довша назва: " + s2);
        } else {
            alert("Назви мають однакову кількість символів.");
        }
    }
}

function redirectToProject() {
    if (confirm("Перейти на GitHub репозиторій проекту?")) {
        window.location.href = "https://github.com/Didmwww/kpi-lab1";
    }
}


/* --- ЛАБОРАТОРНА 7: ПОДІЇ ТА ДЕЛЕГУВАННЯ --- */

// Завдання 1: Функція для обробника через атрибут HTML (виклик з about.html)
function attrHandler() {
    alert("Спрацював обробник події миші, призначений через атрибут onclick!");
}

// Запускаємо скрипти після повного завантаження DOM
document.addEventListener("DOMContentLoaded", () => {
    
    // --- ЗАВДАННЯ 1: Способи призначення обробників подій ---

    // 1. Призначення через властивість DOM
    const propBtn = document.getElementById("prop-btn");
    if (propBtn) {
        propBtn.onclick = function() {
            alert("Спрацював обробник, призначений через властивість DOM (element.onclick)!");
        };
    }

    // 2. Кілька обробників на одну подію (addEventListener)
    const multiBtn = document.getElementById("multi-btn");
    if (multiBtn) {
        multiBtn.addEventListener("click", () => console.log("Перший обробник (addEventListener) відпрацював! Заглянь у код."));
        multiBtn.addEventListener("click", () => alert("Другий обробник на тій самій події кліку!"));
    }

    // 3. Призначення об'єкта як обробника (handleEvent) та його видалення
    const objBtn = document.getElementById("obj-btn");
    const removeObjBtn = document.getElementById("remove-obj-btn");
    
    const myHandlerObj = {
        handleEvent(event) {
            alert("Спрацював метод handleEvent об'єкта! Елемент: " + event.currentTarget.tagName);
        }
    };

    if (objBtn && removeObjBtn) {
        objBtn.addEventListener("click", myHandlerObj);
        
        removeObjBtn.onclick = () => {
            objBtn.removeEventListener("click", myHandlerObj);
            alert("Об'єкт-обробник успішно видалено. Спробуйте клікнути на першу кнопку знову.");
        };
    }

    // --- ЗАВДАННЯ 2: Делегування подій та патерн "Поведінка" ---

    // 1. Підсвічування елементів списку (terraria.html)
    const featuresList = document.getElementById("features-list");
    let selectedLi; // змінна для зберігання виділеного елемента

    if (featuresList) {
        // Обробник висить на списку, а не на кожному li
        featuresList.onclick = function(event) {
            let target = event.target;
            
            // Якщо клік був не по елементу списку, нічого не робимо
            if (target.tagName !== "LI") return; 

            // Забираємо підсвітку з попереднього
            if (selectedLi) {
                selectedLi.classList.remove("highlight");
            }
            // Додаємо новому
            selectedLi = target;
            selectedLi.classList.add("highlight");
        };
    }

    // 2. Меню дій з використанням data-* (index.html)
    const actionMenu = document.getElementById("action-menu");
    if (actionMenu) {
        class Menu {
            constructor(elem) {
                this._elem = elem;
                elem.onclick = this.onClick.bind(this); // делегуємо обробку
            }

            save() { alert("Викликано метод: Збереження..."); }
            load() { alert("Викликано метод: Завантаження..."); }
            search() { alert("Викликано метод: Пошук..."); }
            
            onClick(event) {
                let action = event.target.dataset.action; // зчитуємо data-action
                if (action) {
                    this[action](); // викликаємо відповідний метод класу
                }
            }
        }
        new Menu(actionMenu);
    }

    // 3. Патерн "Поведінка" (about.html)
    // Додаємо глобальний обробник, що реагує на елементи з data-behavior="counter"
    document.addEventListener("click", function(event) {
        if (event.target.dataset.behavior === "counter") {
            let count = parseInt(event.target.innerHTML) || 0;
            event.target.innerHTML = count + 1;
        }
    });

});