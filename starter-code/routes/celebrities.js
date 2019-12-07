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

router.get('/:id', function(req,res,next){
  Celebrity.findById(req.params.id)
  .then(function(celebrity){
    res.render('celebrities/show',{
      celebrity:celebrity
    })

  })
  .catch(err => next(err));
})


module.exports = router;