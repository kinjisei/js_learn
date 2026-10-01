// Запросить у пользователя число и вывести все делители этого числа.

let numb = Number(prompt('Введите число'));

for (let i = 1; i <= numb; i++){
    if (numb % i === 0){
        console.log(i)
    }
}