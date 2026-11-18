const THEME_KEY = 'theme';

export function getTheme() {
    return localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light';
}

export function saveTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
}
