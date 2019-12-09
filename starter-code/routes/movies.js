const express = require(`express`);
const router = express.Router();
const Movie = require(`../models/movie`);
const Celebrity = require(`../models/celebrity`);


// ##    ## ######## ##      ## 
// ###   ## ##       ##  ##  ## 
// ####  ## ##       ##  ##  ## 
// ## ## ## ######   ##  ##  ## 
// ##  #### ##       ##  ##  ## 
// ##   ### ##       ##  ##  ## 
// ##    ## ########  ###  ###                               

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


router.get(`/new`, function(req,res,next) {
  Celebrity.find()
  .then(function(celebrities) {
    res.render(`movies/new`, {
      celebrities: celebrities
    })
  })
  .catch(err => next(err))
})


// ######## ########  #### ######## 
// ##       ##     ##  ##     ##    
// ##       ##     ##  ##     ##    
// ######   ##     ##  ##     ##    
// ##       ##     ##  ##     ##    
// ##       ##     ##  ##     ##    
// ######## ########  ####    ##    


router.post(`/:id`, function(req,res,next) {
  const { title, genre, plot, cast } = req.body;

  Movie.findByIdAndUpdate(req.params.id, {
    $set: {
      title,
      genre,
      plot,
      cast
    }
  })
  .then(
    res.redirect(`/movies/${req.params.id}`)
  )
  .catch(err => next(err))
})


router.get(`/:id/edit`, function(req,res,next) {
  Movie.findById(req.params.id)
  .populate(`cast`)
  .then(function(movie) {
    Celebrity.find()
    .then(function(celebrities) {
      const castIds = movie.cast.map(castCelebrity => castCelebrity.id);

      celebrities.map((celebrity) => {
        if(castIds.includes(celebrity.id)) {
          celebrity.isInMovie = true;
          console.log(celebrity)
          console.log(celebrity.isInMovie)
        } else {
          celebrity.isInMovie = false;
        }
      })

      console.log(celebrities)
      res.render(`movies/edit`, { movie, celebrities })
    })
    .catch(err => next(err))
  })
  .catch(err => next(err))
})


// #### ##    ## ########  ######## ##     ## 
//  ##  ###   ## ##     ## ##        ##   ##  
//  ##  ####  ## ##     ## ##         ## ##   
//  ##  ## ## ## ##     ## ######      ###    
//  ##  ##  #### ##     ## ##         ## ##   
//  ##  ##   ### ##     ## ##        ##   ##  
// #### ##    ## ########  ######## ##     ## 


router.get(`/`, function(req, res, next) {
  Movie.find()
  .then(function(movies) {
    res.render(`movies/index`, {
      movies
    })
  })
  .catch(err => next(err))
})


// ######  ##     ##  #######  ##      ## 
// ##    ## ##     ## ##     ## ##  ##  ## 
// ##       ##     ## ##     ## ##  ##  ## 
//  ######  ######### ##     ## ##  ##  ## 
//       ## ##     ## ##     ## ##  ##  ## 
// ##    ## ##     ## ##     ## ##  ##  ## 
//  ######  ##     ##  #######   ###  ###  


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


// ######## ########  #### ######## 
// ##       ##     ##  ##     ##    
// ##       ##     ##  ##     ##    
// ######   ##     ##  ##     ##    
// ##       ##     ##  ##     ##    
// ##       ##     ##  ##     ##    
// ######## ########  ####    ##    


router.post(`/:id/delete`, function(req,res,next) {
  Movie.findByIdAndDelete(req.params.id)
  .then(
    res.redirect(`/movies`)
  )
  .catch(err => next(err))
})


module.exports = router;