const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const InvalidTokenError = require('../errors/InvalidTokenError');
const NonuniqueError = require('../errors/NonuniqueError');
const UnfindError = require('../errors/UnfindError');
const ValidationError = require('../errors/ValidationError');
const User = require('../models/user');
const { JWT_CHECK } = require('../utils/config');
const {
  NONUNIQUE_ERROR_MESSAGE,
  VALIDATION_ERROR_MESSAGE,
  INVALID_TOKEN_ERROR_MESSAGE,
  UNFIND_ERROR_MESSAGE,
  TOKEN_CREATE_MESSAGE,
  ESCAPE_MESSAGE,
} = require('../utils/constans');

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create(
      { email, password: hash, name },
    ))
    .then((user) => res.send({
      email: user.email, name: user.name,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new NonuniqueError(NONUNIQUE_ERROR_MESSAGE));
      } else if (err.name === 'ValidationError') {
        next(new ValidationError(VALIDATION_ERROR_MESSAGE));
      } else {
        next(err);
      }
    });
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new InvalidTokenError(INVALID_TOKEN_ERROR_MESSAGE);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new InvalidTokenError(INVALID_TOKEN_ERROR_MESSAGE);
          }

          const token = jwt.sign({ _id: user.id }, JWT_CHECK, { expiresIn: '7d' });
          return res.cookie('jwt', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
            sameSite: 'none',
            secure: true,
          }).send(TOKEN_CREATE_MESSAGE);
        });
    })
    .catch(next);
};

const signOutUser = (req, res) => {
  res.clearCookie('jwt', { sameSite: 'none', secure: true }).send(ESCAPE_MESSAGE);
};

const getMyInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new UnfindError(UNFIND_ERROR_MESSAGE);
    })
    .then((user) => res.send(user))
    .catch(next);
};

const changeMyInfo = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail(() => {
      throw new UnfindError(UNFIND_ERROR_MESSAGE);
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.code === 11000) {
        next(new NonuniqueError(NONUNIQUE_ERROR_MESSAGE));
      } else if (err.name === 'ValidationError') {
        next(new ValidationError(VALIDATION_ERROR_MESSAGE));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMyInfo,
  changeMyInfo,
  createUser,
  loginUser,
  signOutUser,
};
