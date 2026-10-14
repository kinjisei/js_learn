class BankAccount {
    #password;
    #balance;

    constructor(name, password, balance = 0, bonus = 0) {
        this.name = name;
        this.#password = password;
        this.#balance = balance;
        this.bonus = bonus;
    }

    get password() {
        return this.#password;
    }

    set password(value) {
        if (value.length < 6) {
            alert("Пароль должен быть не меньше 6 символов");
            return;
        }
        this.#password = value;
    }

    get balance() {
        return this.#balance;
    }

    set balance(value) {
        if (value < 0) {
            alert('Баланс не может быть меньше 0!')
            return;
        }
        this.#balance = value;
    }

    deposit(amount) {
        if (isNaN(amount)) {
            throw new Error('Введено не верное значение!')
        }

        if (typeof amount !== "number") {
            throw new Error('Введено не верное значение!')
        }

        if (amount <= 0) {
            alert('Сумма должна быть больше нуля')
            return;
        }

        this.#balance += amount;
        this.bonus += amount * 0.1
        alert(`Успешное пополнение на сумму ${amount} тенге`)
    }

    whithdraw(amount) {
        if (isNaN(amount)) {
            throw new Error('Введено не верное значение!')
        }

        if (typeof amount !== "number") {
            throw new Error('Введено не верное значение!')
        }
        if (amount <= 0) {
            alert('Сумма должна быть больше нуля')
            return;
        }

        if (amount > this.balance) {
            alert('Недостаточно средств!')
            return;
        }

        this.#balance -= amount;
        alert(`Успешное снятие на сумму ${amount} тенге`)
    }

    show_info() {
        alert(`name: ${this.name}
            balance: ${this.balance}
            bonus: ${this.bonus}`)
    }

    toJSON() {
        return {
            name: this.name,
            password: this.password,
            balance: this.balance,
            bonus: this.bonus,
        }
    }
}


class DepositAccount extends BankAccount {
    constructor(name, password, balance = 0, bonus, savings) {
        super(name, password, balance, bonus);
        this.savings = savings;
    }

    show_info() {
        alert(`name: ${this.name}
            balance: ${this.balance}
            bonus: ${this.bonus}
            savings: ${this.savings}`)
    }
    deposit_savings(amount) {
        if (isNaN(amount)) {
            throw new Error("Не верное занчение amount, не число!");
        }
        if (typeof amount !== "number") {
            throw new Error("Не верное занчение amount, не число!");
        }
        if (amount <= 0) {
            alert("Сумма должна быть больше 0!")
            return;
        }
        this.savings += amount;
        alert(`Успешное пополнение депозита на сумму ${amount}тг.`)
    }

    toJSON() {
        return {
            name: this.name,
            password: this.password,
            balance: this.balance,
            bonus: this.bonus,
            savings: this.savings,
            acc_type: 'deposit'
        }
    }
}

function save_users() {
    localStorage.setItem('users', JSON.stringify(users));
}

function load_users() {
    let json = localStorage.getItem("users");
    if (!json) {
        return [];
    }
    let data = JSON.parse(json);

    // let temp = [];
    // data.forEach(function (item) {
    //     let user = new BankAccount(item.name, item.password, item.balance);
    //     temp.push(user);
    // return temp;
    // })

    return data.map(function (item) {
        if (item.acc_type === 'deposit') {
            return new DepositAccount(item.name, item.password, item.balance, item.bonus, item.savings);
        } else {
            return new BankAccount(item.name, item.password, item.balance, item.bonus);
        }
    });
}

function main(account) {
    let is_runnig = true;
    if (account && account.constructor === BankAccount) {
        while (is_runnig) {
            let choice = prompt(`
            1. Инфо
            2. Пополнить баланс
            3. Снятие средств
            0. Выход`)

            switch (choice) {
                case "1":
                    account.show_info();
                    break;
                case "2":
                    try {
                        account.deposit(Number(prompt('Введтите сумму: ')));
                        save_users();
                    } catch (error) {
                        console.log(error);
                    }

                    break;
                case "3":
                    try {
                        account.whithdraw(Number(prompt('Введтите сумму: ')));
                        save_users();
                    } catch (error) {
                        console.log(error);
                    }

                    break;
                case "0":
                    alert('Пока!')
                    is_runnig = false;
                    break;

            }
        }
    } else if (account && account.constructor === DepositAccount) {

        while (is_runnig) {
            let choice = prompt(`
            1. Инфо
            2. Пополнить баланс
            3. Снятие средств
            4. Пополнить депозит
            0. Выход`)

            switch (choice) {
                case "1":
                    account.show_info();
                    break;
                case "2":
                    try {
                        account.deposit(Number(prompt('Введтите сумму: ')));
                        save_users();
                    } catch (error) {
                        console.log(error);
                    }

                    break;
                case "3":
                    try {
                        account.whithdraw(Number(prompt('Введтите сумму: ')));
                        save_users();
                    } catch (error) {
                        console.log(error);
                    }

                    break;
                case "4":
                    try {
                        account.deposit_savings(Number(prompt('Введтите сумму: ')));
                        save_users();
                    } catch (error) {
                        console.log(error);
                    }
                    break;
                case "0":
                    alert('Пока!')
                    is_runnig = false;
                    break;

            }
        }
    }
}


// acc = new BankAccount('test', '123456', 10000);
// main(acc);

function registration(username, password, acc_type, users) {
    let user = users.find(function (user) {
        // if (username === user.name) {
        //     return true
        // }
        return username === user.name;
    });

    if (user) {
        alert('Такой пользователь уже существует!')
        return;
    }

    let acc;
    if (acc_type === 'deafolt') {
        acc = new BankAccount(username, password);
    } else if (acc_type === 'deposit') {
        acc = new DepositAccount(username, password, 0, 0, 0);
    } else {
        throw new Error('Введен не верный тип аккаунта')
    }
    users.push(acc);
    save_users();
    main(acc);
}

function login(username, password, users) {
    let user = users.find(function (user) {
        return user.name === username && user.password === password;
    });
    if (user) {
        main(user);
        return;
    }
    alert('Неверный логин или пароль')
}

let users = load_users();

function auth() {
    let is_runnig = true;
    let username;
    let password;
    let acc_type;
    while (is_runnig) {
        let choice = prompt(`
            1. Войти
            2. Регистрация
            0. Выйти`)


        switch (choice) {
            case "1":
                username = prompt("Введите имя: ");
                password = prompt("Введите пароль: ");
                login(username, password, users);
                break;
            case "2":
                username = prompt("Введите имя: ");
                password = prompt("Введите пароль: ");
                acc_type = prompt("Введите тип аккаунта: \ndeafolt\ndeposit")
                try {
                    registration(username, password, acc_type, users);
                } catch (error) {
                    console.log(error)
                }

                break;
            case "0":
                alert('Пока!');
                is_runnig = false;
                break;
        }
    }
}

auth()