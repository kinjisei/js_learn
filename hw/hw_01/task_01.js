//  Подсчитать сумму всех чисел в заданном пользователем диапазоне. 

let start = Number(prompt('Введите начало диапазона'));
let end = Number(prompt('Введите конец диапозона'));

let suma;

for (let i = start; i <= end; i++) {
    suma += i;
}

console.log(suma);