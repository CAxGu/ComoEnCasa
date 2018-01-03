var router = require('express').Router();
var mongoose = require('mongoose');
var auth = require('../auth');
var locales = mongoose.model('locales');



// return list of all locals
router.get('/', function(req, res, next) {
  locales.find().then(function(loc){ 
    return res.json({locales: loc});
  }).catch(next);
});

//return the local
router.get('/local/:id', auth.optional, function(req, res, next) {
  Promise.all([
    locales.find({_id: req.params.id})
  ]).then(function(results){
    var user = results[0];
    return res.json({local: (user[0])});
  }).catch(next);
});

 module.exports = router;