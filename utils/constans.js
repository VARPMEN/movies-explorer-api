const { PORT = 3000 } = process.env;
const DATABASE_URL = 'mongodb://localhost:27017/bitfilmsdb';

const VALIDATION_ERROR = 400;
const VALIDATION_ERROR_MESSAGE = 'Введены некорректные данные.';

const INVALID_TOKEN_ERROR = 401;
const INVALID_TOKEN_ERROR_MESSAGE = 'Передан неверный логин или пароль.';

const FORBIDDEN_ERROR = 403;
const FORBIDDEN_ERROR_MESSAGE = 'Недостаточно прав!';

const UNFIND_ERROR = 404;
const UNFIND_ERROR_MESSAGE = 'Данные не найдены.';

const NONUNIQUE_ERROR = 409;
const NONUNIQUE_ERROR_MESSAGE = 'Email уже используется.';

const SERVER_ERROR = 500;
const SERVER_ERROR_MESSAGE = 'Ошибка сервера.';

module.exports = {
  PORT,
  DATABASE_URL,
  VALIDATION_ERROR,
  VALIDATION_ERROR_MESSAGE,
  INVALID_TOKEN_ERROR,
  INVALID_TOKEN_ERROR_MESSAGE,
  FORBIDDEN_ERROR,
  FORBIDDEN_ERROR_MESSAGE,
  UNFIND_ERROR,
  UNFIND_ERROR_MESSAGE,
  NONUNIQUE_ERROR,
  NONUNIQUE_ERROR_MESSAGE,
  SERVER_ERROR,
  SERVER_ERROR_MESSAGE,
};
