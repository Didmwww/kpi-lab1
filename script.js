/* --- ЛАБОРАТОРНА 6: ЗОВНІШНІЙ СКРИПТ --- */

// Функція «Діалог з користувачем» (Змінні, умови, цикли)
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

// Функція виводу інфо про розробника (Параметри + Значення за замовчуванням)
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

// Функція порівняння двох рядків (alert більшого)
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

// Перенаправлення (BOM location)
function redirectToProject() {
    if (confirm("Перейти на GitHub репозиторій проекту?")) {
        window.location.href = "https://github.com/Didmwww/kpi-lab1";
    }
}