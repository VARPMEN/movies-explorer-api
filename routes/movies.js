const router = require('express').Router();
const { getMovies, createMovie, removeMovie } = require('../controllers/movies');
const { createMovieValidation, idValidation } = require('../middlewares/validation');

router.get('/movies', getMovies);
router.post('/movies', createMovieValidation, createMovie);
router.delete('/movies/:_id', idValidation, removeMovie);

module.exports = router;
