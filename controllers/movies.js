const ForbiddenError = require('../errors/ForbiddenError');
const UnfindError = require('../errors/UnfindError');
const ValidationError = require('../errors/ValidationError');
const Movie = require('../models/movie');
const { VALIDATION_ERROR_MESSAGE, UNFIND_ERROR_MESSAGE, FORBIDDEN_ERROR_MESSAGE } = require('../utils/constans');

const getMovies = (req, res) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch((err) => res.send({ message: err }));
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: req.user._id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(`${VALIDATION_ERROR_MESSAGE} / ${err}`));
      } else {
        next(err);
      }
    });
};

const removeMovie = (req, res, next) => {
  const userId = req.user._id;

  Movie.findById(req.params._id)
    .orFail(() => {
      throw new UnfindError(UNFIND_ERROR_MESSAGE);
    })
    .then((movie) => {
      if (movie.owner.toString() === userId) {
        Movie.findByIdAndRemove(req.params._id)
          .then((deleteMovie) => res.send(deleteMovie))
          .catch(next);
      } else {
        throw new ForbiddenError(FORBIDDEN_ERROR_MESSAGE);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError(VALIDATION_ERROR_MESSAGE));
      } else {
        next(err);
      }
    });
};

module.exports = { getMovies, createMovie, removeMovie };
