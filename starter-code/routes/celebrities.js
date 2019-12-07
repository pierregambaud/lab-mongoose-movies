const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/celebrity');

router.get('/', function(req,res,next){
  Celebrity.find()
  .then(function(celebrities){
    res.render('celebrities/index', {
      celebrities: celebrities
    })
  })
  .catch(err => next(err));
})

router.get('/new', function(req,res,next){
  res.render('celebrities/new')
})

router.post('/new', function(req,res,next){
  const name = req.body.name;
  const occupation = req.body.occupation;
  const catchPhrase = req.body.catchPhrase;

  Celebrity.create({
    name:name,
    occupation:occupation,
    catchPhrase:catchPhrase
  }).then(
    res.redirect('/celebrities')
  )
})

router.get('/:id', function(req,res,next){
  Celebrity.findById(req.params.id)
  .then(function(celebrity){
    res.render('celebrities/show',{
      celebrity:celebrity
    })

  })
  .catch(err => next(err));
})

router.post('/:id/delete', function(req,res,next) {
  Celebrity.findByIdAndRemove(req.params.id)
    .then(() => {
      console.log('check');
      res.redirect('/celebrities')
    })
    .catch(err => next(err));
})

module.exports = router;