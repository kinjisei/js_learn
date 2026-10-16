

let wishes = JSON.parse(localStorage.getItem('wishes')) || [];
function addWish(wish) {
    wishes.push(wish);
    alert('Желание было успешно добавлена!');
    saveData();
}

function saveData() {
    localStorage.setItem('wishes', JSON.stringify(wishes))
}

function showWishes() {
    if (wishes.length === 0) {
        alert('Список желаний пуст!');
        return;
    }
    wishes.forEach(function (item, index) {
        console.log(`Желание №${index + 1}:${item}`)
    })
}

function deleteWish(number) {
    if (wishes.length === 0) {
        alert('Список желаний пуст!');
        return;
    }

    if (isNaN(number) || number < 1 || number > wishes.length) {
        alert("Желания под таким номером нет!");
        return;
    }
    let index = number - 1;
    wishes.splice(index, 1);
    saveData();
    alert(`Желание под номером ${number} было успешно удалено!`)

}
let is_running = true;
while (is_running) {
    let choice = prompt('1 — Добавить желание\n2 — Показать список\n3 — Удалить желание\n0 — Выход')

    switch (choice) {
        case '0':
            is_running = false;
            break;
        case '1':
            let wish = prompt('Введите название товара которое вы хотите купить: ');
            if (wish) {
                addWish(wish.trim());
            }
            break;
        case '2':
            showWishes();
            break;
        case '3':
            let number_of_wish = Number(prompt('Введите номер желания котрое вы хотите удалить: '));
            deleteWish(number_of_wish);
            break;
    }
}

