var router = require('express').Router();
var mongoose = require('mongoose');
var categorias = mongoose.model('categorias');

// return list of local categories
router.get('/', function(req, res, next) {
    categorias.find().then(function(cat){ 
    return res.json({categorias: cat});
  }).catch(next);
});

 module.exports = router;