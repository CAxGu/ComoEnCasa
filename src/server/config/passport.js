var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]'
}, function(email, password, done) {
  User.findOne({email: email}).then(function(user){
    if(!user || !user.validPassword(password)){
      return done(null, false, {errors: {'email or password': 'is invalid'}});
    }

    return done(null, user);
  }).catch(done);
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
      User.findOne({email: user.email}).then(function(user,err){
        return done(err,user);
      });
});

passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_KEY,
  consumerSecret: process.env.TWITTER_SECRET,
  callbackURL: process.env.TWITTER_CALLBACK,
  passReqToCallback: true
}, function(req, token, tokenSecret, profile, done) {

  User.findOne({ email: profile.id }).then(function(user){
    if(user){
      console.log('Ya estas registrado '+ profile.id);
      return done(null, user);
    }else{
      let usert = new User();
      usert.username = profile.username;
      usert.email    = profile.id;
      usert.image    = profile._json.profile_image_url

      usert.save().then(function(){
        return done(null, usert)
      }).catch(done);
    }
  }).catch(done);
}));//TwitterStrategy end

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_ID,
  clientSecret: process.env.FACEBOOK_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK,
  profileFields: ['id', 'displayName', 'name', 'email', 'link', 'locale', 'photos'],
  //passReqToCallback: true
}, function(req, accessToken, refreshToken, profile, done) {
  User.findOne({ email: profile.id }).then(function(user){
    if(user){
      console.log('Ya estas registrado '+ profile.id);
      return done(null, user);
    }else{
      let usert = new User();
      usert.username = profile.name.givenName + profile.name.familyName;
      usert.email    = profile.id;
      usert.image    = profile.photos[0].value;

      usert.save().then(function(){
        return done(null, usert)
      }).catch(done);
    }
  }).catch(done);
}));//FacebookStrategy end
