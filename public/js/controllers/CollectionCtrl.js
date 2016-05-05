// public/js/controllers/CollectionCtrl.js
angular.module('CollectionCtrl', []).controller('CollectionController', [
    '$rootScope', '$scope', 'User', 'Spotify', function($rootScope, $scope, User, Spotify) {

    Spotify.getAlbums($rootScope.loggedInUser.albums, function(data) {
       $scope.spotifyAlbums = data.albums;
    });
    
    $scope.removeAlbum = function(albumId) {
              console.log("ABLUMB IND");
      console.log(albumId);  
        User.removeAlbum($rootScope.loggedInUser.username, {'albumId': albumId, 'username': $rootScope.loggedInUser.username});

    };

}]);