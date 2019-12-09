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

router.post(`/`, (req,res,next) => {
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


router.get(`/new`, (req,res,next) => {
  Celebrity.find()
  .then(celebrities => {
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


router.post(`/:id`, (req,res,next) => {
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


router.get(`/:id/edit`, (req,res,next) => {
  Movie.findById(req.params.id)
  .populate(`cast`)
  .then(movie => {
    Celebrity.find()
    .then(celebrities => {
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

// SOLUTION (better alternative)
// -----
// router.get(/:id/edit, (req,res,next) => {
//   Movie.findById(req.params.id)
//   .populate(cast)
//   .then(movie => {
//     Celebrity.find()
//     .then(celebrities => {
//       res.render(`movies/edit`, {
//         movie,
//         celebrities: celebrities.map(celebrity => ({
//           id: celebrity.id,
//           name: celebrity.name,
//           isInMovie: movie.cast.includes(celebrity.id)
//         }))
//       })
//     })
//     .catch(err => next(err))
//   })
//   .catch(err => next(err))
// })


// #### ##    ## ########  ######## ##     ## 
//  ##  ###   ## ##     ## ##        ##   ##  
//  ##  ####  ## ##     ## ##         ## ##   
//  ##  ## ## ## ##     ## ######      ###    
//  ##  ##  #### ##     ## ##         ## ##   
//  ##  ##   ### ##     ## ##        ##   ##  
// #### ##    ## ########  ######## ##     ## 


router.get(`/`, (req, res, next) => {
  Movie.find()
  .then(movies => {
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


router.get(`/:id`, (req,res,next) => {
  Movie.findById(req.params.id)
  .populate(`cast`)
  .then(movie =>  {
    res.render(`movies/show`, {
      movie
    })
  })
  .catch(err => next(err))
})


// ########  ######## ##       ######## ######## ######## 
// ##     ## ##       ##       ##          ##    ##       
// ##     ## ##       ##       ##          ##    ##       
// ##     ## ######   ##       ######      ##    ######   
// ##     ## ##       ##       ##          ##    ##       
// ##     ## ##       ##       ##          ##    ##       
// ########  ######## ######## ########    ##    ######## 


router.post(`/:id/delete`, (req,res,next) => {
  Movie.findByIdAndDelete(req.params.id)
  .then(
    res.redirect(`/movies`)
  )
  .catch(err => next(err))
})


module.exports = router;