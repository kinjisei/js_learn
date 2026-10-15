// Создайте класс Character со следующими полями и методами:
// • name — имя персонажа.
// • #health — приватное поле здоровья. Начальное значение — 100.
// • get health() — возвращает текущее значение #health. Пример обращения: warrior.health.
// • set health(value) — изменяет #health, если число от 0 до 100 включительно. Иначе здоровье не
// меняется. Пример: warrior.health = 80.
// • showInfo() — выводит имя и текущее здоровье.
// • takeDamage(amount) — уменьшает здоровье на amount. Здоровье не должно становиться меньше 0.
// Если передано отрицательное число, ничего не меняйте.
// • attack() — выводит сообщение «Персонаж [имя] атакует».
// Поле #health доступно только внутри Character. Снаружи читайте и изменяйте здоровье через health.
// Геттер и сеттер используются как свойство, без круглых скобок.

class Character {
    #health = 100;
    constructor(name) {
        this.name = name;
    }

    get health() {
        return this.#health;
    }

    set health(value) {
        if (value >= 0 && value <= 100) {
            this.#health = value;
        }
    }

    showInfo() {
        console.log(`Имя: ${this.name}\nТекущее здоровье: ${this.health}`);
    }

takeDamage(amount) {
    if (amount < 0) {
        return
    };
    
    this.#health -= amount;
    if (this.#health < 0) {
        this.#health = 0;
    }
}

    attack() {
        console.log(`Персонаж ${this.name} атакует!`);
    }
}

// let warrior = new Character('angel');
// warrior.health = 150;
// warrior.showInfo();
// warrior.takeDamage(20);
// warrior.showInfo();
// warrior.attack()

// 2 Наследование и полиморфизм
// Создайте два класса, которые наследуются от Character. В каждом переопределите метод attack():
// • Warrior — выводит «Воин [имя] атакует мечом».
// • Mage — выводит «Маг [имя] использует заклинание».
// Методы showInfo(), takeDamage(), а также get и set для health должны наследоваться от Character.

class Warrior extends Character {
    constructor(name) {
        super(name);
    }
    attack() {
        console.log(`Войн ${this.name} атакует мечом`)
    }
}

class Mage extends Character {
    constructor(name) {
        super(name);
    }
    attack() {
        console.log(`Маг ${this.name} использует заклинание`)
    }
}



// 3 Проверка работы
// 1. Создайте одного воина и одного мага. Выведите информацию о каждом.
// 2. Проверьте set: задайте воину health = 80, затем health = −10. Через get выведите здоровье — должно
// остаться 80. Перед проверкой урона верните health = 100.
// 3. Нанесите воину 30 урона, а магу — 120.
// 4. Снова выведите информацию: у воина должно остаться 70 здоровья, у мага — 0.
// 5. Добавьте обоих персонажей в массив.
// 6. Через цикл или forEach() вызовите 
let barbarian = new Warrior('barbarian');
barbarian.showInfo();
let mage = new Mage('mage');
mage.showInfo();
barbarian.health = 80;
barbarian.health = -10;
console.log(barbarian.health);
barbarian.health = 100;
barbarian.takeDamage(30);
barbarian.showInfo();
mage.showInfo();

let array = [barbarian, mage]
array.forEach(function (character) {
    character.attack()
})