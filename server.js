var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');

var users = require('./controllers/users');

var app = express();

// RECOVERING MONGODB
/*sudo rm /data/db/mongod.lock
sudo mongod --dbpath /data/db --repair
sudo mongod --dbpath /data/db */

app.set('port', process.env.PORT);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var session = require('express-session');

// required for passport session
app.use(session({
  secret: 'secrettexthere',
}));

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
var User = require('./models/users');

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
//User.passportSerializeUser;
//User.passportDeserializeUser;
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Database connection
var mongoose = require("mongoose");

// Cloud9 local db
mongoose.connect('mongodb://' + process.env.IP + '/data');

// routes
app.get('/api/users', users.getUsers);
app.post('/api/users', function(req, res) {
  User.register(new User({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
           res.redirect('/');
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

app.get('/api/users/:username', users.getUser);
app.put('/api/users/:username', users.editUser);
app.delete('/api/users/:username', users.deleteUser);

app.post('/api/users/:username/collection', users.addAlbum);
app.delete('/api/users/:username/collection/:id', users.deleteAlbum);

app.post('/api/login', users.login);

app.get('api/logout', function(req, res) {
  req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});

app.get('/status', users.isAuthenticated);

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


module.exports = app;
