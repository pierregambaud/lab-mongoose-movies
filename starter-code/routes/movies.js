const express = require('express');
const router  = express.Router();
const Movie = require('../models/movie');

router.get('/', function(req,res,next){
  Movie.find()
  .then(function(movies){
    res.render('/movies/index', {
      movies: movies
    })
  })
  .catch(err => next(err));
})

router.get('/new', function(req,res,next){
  res.render('movies/new')
})

router.post('/new', function(req,res,next){
  const title = req.body.title;
  const genre = req.body.genre;
  const plot = req.body.plot;
  const cast = req.body.cast;

  Movie.create({
    title: title,
    genre: genre,
    plot: plot,
    cast: cast
  }).then(
    res.redirect('/movies')
  )
})
//Iteration 10  render du cast? 
router.get('/:id', function(req,res,next){
  Movie.findById(req.params.id)
  .populate('cast')
  .then(function(celebrity){
    res.render('movies/show',{
      movie:movie
    })

  })
  .catch(err => next(err));
})
//Iteration 11
router.post('/:id/delete', function(req,res,next) {
  Movie.findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect('/movies')
    }).catch(err => next(err));
})
//Iteration 12
router.get('/:id/edit', function(req,res,next){
  Movie.findById(req.params.id).then (function(movie){ 
    res.render('movies/edit',{
      movie:movie
    }).catch(err=>next(err)); 
  })
})
  router.post('/:id/edit', function(req,res,next){
    Movie.update({_id:req.query.movie_id},{$set:{
      title:req.body.title,
      genre:req.body.genre,
      plot:req.body.plot,
      cast:req.body.cast,   
    }}).then (function(){
    res.redirect(`/movies/${req.query.movie_id}`)
    }).catch(err=>next(err))
  })