var mongoose = require('mongoose');

var AlbumSchema = new mongoose.Schema({
  _id: String,
  name: String,
  artist: String,
  isVinyl: Boolean,
  spotifyId: String,
  lastfmId: String,
});

var albumModel = mongoose.model('Album', AlbumSchema);

module.exports = albumModel;