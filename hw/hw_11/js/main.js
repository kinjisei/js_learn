import { getPosts, createPost, updatePost, deletePost } from './api.js';
import { renderPosts, renderListStatus, showMessage } from './render.js';

const form = document.querySelector('#post-form');
const titleInput = form.elements.title;
const contentInput = form.elements.content;
const formTitle = document.querySelector('#form-title');
const submitButton = document.querySelector('#submit-button');
const cancelButton = document.querySelector('#cancel-button');
const formMessage = document.querySelector('#form-message');
const listMessage = document.querySelector('#list-message');
const postList = document.querySelector('#post-list');
const postCount = document.querySelector('#post-count');

let posts = [];
let editingId = null;
let isSubmitting = false;
const busyIds = new Set();

form.addEventListener('submit', handleSubmit);
form.addEventListener('input', (event) => event.target.removeAttribute('aria-invalid'));
cancelButton.addEventListener('click', stopEditing);
postList.addEventListener('click', handleListClick);

loadPosts();


async function loadPosts() {
  renderListStatus(postList, 'Загружаем посты…');
  try {
    posts = await getPosts();
    render();
  } catch (error) {
    console.error(error);
    renderListStatus(postList, 'Не удалось загрузить посты. Проверьте интернет.', loadPosts);
  }
}


async function handleSubmit(event) {
  event.preventDefault();
  if (isSubmitting) return;

  const post = {
    title: titleInput.value.trim(),
    content: contentInput.value.trim(),
  };

  const error = validatePost(post);
  if (error) {
    showMessage(formMessage, error, 'error');
    highlightEmptyFields(post);
    return;
  }

  setSubmitting(true);
  try {
    if (editingId === null) {
      await addPost(post);
    } else {
      await editPost(editingId, post);
    }
  } catch (requestError) {
    console.error(requestError);
    const action = editingId === null ? 'добавить пост' : 'сохранить изменения';
    showMessage(formMessage, `Не удалось ${action}. Попробуйте ещё раз.`, 'error');
  } finally {
    setSubmitting(false);
  }
}

async function addPost(post) {
  const createdPost = await createPost(post);
  posts.push(createdPost); 
  form.reset();
  showMessage(formMessage, 'Пост добавлен', 'success');
  render();
}

async function editPost(id, post) {
  const oldPost = posts.find((item) => item.id === id);
  const isChanged = oldPost.title !== post.title || oldPost.content !== post.content;

  if (isChanged) {
    const updatedPost = await updatePost(id, post);
    posts = posts.map((item) => (item.id === id ? updatedPost : item));
    showMessage(formMessage, 'Изменения сохранены', 'success');
  }
  stopEditing(); 
}

function validatePost({ title, content }) {
  if (!title && !content) return 'Заполните заголовок и текст поста';
  if (!title) return 'Введите заголовок';
  if (!content) return 'Введите текст поста';
  return '';
}

function highlightEmptyFields({ title, content }) {
  titleInput.setAttribute('aria-invalid', String(!title));
  contentInput.setAttribute('aria-invalid', String(!content));
  (title ? contentInput : titleInput).focus();
}


async function removePost(id) {
  const post = posts.find((item) => item.id === id);
  if (!confirm(`Удалить пост «${post.title}»?`)) return;

  busyIds.add(id);
  render();
  try {
    await deletePost(id); 
    posts = posts.filter((item) => item.id !== id);
    if (editingId === id) stopEditing();
    showMessage(listMessage, '');
  } catch (error) {
    console.error(error);
    showMessage(listMessage, 'Не удалось удалить пост. Попробуйте ещё раз.', 'error');
  } finally {
    busyIds.delete(id);
    render();
  }
}


function startEditing(id) {
  const post = posts.find((item) => item.id === id);
  editingId = id;
  titleInput.value = post.title;
  contentInput.value = post.content;
  showMessage(formMessage, '');
  renderForm();
  render();
  titleInput.focus();
}

function stopEditing() {
  editingId = null;
  form.reset();
  titleInput.removeAttribute('aria-invalid');
  contentInput.removeAttribute('aria-invalid');
  renderForm();
  render();
}

function setSubmitting(value) {
  isSubmitting = value;
  renderForm();
}

function renderForm() {
  const isEditing = editingId !== null;
  formTitle.textContent = isEditing ? 'Редактирование поста' : 'Новый пост';
  form.classList.toggle('is-editing', isEditing);
  cancelButton.hidden = !isEditing;
  cancelButton.disabled = isSubmitting;
  submitButton.disabled = isSubmitting;

  if (isSubmitting) {
    submitButton.textContent = isEditing ? 'Сохраняем…' : 'Добавляем…';
  } else {
    submitButton.textContent = isEditing ? 'Сохранить' : 'Добавить пост';
  }
}


function render() {
  postCount.textContent = posts.length;
  renderPosts(postList, posts, { editingId, busyIds });
}

function handleListClick(event) {
  const button = event.target.closest('button[data-action]');
  if (!button) return;

  const id = button.closest('[data-id]').dataset.id;
  if (button.dataset.action === 'delete') removePost(id);
  if (button.dataset.action === 'edit') startEditing(id);
}
