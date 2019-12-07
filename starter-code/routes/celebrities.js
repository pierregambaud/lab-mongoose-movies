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
module.exports = router;