const {
  PORT = 3000,
  NODE_ENV,
  JWT_SECRET,
  DB_URL,
} = process.env;
const JWT_CHECK = (NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
const DATABASE_URL = (NODE_ENV === 'production' ? DB_URL : 'mongodb://localhost:27017/bitfilmsdb');

const allowedCors = [
  'http://diploma.prokhorov.nomoredomainsclub.ru',
  'https://diploma.prokhorov.nomoredomainsclub.ru',
  'localhost:3000',
];

module.exports = {
  allowedCors,
  PORT,
  DATABASE_URL,
  JWT_CHECK,
};
