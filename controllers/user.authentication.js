// Authentication for users
var User = require('../models/users');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var crypto = require('crypto');

// Login
exports.passportUseLocal = passport.use(new LocalStrategy(
  {
    // Name-field from HTML
    usernameField: 'username',
    passwordField: 'password'
  },
  function(username, password, done) {
    User.findUser(username, function(err, user) {
      if(err) { throw err; }

      if(user === null) {
        return done(null, false);
      }
      
      var salt = user.password.substring(0, 172);
      var unsaltedPassword = user.password.substring(172, user.password.length);

      crypto.pbkdf2(password, salt, 64000, 512, function(err, derivedKey) {
        if(err) throw err;
        if(derivedKey.toString('base64') === unsaltedPassword) {
          return done(null, username);
        } else {
          return done(null, false);
        }
      });
    });
  }
));

// Serialize to session variable
exports.passportSerializeUser = passport.serializeUser(function(user, done) {
  done(null, user);
});

// Deserialize from session variable
exports.passportDeserializeUser = passport.deserializeUser(function(user, done) {
  done(null, user);
});

exports.logout = function(req, res) {
  req.session.destroy(function (err) {
    if(err) { throw err; }
    res.redirect('/');
  });
};