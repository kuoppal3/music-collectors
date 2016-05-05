// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', []).controller('MainController',[
    '$rootScope', '$scope', 'Auth','Spotify','User', function($rootScope, $scope, Auth, Spotify, User) {
    $scope.search = function() {
        Spotify.searchAlbum($scope.searchTerm, function(data) {
             $scope.spotifyAlbums = data.albums.items;
        });
    };

    $scope.addAlbum = function(albumId) {
        User.addAlbum($rootScope.loggedInUser.username, {'albumId': albumId, 'username': $rootScope.loggedInUser.username});
    };

}]);