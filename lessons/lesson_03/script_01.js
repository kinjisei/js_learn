// let user = {
//     name: 'UserName',
//     password: '1234qwerty',
//     age: 10,

//     show_info(id) {
//         console.log(id)
//         console.log(`Name: ${this.name}, Age: ${this.age}`)
//     }
// }

// user.show_info(10)


// class User {
//     constructor(id, name, password) {
//         this.id = id
//         this.name = name
//         this.password = password

//     }
// }

// let user = new User(1, 'User', 'qwerty');

// console.log(user.id)
// console.log(user.name)

// let salaries = {
//     John: 100,
//     Ann: 160,
//     Pete: 130,
//     cpu_core: 12,
//     price: 300000,
//     stock: 10
// }

// function isEmpty(obj) {
//     for (let i in obj) {
//         return false;
//     }
//     return true;
// }

// console.log(isEmpty(salaries))


// function sumiraize(obj) {
//     let sum = 0;
//     for (let key in obj) {
//         sum += obj[key]
//     }
//     return sum
// }

// console.log(sumiraize(salaries))


// function multiplyNumerie(obj) {
//     let total = 0;
//     for (let key in obj) {
//         if (typeof obj[key] === 'number') {
//             obj[key] *= 2;
//             total += obj[key]
//         }
//     }
//     obj.total_salaries = total

// }
// multiplyNumerie(salaries)
// console.log(salaries)

// let laptop = {
//     stock: 20,
//     price: 300000,
// }

// laptop.total = laptop['stock'] * laptop['price'];

// console.log(laptop)

class User {
    #password;
    constructor(name, password) {
        this.name = name;
        this.#password = password;
    }

    get_password() {
        return this.#password
    }

    set_password(password) {
        if (password.length < 6) {
            alert('Пароль должен быть не менее 6 символов')
            throw new Error('Ошибка длины пароля')
        }
        this.#password = password;
    }
}


user = new User('username', '1234')

console.log(user.name);
try {
    user.set_password('4321');

} catch(error) {
    console.log(error)
    console.log(error.message)
}

console.log(user.get_password())