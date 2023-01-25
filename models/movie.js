const mongoose = require('mongoose');
const { isURL } = require('validator');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: (v) => isURL(v),
      },
    },
    trailerLink: {
      type: String,
      required: true,
      validate: {
        validator: (v) => isURL(v),
      },
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator: (v) => isURL(v),
      },
    },
    owner: {
      type: String,
      required: true,
    },
    movieId: {
      type: String,
      required: true,
    },
    nameRU: {
      type: String,
      required: true,
    },
    nameEN: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('movie', movieSchema);
