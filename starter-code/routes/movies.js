const express = require(`express`);
const router = express.Router();
const Movie = require(`../models/movie`);
const Celebrity = require(`../models/celebrity`);

router.get(`/new`, function(req,res,next) {
  Celebrity.find()
  .then(function(celebrities) {
    res.render(`movies/new`, {
      celebrities: celebrities
    })
  })
  .catch(err => next(err))
})

router.post(`/`, function(req,res,next) {
  const { title, genre, plot, cast } = req.body;

  Movie.create({
    title,
    genre,
    plot,
    cast
  })
  .then(
    res.redirect(`/movies`)
  )
  .catch(err => next(err))
})

router.get(`/`, function(req, res, next) {
  Movie.find()
  .then(function(movies) {
    res.render(`movies/index`, {
      movies
    })
  })
  .catch(err => next(err))
})

router.get(`/:id`, function(req,res,next) {
  Movie.findById(req.params.id)
  .populate(`cast`)
  .then(function(movie) {
    res.render(`movies/show`, {
      movie
    })
  })
  .catch(err => next(err))
})

module.exports = router;