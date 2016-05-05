var passport = require('passport');
var User = require('../models/users');


exports.getUsers = function(req, res, next) {
  res.json('moi');
};

exports.getUser = function(req, res) {
    var username = req.params.username;

    User.findOne({username: username}, function(err, user) {
        console.log(user);
        if(err) {            
            return res.status(500).json({
                err: err
            });
        }
        return res.status(200).json({ user: user });
    });
};

exports.addUser = function(req, res) {
    var user = req.body;

    var newUser = new User({
        username: user.username,
        password: user.password
    });

    // Add user to db
    newUser.addUser(function(err){
        if(err) { 
            return res.status(500).json({
                err: err
            });
        }
            
        passport.authenticate('local')(req, res, function () {
            return res.status(200).json({
                status: 'Registration successful!'
            });
        });
    });

};

exports.deleteUser = function(req, res) {
    var user = req.body;
    User.delete(user.username, function(err) {
        if(err) { 
            res.status(500);
            throw err; 
        }
        
        res.status(200).send('User ' + user.username + ' deleted successfully');
    });
};

exports.editUser = function(req, res) {
    
};

exports.login = function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
    console.log("USEr");
    console.log(user);
    console.log(info);
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.login(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
      res.status(200).json({
        status: 'Login successful!'
      });
    });
  })(req, res, next);
};

exports.isAuthenticated = function(req, res, next) {
  console.log("ISAUTHETNICATED");
  console.log(req.isAuthenticated());
  if (!req.isAuthenticated()) {
    return res.status(200).json({
      status: false,
      user: null
    });
  }
  res.status(200).json({
    status: true,
    user: req.user
  });
};

exports.addAlbum = function(req, res) {

  var username = req.body.username;

  User.findOne({username: username}, function(err, user) {
        console.log(user);
        if(err) {            
            return res.status(500).json({
                err: err
            });
        }
        
        user.albums.push(req.body.albumId);
        user.save(function(err) {
          if(err) {
            return res.status(500).json({err: err});
          }
          return res.status(200).json({ 'status': 'Successfully added album' });
        });
   
    });

};

exports.editAlbum = function(req, res) {
    
};

exports.deleteAlbum = function(req, res) {
  var username = req.params.username;
  var reqAlbumId = req.params.id;

  User.findOne({username: username}, function(err, user) {
        console.log(user);
        if(err) {            
            return res.status(500).json({
                err: err
            });
        }
        
        for(var i = 0; i < user.albums.length; ++i) {
          if(user.albums[i] === reqAlbumId) {
            user.albums.splice(i, 1);
            --i;
          }
        }

        user.save(function(err) {
          if(err) {
            return res.status(500).json({err: err});
          }
          return res.status(200).json({ 'status': 'Successfully added album' });
        });
   
    });
};


// Serialize to session  variable
/*exports.passportSerializeUser = passport.serializeUser(function(user, done) {
  done(null, user);
});

// Deserialize from session variable
exports.passportDeserializeUser = passport.deserializeUser(function(user, done) {
  done(null, user);
});*/