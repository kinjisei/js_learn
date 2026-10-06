// Напишите функцию showShoppingList(items). С помощью forEach выведите каждый элемент массива в
// отдельной строке.
// Пример: ["Хлеб", "Молоко", "Яблоки"] → три строки с названиями покупок

// let items = ["Хлеб", "Молоко", "Яблоки"];

// function showShoppingList(items) {
//     items.forEach((item) => {
//         console.log(item);
//     });
// }

// showShoppingList(items);


// Напишите функцию getEvenNumbers(numbers). С помощью filter верните новый массив только с чётными
// числами. Исходный массив не изменяйте.
// Пример: [3, 8, 11, 14, 5, 20] → [8, 14, 20]. Если чётных чисел нет, верните []

// let numbers = [3, 8, 11, 14, 5, 20];

// function getEvenNumbers(numbers) {
//     let evenNumbers = numbers.filter(evenNumb => evenNumb % 2 === 0);
//     return evenNumbers;
// }

// console.log(getEvenNumbers(numbers));

// Напишите функцию findGreaterThan(numbers, limit). С помощью find верните первое число, которое
// больше limit. Если такого числа нет, верните undefined.
// Пример: массив [4, 12, 7, 18], limit = 10 → 12. При limit = 20 → undefined

// let numbers = [4, 12, 7, 18];
// let limit = Number(prompt('Введите значение: '));

// function findGreaterThan(numbers, limit) {
//     return numbers.find(numb => numb > limit);
// }

// console.log(findGreaterThan(numbers, limit))

// Напишите функцию calculateTotal(prices). С помощью reduce верните сумму всех цен. Начальное значение
// суммы должно быть 0.
// Пример: [100, 250, 50] → 400. Для пустого массива [] результат должен быть 0.

// let number = [100, 250, 50];
// function calculateTotal(prices) {
//     return prices.reduce((acc, price) => acc + price, 0)
// }   

// console.log(calculateTotal(number))

// Напишите функцию getMaxNumber(numbers). Найдите и верните самое большое число с помощью цикла
// for. Считайте, что массив непустой. Проверьте функцию также на отрицательных числах.
// Примеры: [6, 15, 2, 9] → 15; [-8, -3, -10] → -3.

// let numbers_1 = [6, 15, 2, 9];
// let numbers_2 = [-8, -3, -10];


// function getMaxNumber(numbers) {
//     let maxNumb = null;
//     numbers.forEach(num => {
//         if (maxNumb === null || maxNumb < num) {
//             maxNumb = num;
//         };
//     });
//     return maxNumb;
// }

// console.log(getMaxNumber(numbers_1));

// console.log(getMaxNumber(numbers_2));