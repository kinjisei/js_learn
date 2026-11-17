// Все настройки приложения в одном месте.
// Сменить API, корзину или валюту — правка одной строки, а не поиск по всем файлам.

export const API_URL = 'https://6ae9f1da3d3dd3d37be5f13f.mockapi.io/api/online_store';

// Авторизации пока нет, поэтому у всех одна корзина с id = 1.
export const CART_ID = '1';

// Код валюты по ISO 4217: 'KZT' — тенге, 'RUB' — рубли, 'USD' — доллары.
export const CURRENCY = 'KZT';

// Через сколько миллисекунд считать, что сервер не ответил.
export const REQUEST_TIMEOUT_MS = 10_000;
