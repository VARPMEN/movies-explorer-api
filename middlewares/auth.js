const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const InvalidTokenError = require('../errors/InvalidTokenError');
const { INVALID_TOKEN_ERROR_MESSAGE } = require('../utils/constans');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new InvalidTokenError(INVALID_TOKEN_ERROR_MESSAGE);
  }

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch (err) {
    throw new InvalidTokenError(INVALID_TOKEN_ERROR_MESSAGE);
  }

  req.user = payload;

  next();
};
