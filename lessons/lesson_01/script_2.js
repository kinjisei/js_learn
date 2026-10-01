let total_even = 0;
let total_odd = 0;

for (let i = 1; i <= 10; i++) {
    if (i % 2 === 0) {
        total_even += i;
    }
    else {
        total_odd += i;
    }
}

console.log(total_even);
console.log(total_odd);