// Запросить 2 числа и найти только наибольший общий делитель

let numb_1 = Number(prompt('Введите первое число'));
let numb_2 = Number(prompt('Введите второе число'));

let div;

for (let i = 1; i <= numb_1 && i <= numb_2 ;i++) {
    if (numb_1 % i === 0 && numb_2 % i === 0){
        div = i;
    };
};

console.log(div)