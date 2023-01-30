const { PORT = 3000, NODE_ENV, JWT_SECRET } = process.env;
const DATABASE_URL = 'mongodb://localhost:27017/bitfilmsdb';
const JWT_CHECK = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

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
