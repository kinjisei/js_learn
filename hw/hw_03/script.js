// Задача 1. Анализ строки
// Создайте функцию analyzeText(text), которая принимает строку и выводит:
// • Строку без пробелов в начале и конце.
// • Количество символов после удаления этих пробелов.
// • Эту же строку в верхнем и нижнем регистре.
// • Есть ли в строке слово «javascript» — независимо от регистра букв.
// Проверьте функцию на трёх строках:
// " Я изучаю JavaScript "
// "Сегодня хороший день"
// " JAVASCRIPT — это интересно "
// Для первой строки должно получиться: «Я изучаю JavaScript», 18 символов, «Я ИЗУЧАЮ JAVASCRIPT», «я
// изучаю javascript», true.
// Подсказка: пригодятся trim(), toUpperCase(), toLowerCase(), includes() и свойство length.


// function analyzeText(text) {
//     let ready_text = text.trim();
//     console.log(ready_text)
//     console.log(ready_text.length);
//     console.log(ready_text.toUpperCase())
//     let lower_text = ready_text.toLowerCase()
//     console.log(lower_text)
//     if (lower_text.includes('javascript')) {
//         console.log(true)
//     }   else {
//         console.log(false)
//     }

// }

// analyzeText(' Я изучаю JavaScript ')
// analyzeText('Сегодня хороший день')
// analyzeText(' JAVASCRIPT — это интересно ')


// Задача 2. Класс «Заметка»
// Создайте класс Note, который хранит заголовок и текст заметки.
// • Объявите приватное поле #text. Заголовок храните в обычном поле title.
// • В constructor(title, text) сохраните заголовок и текст.
// • Добавьте метод getText(), который возвращает текст из #text.
// • Добавьте метод setText(newText). Удалите пробелы по краям новой строки. Если строка пустая,
// выведите «Текст не должен быть пустым» и сохраните прежний текст. Иначе запишите новую строку
// в #text.
// • Добавьте метод showInfo(), который выводит заголовок, текст и количество символов в тексте.
// Проверка: создайте две заметки с разными заголовками и текстами. Выведите информацию о каждой. У
// первой заметки измените текст на « Повторить методы строк » и выведите результат через getText().
// Затем передайте в setText() строку из одних пробелов: предыдущий текст должен сохраниться. Вторая
// заметка должна остаться без изменений.
// Подсказка: внутри класса обращайтесь к приватному полю через this.#text. Снаружи используйте методы
// объекта.


class Note {
    #text;
    constructor(title, text) {
        this.title = title;
        this.#text = text;
    }

    get text() {
        return this.#text;
    }

    set text(new_text) {
        if (!new_text) {
            alert('Текст не должен быть пустым');
            return;
        }
        this.#text = new_text;
    }

    setText(new_text) {
        this.#text = new_text.trim();
    }

    getText() {
        return this.text;
    }

    showInfo() {
        console.log(`Заголовок: ${this.title}\nТекст: ${this.text}\nколичество символов в тексте: ${this.text.length}`);
    }
}

let test_1 = new Note('asd', 'asd asd sad asd asd');
let test_2 = new Note('qwe', 'qweqwe qweqwe qweqwe');
test_1.showInfo()
test_2.showInfo()
test_1.setText(' Повторить методы строк ');
console.log(test_1.getText());
test_1.setText('  ');
test_1.showInfo()
test_2.showInfo()
