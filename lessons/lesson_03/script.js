let str = 'aaa bbb ccc';

let result_1 = str.substr(4,3);
let result_2 = str.substring(4,7);
let result_3 = str.slice(4,7);

console.log(result_1);
console.log(result_2);
console.log(result_3);

let str_01 = 'я учу Javascript';
console.log(str_01.length);

let find_word = 'учу';
console.log(str_01.indexOf(find_word));

let str_02 = 'Я-учу-javascript!';
console.log(str_02.replaceAll('-', '!'));

let str_03 = prompt('Введите текст: ');
let str_03_capitalized = str_03[0].toUpperCase() + str_03.slice(1)

console.log(str_03_capitalized)