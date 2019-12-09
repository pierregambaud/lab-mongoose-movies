const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/celebrity');


// #### ##    ## ########  ######## ##     ## 
//  ##  ###   ## ##     ## ##        ##   ##  
//  ##  ####  ## ##     ## ##         ## ##   
//  ##  ## ## ## ##     ## ######      ###    
//  ##  ##  #### ##     ## ##         ## ##   
//  ##  ##   ### ##     ## ##        ##   ##  
// #### ##    ## ########  ######## ##     ## 


router.get('/', (req,res,next) => {
  Celebrity.find()
  .then(celebrities => {
    res.render('celebrities/index', {
      celebrities
    })
  })
  .catch(err => next(err));
})


// ##    ## ######## ##      ## 
// ###   ## ##       ##  ##  ## 
// ####  ## ##       ##  ##  ## 
// ## ## ## ######   ##  ##  ## 
// ##  #### ##       ##  ##  ## 
// ##   ### ##       ##  ##  ## 
// ##    ## ########  ###  ###    


router.get('/new', (req,res,next) => {
  res.render('celebrities/new')
})

router.post('/new', (req,res,next) => {
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.create({
    name,
    occupation,
    catchPhrase
  }).then(
    res.redirect('/celebrities')
  )
})


// ######  ##     ##  #######  ##      ## 
// ##    ## ##     ## ##     ## ##  ##  ## 
// ##       ##     ## ##     ## ##  ##  ## 
//  ######  ######### ##     ## ##  ##  ## 
//       ## ##     ## ##     ## ##  ##  ## 
// ##    ## ##     ## ##     ## ##  ##  ## 
//  ######  ##     ##  #######   ###  ###  


router.get('/:id', (req,res,next) => {
  Celebrity.findById(req.params.id)
  .then(celebrity => {
    res.render('celebrities/show', {
      celebrity
    })
  })
  .catch(err => next(err));
})


// ######## ########  #### ######## 
// ##       ##     ##  ##     ##    
// ##       ##     ##  ##     ##    
// ######   ##     ##  ##     ##    
// ##       ##     ##  ##     ##    
// ##       ##     ##  ##     ##    
// ######## ########  ####    ##    


router.get('/:id/edit', (req,res,next) => {
  Celebrity.findById(req.params.id)
  .then(celebrity => {
    res.render('celebrities/edit', {
      celebrity
    })
  })
  .catch(err => next(err));
})

router.post('/:id', (req,res,next) => {
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.findByIdAndUpdate(req.params.id, {
    $set: {
      name,
      occupation,
      catchPhrase
    }
  }, { new: true })
  .then(
    res.redirect(`/celebrities/${req.params.id}`)
  )
  .catch(err => next(err));
})


// ########  ######## ##       ######## ######## ######## 
// ##     ## ##       ##       ##          ##    ##       
// ##     ## ##       ##       ##          ##    ##       
// ##     ## ######   ##       ######      ##    ######   
// ##     ## ##       ##       ##          ##    ##       
// ##     ## ##       ##       ##          ##    ##       
// ########  ######## ######## ########    ##    ######## 


router.post('/:id/delete', (req,res,next) => {
  Celebrity.findByIdAndRemove(req.params.id)
  .then(
    res.redirect(`/celebrities`)
  )
  .catch(err => next(err));
})

module.exports = router;