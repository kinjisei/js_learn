const postTemplate = document.querySelector('#post-template');

export function renderPosts(container, posts, { editingId, busyIds }) {
  if (posts.length === 0) {
    renderListStatus(container, 'Постов пока нет');
    return;
  }

  const newestFirst = [...posts].reverse();
  const cards = newestFirst.map((post) => createPostCard(post, {
    isEditing: post.id === editingId,
    isBusy: busyIds.has(post.id),
  }));

  container.replaceChildren(...cards);
}

function createPostCard(post, { isEditing, isBusy }) {
  const card = postTemplate.content.firstElementChild.cloneNode(true);

  card.dataset.id = post.id;
  card.querySelector('.post__title').textContent = post.title;
  card.querySelector('.post__content').textContent = post.content;

  card.classList.toggle('is-editing', isEditing);
  card.setAttribute('aria-busy', String(isBusy));

  for (const button of card.querySelectorAll('button')) {
    button.disabled = isBusy;
  }
  if (isBusy) {
    card.querySelector('[data-action="delete"]').textContent = 'Удаляем…';
  }

  return card;
}

export function renderListStatus(container, text, onRetry) {
  const status = document.createElement('div');
  status.className = 'list-status';

  const message = document.createElement('p');
  message.textContent = text;
  status.append(message);

  if (onRetry) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'button';
    button.textContent = 'Повторить';
    button.addEventListener('click', onRetry, { once: true });
    status.append(button);
  }

  container.replaceChildren(status);
}

const messageTimers = new WeakMap();

export function showMessage(element, text, type = 'error') {
  clearTimeout(messageTimers.get(element));
  element.textContent = text;
  element.dataset.type = type;

  if (type === 'success') {
    messageTimers.set(element, setTimeout(() => {
      element.textContent = '';
    }, 3000));
  }
}
