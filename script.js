/* --- ЛАБОРАТОРНА 6: ЗОВНІШНІЙ СКРИПТ --- */
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

// Завдання 1 (Лаб 7)
function attrHandler() {
    alert("Спрацював обробник події миші, призначений через атрибут onclick!");
}

document.addEventListener("DOMContentLoaded", () => {
    
    // --- ЛАБОРАТОРНА 7 ---
    const propBtn = document.getElementById("prop-btn");
    if (propBtn) {
        propBtn.onclick = function() {
            alert("Спрацював обробник, призначений через властивість DOM (element.onclick)!");
        };
    }

    const multiBtn = document.getElementById("multi-btn");
    if (multiBtn) {
        multiBtn.addEventListener("click", () => console.log("Перший обробник (addEventListener) відпрацював! Заглянь у код."));
        multiBtn.addEventListener("click", () => alert("Другий обробник на тій самій події кліку!"));
    }

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

    const featuresList = document.getElementById("features-list");
    let selectedLi; 
    if (featuresList) {
        featuresList.onclick = function(event) {
            let target = event.target;
            if (target.tagName !== "LI") return; 
            if (selectedLi) {
                selectedLi.classList.remove("highlight");
            }
            selectedLi = target;
            selectedLi.classList.add("highlight");
        };
    }

    const actionMenu = document.getElementById("action-menu");
    if (actionMenu) {
        class Menu {
            constructor(elem) {
                this._elem = elem;
                elem.onclick = this.onClick.bind(this); 
            }
            save() { alert("Викликано метод: Збереження..."); }
            load() { alert("Викликано метод: Завантаження..."); }
            search() { alert("Викликано метод: Пошук..."); }
            
            onClick(event) {
                let action = event.target.dataset.action; 
                if (action) {
                    this[action](); 
                }
            }
        }
        new Menu(actionMenu);
    }

    document.addEventListener("click", function(event) {
        if (event.target.dataset.behavior === "counter") {
            let count = parseInt(event.target.innerHTML) || 0;
            event.target.innerHTML = count + 1;
        }
    });

    // --- ЛАБОРАТОРНА 8: ПОДІЇ МИШІ ТА DRAG-AND-DROP ---

    // 1. Події mouseover, mouseout та використання relatedTarget
    const hoverZone = document.getElementById("hover-zone");
    const hoverInfo = document.getElementById("hover-info");

    if (hoverZone && hoverInfo) {
        hoverZone.addEventListener("mouseover", function(event) {
            let target = event.target;
            let relatedTarget = event.relatedTarget;
            
            // Якщо навели мишу на елемент з класом hover-item
            if (target.classList.contains("hover-item")) {
                target.style.transform = "scale(1.1)";
                target.style.backgroundColor = "#f1c40f";
                
                let fromTag = relatedTarget ? relatedTarget.tagName : 'за межами зони';
                hoverInfo.innerText = `Вказівник миші НАВЕДЕНО на: ${target.tagName} (прийшов з ${fromTag})`;
            }
        });

        hoverZone.addEventListener("mouseout", function(event) {
            let target = event.target;
            let relatedTarget = event.relatedTarget;

            // Якщо миша покинула елемент з класом hover-item
            if (target.classList.contains("hover-item")) {
                target.style.transform = "";
                target.style.backgroundColor = ""; // Повертаємо стилі
                
                let toTag = relatedTarget ? relatedTarget.tagName : 'за межі зони';
                hoverInfo.innerText = `Вказівник миші ПОКИНУВ: ${target.tagName} (перейшов на ${toTag})`;
            }
        });
    }

    // 2. Drag-and-Drop (mousedown, mousemove, mouseup)
    const dragItem = document.getElementById("drag-item");

    if (dragItem) {
        dragItem.onmousedown = function(event) {
            // Запобігаємо стандартному виділенню тексту
            event.preventDefault(); 
            
            // Отримуємо координати курсору відносно елемента, щоб захопити його за те місце, де клікнули
            let shiftX = event.clientX - dragItem.getBoundingClientRect().left;
            let shiftY = event.clientY - dragItem.getBoundingClientRect().top;

            // Встановлюємо елементу абсолютне позиціонування
            dragItem.style.position = 'absolute';
            dragItem.style.zIndex = 1000;
            dragItem.style.cursor = 'grabbing'; // Змінюємо курсор на "захоплено"
            document.body.append(dragItem); // Переміщуємо об'єкт безпосередньо в body

            // Функція для переміщення об'єкта під курсор
            function moveAt(pageX, pageY) {
                dragItem.style.left = pageX - shiftX + 'px';
                dragItem.style.top = pageY - shiftY + 'px';
            }

            // Пересуваємо під поточні координати при першому кліку
            moveAt(event.pageX, event.pageY);

            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }

            // Відстежуємо рух миші по всьому документу
            document.addEventListener('mousemove', onMouseMove);

            // Коли кнопку миші відпущено, зупиняємо відстеження
            dragItem.onmouseup = function() {
                document.removeEventListener('mousemove', onMouseMove);
                dragItem.onmouseup = null;
                dragItem.style.cursor = 'grab'; // Повертаємо курсор
            };
        };

        // Вимикаємо вбудований браузерний механізм drag-and-drop, щоб уникнути конфліктів
        dragItem.ondragstart = function() {
            return false;
        };
    }

});