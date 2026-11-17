import { CURRENCY } from './config.js';

// Форматтеры создаём один раз: создание Intl-объекта дороже, чем вызов format()
const priceFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: CURRENCY,
  currencyDisplay: 'narrowSymbol', // «₸» вместо «KZT»
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/** formatPrice(12500) → «12 500 ₸» */
export function formatPrice(value) {
  return priceFormatter.format(value);
}

const pluralRules = new Intl.PluralRules('ru-RU');

/** pluralize(5, ['товар', 'товара', 'товаров']) → «5 товаров» */
export function pluralize(count, [one, few, many]) {
  const forms = { one, few, many };
  return `${count} ${forms[pluralRules.select(count)] ?? many}`;
}
