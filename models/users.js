var mongoose = require('mongoose');
var crypto = require('crypto');
var passportLocalMongoose = require('passport-local-mongoose');
var Album = require('.././models/albums');

var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  albums: Array
});

UserSchema.plugin(passportLocalMongoose);

var userModel = mongoose.model('User', UserSchema);

module.exports = userModel;


function User(obj) {
    this.username = obj.username;
    this.password = obj.password;
}

User.prototype.addUser = function(fn){
    var that = this;
    console.log("THAT");
    console.log(that);
    var salt = crypto.randomBytes(128).toString('base64');
    console.log("amisviiksi91");
    // Hash and salt password and save it to db 
    crypto.pbkdf2(that.password, salt, 64000, 512, function(err, derivedKey) {
        if(err) throw err;
        var saltedPassword = salt + derivedKey.toString('base64');
        
        var user = new userModel({ username: that.username,
                                   password: saltedPassword
                                });
        console.log("TEIN HIENON UUDEN USERIN:");
        console.log(user);
        user.save(function(err, user){
            if(err) { fn(err); }
            console.log("HIENOSTI MENI KANTAAN TALLENTAMINEN");
            console.log(user);
            fn(null, user);
        });

    });
    console.log("hajooaamuihis");
};

User.getUser = function(username, fn) {
    console.log("jotain tapahtunee");
    console.log(username);
    userModel.findOne({username: username}, function(err, user) {
        console.log(user);
        if(err) { fn(err); }
        fn(null, user);
    });
};

User.getUsers = function(username, fn) {
    userModel.fetchAll(function(err, users){
        if(err) { fn(err); }
        fn(null, users);
    });
};

User.prototype.addAlbum = function(albumData, fn) {
        console.log("albumid:");
    console.log(albumData.albumId);
    //var newAlbum = new Album({

    // });
      
    // Add order to db
   // newAlbum.add(function(err, order){
   //     if(err) throw err;
    //});  
};