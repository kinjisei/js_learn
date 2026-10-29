export function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

export function logoutUser() {
    localStorage.removeItem('currentUserId')
}

export function registerUser(username, password) {
    username = username.toLowerCase().trim();

    const users = getUsers();

    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        throw new Error('Такой логин уже существует');
    }

    const user = {
        id: Date.now(),
        username: username,
        password: password
    };

    users.push(user);

    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUserId', user.id);
}

export function loginUser(username, password) {
    username = username.toLowerCase().trim();

    const users = getUsers();
    
    const foundUser = users.find(user => user.username === username && user.password === password);
    
    if (!foundUser) {
        throw new Error('Логин или пароль неверный!');
    }

    localStorage.setItem('currentUserId', foundUser.id);
}