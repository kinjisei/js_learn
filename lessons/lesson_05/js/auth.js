function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

export function registerUser(username, password) {
    username = username.toLowerCase().trim();

    const users = getUsers();

    const existingUser = users.find(function(user) {
        return user.username === username;
    })
    if (existingUser) {
        throw new Error('Такой логин уже существует')
    }

    const user = {
        id: Date.now(),
        userName: username,
        password: password
    }

    users.push(user);

    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUserId', user.id);
}

export function loginUser(username, password) {
    username = username.toLowerCase().trim();

    const users = getUsers();
    user.find(function(user) {
        return user.username === username && user.password === password;
    });
    if (!user) {
        throw new Error('Логин или пароль не верный!');
    }

    localStorage.setItem('currentUserId', user.id);
}