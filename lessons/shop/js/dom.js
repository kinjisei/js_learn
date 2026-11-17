/*
 * Небольшие помощники для работы с DOM, общие для обеих страниц.
 * Данные с сервера всегда вставляем через textContent, а не innerHTML:
 * так браузер покажет «<script>» как текст и не выполнит его.
 */

/**
 * Клонирует содержимое <template> и собирает элементы с атрибутом data-ref.
 * const { root, refs } = cloneTemplate(template);  refs.title.textContent = '...'
 */
export function cloneTemplate(template) {
  const root = template.content.firstElementChild.cloneNode(true);
  const refs = {};
  for (const element of root.querySelectorAll('[data-ref]')) {
    refs[element.dataset.ref] = element;
  }
  return { root, refs };
}

/** Ищет элемент списка по data-id. CSS.escape защищает от спецсимволов в id. */
export function findById(container, id) {
  return container.querySelector(`[data-id="${CSS.escape(id)}"]`);
}

/** Картинка товара, а если её нет — заглушка с первой буквой названия. */
export function renderMedia(container, { picture, title }) {
  if (picture) {
    const image = document.createElement('img');
    image.src = picture;
    image.alt = ''; // название уже есть рядом в заголовке, читать его дважды не нужно
    image.loading = 'lazy';
    container.replaceChildren(image);
  } else {
    container.textContent = title.trim().charAt(0).toUpperCase();
  }
}

/**
 * Блок состояния страницы: «Загружаем…», «Ничего не найдено»,
 * ошибка с кнопкой «Повторить». Пустой message скрывает блок.
 */
export function renderStatus(container, message, onRetry) {
  container.hidden = !message;
  container.replaceChildren();
  if (!message) return;

  const text = document.createElement('p');
  text.textContent = message;
  container.append(text);

  if (onRetry) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'button';
    button.textContent = 'Повторить';
    button.addEventListener('click', onRetry, { once: true });
    container.append(button);
  }
}

/*
 * Всплывающее уведомление внизу экрана. Элемент #notice с aria-live есть
 * в разметке всегда: скринридер объявит текст, как только он изменится.
 */
let noticeTimer;

export function showNotice(message, type = 'info') {
  const notice = document.querySelector('#notice');
  clearTimeout(noticeTimer);
  notice.textContent = message;
  notice.dataset.type = type;
  notice.classList.add('is-visible');
  noticeTimer = setTimeout(() => {
    notice.classList.remove('is-visible');
  }, 3500);
}
