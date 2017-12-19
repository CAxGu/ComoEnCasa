var router = require('express').Router();
var mongoose = require('mongoose');
var locales = mongoose.model('locales');



// return list of all locals
router.get('/', function(req, res, next) {
  locales.find().then(function(loc){ 
    return res.json({locales: loc});
  }).catch(next);
});

 module.exports = router;