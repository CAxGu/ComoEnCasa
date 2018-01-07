var mongoose = require('mongoose');
var router = require('express').Router();
var passport = require('passport');
var User = mongoose.model('User');
var auth = require('../auth');

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_TOKEN ,
    pass: process.env.PASS_MAILTOKEN
  }
});

router.get('/user', auth.required, function(req, res, next){
  User.findById(req.payload.id).then(function(user){
    if(!user){ return res.sendStatus(401); }

    return res.json({user: user.toAuthJSON()});
  }).catch(next);
});

router.get('/users/active/:token', function(req, res, next) {

  User.findOne({salt:req.params.token}).then(function(user){
    if(!user){ return res.sendStatus(401); }
    
    if(typeof user.activo !== 'undefined'){
      user.activo=1;
    }
    user.save();
    return res.json({user: user.toAuthJSON()});
  }).catch(next);
});



router.put('/user', auth.required, function(req, res, next){
  User.findById(req.payload.id).then(function(user){
    if(!user){ return res.sendStatus(401); }

    // only update fields that were actually passed...
    if(typeof req.body.user.username !== 'undefined'){
      user.username = req.body.user.username;
    }
    if(typeof req.body.user.email !== 'undefined'){
      user.email = req.body.user.email;
    }
    if(typeof req.body.user.bio !== 'undefined'){
      user.bio = req.body.user.bio;
    }
    if(typeof req.body.user.image !== 'undefined'){
      user.image = req.body.user.image;
    }
    if(typeof req.body.user.password !== 'undefined'){
      user.setPassword(req.body.user.password);
    }

    return user.save().then(function(){
      return res.json({user: user.toAuthJSON()});
    });
  }).catch(next);
});

router.post('/users/login', function(req, res, next){
  if(!req.body.user.email){
    return res.status(422).json({errors: {email: "can't be blank"}});
  }

  if(!req.body.user.password){
    return res.status(422).json({errors: {password: "can't be blank"}});
  }

  passport.authenticate('local', {session: false}, function(err, user, info){
    if(err){ return next(err); }

    if(user){
      if(user.activo==1){
        user.token = user.generateJWT();
        return res.json({user: user.toAuthJSON()});
      }else{
        return res.status(422).json({errors: {activate: "check your imbox email to activate the account"}});
      }
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
});

router.post('/users', function(req, res, next){
  var user = new User();

  user.username = req.body.user.username;
  user.email = req.body.user.email;
  user.setPassword(req.body.user.password);
  user.activo = 0;

  user.save().then(function(){
    return res.json({user: user.toAuthJSON()});
  }).catch(next);

  transporter.sendMail(mailOptions = {
    from: process.env.MAIL_TOKEN ,
    to: user.email,
    subject: 'Activacion de cuenta ComoEnCasa',
    html: '<h1>¡Bienvenid@ a ComoEnCasa!</h1><p>Pincha en link siguiente para activar tu cuenta!: <br>http://localhost:4000/#!/active/'+user.salt+'</p>'
  }
  , function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });


});


router.post('/users/recover', function(req, res, next){

  User.findOne({email:req.body.user.email}).then(function(user){
    if(!user){ return res.sendStatus(401);}

    let tokenpassword= user.tokenrecoverpassword();

    user.recuperapwd = tokenpassword;
    user.save().then(
      transporter.sendMail(mailOptions = {
          from: process.env.MAIL_TOKEN ,
          to: user.email,
          subject: 'Recuperar contraseña',
          html: '<h1>Recuperar contraseña de ComoEnCasa</h1><p>Hemos recibido una petición para cambiar tu contraseña. Si no has solicitado el cambio ignora completamente este correo, sino, dale link al siguiente enlace para restablecerla: <br> http://localhost:4000/#!/newpass/'+user.recuperapwd+'</p>'
        }
        , function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        })
    );
  
    return res.json({user: user.toAuthJSON()});
  }).catch(next);
});


router.post('/users/newpass', function(req, res, next){

  User.findOne({recuperapwd:req.body.user.respwd}).then(function(user){
    if(!user){ return res.sendStatus(401);}

    if(typeof req.body.user.password !== 'undefined'){
      user.setPassword(req.body.user.password);
      user.recuperapwd = user.tokenrecoverpassword();
    }
    user.save();

  return res.json({user: user.toAuthJSON()});
  }).catch(next);
});

//mala praxis
router.post('/users/social', function(req, res, next){
  let memorystore = req.sessionStore;
  let sessions = memorystore.sessions;
  let sessionUser;
  for(var key in sessions){
    sessionUser = (JSON.parse(sessions[key]).passport.user);
  }
  console.log('--------------------------------------------------------------------');
  console.log(sessionUser);
  console.log('--------------------------------------------------------------------');
    var user = new User();
    user._id = sessionUser._id;
    user.image = sessionUser.image;
    user.email = sessionUser.email;
    user.username = sessionUser.username;
    user.followig = sessionUser.followig;
    user.favorites = sessionUser.favorites;

    if(user){
      user.token = user.generateJWT();
      return res.json({user: user.toAuthJSON()});
    } else {
      return res.status(422).json('fail');
    }
})

//twitter
router.get('/twitter', passport.authenticate('twitter'));

router.get('/twitter/callback',  passport.authenticate('twitter', { successRedirect: 'http://localhost:4000/#!/social', failureRedirect: 'http://localhost:4000/#!/login'}));



module.exports = router;
