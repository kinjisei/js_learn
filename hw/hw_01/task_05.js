//  Подсчитать сумму всех чисел в заданном пользователем диапазоне. 

// let start = Number(prompt('Введите начало диапазона'));
// let end = Number(prompt('Введите конец диапозона'));

// let suma;

// for (let i = start; i <= end; i++) {
//     suma += i;
// }

// console.log(suma);


// Запросить 2 числа и найти только наибольший общий делитель

// let numb_1 = Number(prompt('Введите первое число'));
// let numb_2 = Number(prompt('Введите второе число'));

// let div;

// for (let i = 1; i <= numb_1 && i <= numb_2 ;i++) {
//     if (numb_1 % i === 0 && numb_2 % i === 0){
//         div = i;
//     };
// };

// console.log(div)


// Запросить у пользователя число и вывести все делители этого числа.

// let numb = Number(prompt('Введите число'));

// for (let i = 1; i <= numb; i++){
//     if (numb % i === 0){
//         console.log(i)
//     }
// }

// Определить количество цифр в введенном числе

// let numb = prompt('Введите число');

// console.log(String(Math.abs(numb)).length);

// Запросить у пользователя 10 чисел и подсчитать, сколько
// он ввел положительных, отрицательных и нулей. При этом
// также посчитать, сколько четных и нечетных. Вывести
// статистику на экран. Учтите, что достаточно одной переменной (не 10) для ввода чисел пользователем.

// let positiv_num = 0;
// let negativ_num = 0;
// let zeros = 0;

// for (let i = 1; i <= 10; i++) {
//     let numb = prompt('Введите', i, 'число');
//     if (numb > 0){
//         positiv_num++
//     } else if (numb < 0) {
//         negativ_num++
//     }
//     else {
//         zeros++
//     }
// }

// console.log("положительные: ", positiv_num)
// console.log("негативные: ", negativ_num)
// console.log("нули: ", zeros)



//  Зациклить калькулятор. Запросить у пользователя 2 числа
// и знак, решить пример, вывести результат и спросить, хочет ли он решить еще один пример. И так до тех пор, пока
// пользователь не откажется

// calcLoop: while (true) {
//   let action = prompt('Выберите действие:\n1: сложение\n2: вычитание\n3: умножение\n4: деление\n5: закончить');
//   let cleanAction = action?.toLowerCase().trim();

//   if (cleanAction === "5" || cleanAction === "закончить") {
//     console.log("Работа завершена.");
//     break calcLoop;
//   }

//   let numb_1 = Number(prompt('Введите первое число'));
//   let numb_2 = Number(prompt('Введите второе число'));

//   switch (cleanAction) {
//     case "1":
//     case "сложение":
//     case "+":
//       console.log(`Результат: ${numb_1 + numb_2}`);
//       break;

//     case "2":
//     case "вычитание":
//     case "-":
//       console.log(`Результат: ${numb_1 - numb_2}`);
//       break;

//     case "3":
//     case "умножение":
//     case "*":
//       console.log(`Результат: ${numb_1 * numb_2}`);
//       break;

//     case "4":
//     case "деление":
//     case "/":
//       if (numb_2 === 0) {
//         console.log("Ошибка: На ноль делить нельзя!");
//       } else {
//         console.log(`Результат: ${numb_1 / numb_2}`);
//       }
//       break;

//     default:
//       console.log("Неизвестная операция");
//   }

//   let confirmAgain = confirm("Хотите решить еще один пример?");
//   if (!confirmAgain) {
//     console.log("Работа завершена.");
//     break calcLoop;
//   }
// }


// Запросить у пользователя число и на сколько цифр его
// сдвинуть. Сдвинуть цифры числа и вывести результат (если
// число 123456 сдвинуть на 2 цифры, то получится 345612).


// let numb = prompt('Введите число');
// let move = Number(prompt('Введите значение на которое вы хотите сдвинуть'));

// let result_numb = numb.slice(move) + numb.slice(0, move);
// console.log(result_numb);

// Зациклить вывод дней недели таким образом: «День недели.
// Хотите увидеть следующий день?» и так до тех пор, пока
// пользователь нажимает OK. 

// let week_days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

// let index = 0;

// while (true) {
//     let next = confirm(`${week_days[index]}. Хотите увидеть след деньь?`);

//     if (!next){
//         console.log('До свидания!');
//         break;
//     }

//     index = (index + 1) % 7
// }


// Вывести таблицу умножения для всех чисел от 2 до 9.
// Каждое число необходимо умножить на числа от 1 до 10

// for (let i = 2; i < 10; i++){
//     for (let j = 1; j < 11; j++){
//         console.log(`${i} * ${j} = ${i*j}`)
//     }
// }

// Игра «Угадай число». Предложить пользователю загадать
// число от 0 до 100 и отгадать его следующим способом:
// каждую итерацию цикла делите диапазон чисел пополам,
// записываете результат в N и спрашиваете у пользователя
// «Ваше число > N, < N или == N?». В зависимости от того
// что указал пользователь, уменьшаете диапазон. Начальный
// диапазон от 0 до 100, поделили пополам и получили 50.
// Если пользователь указал, что его число > 50, то изменили
// диапазон на от 51 до 100. И так до тех пор, пока пользователь не выберет == N.

let min_value = 0;
let max_value = 100;

alert("Загадайте число от 0 до 100, а я попробую его отгадать!");

loop: while (true) {
  let mid_value = Math.floor((min_value + max_value) / 2);

  let choice = prompt(`Ваше число > ${mid_value}, < ${mid_value} или = ${mid_value}?`);
  let clean_choice = choice?.toLowerCase().trim();

  switch (clean_choice) {
    case ">":
    case "больше":
      min_value = mid_value + 1;
      break;

    case "<":
    case "меньше":
      max_value = mid_value - 1;
      break;

    default:
      alert("Некорректный ввод! Используйте символы >, < или ==");
  }

  if (min_value === max_value) {
    alert(`Ваше число ${min_value}!`);
    break loop;
  }
}