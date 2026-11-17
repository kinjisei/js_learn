/**
 * Ошибка, текст которой можно показать пользователю.
 * Например: «Больше нет на складе» или «Нет соединения с сервером».
 */
export class AppError extends Error {
  constructor(message, options) {
    super(message, options);
    this.name = 'AppError';
  }
}

/** Ошибка при запросе к серверу. status = 0, если ответа не было вовсе. */
export class ApiError extends AppError {
  constructor(message, { status = 0, cause } = {}) {
    super(message, { cause });
    this.name = 'ApiError';
    this.status = status;
  }
}

/**
 * Превращает любую ошибку в понятный пользователю текст.
 * Свои ошибки (AppError) показываем как есть. Чужие (TypeError из-за бага и т.п.)
 * пишем в консоль для разработчика, а пользователю показываем общий текст.
 */
export function getErrorMessage(error) {
  if (error instanceof AppError) {
    return error.message;
  }
  console.error(error);
  return 'Что-то пошло не так. Обновите страницу и попробуйте ещё раз.';
}
