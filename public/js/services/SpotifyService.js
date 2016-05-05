// public/js/services/SpotifyService.js
angular.module('SpotifyService', []).factory('Spotify', ['$http', function($http) {

    return {
        searchAlbum : function(searchTerm, responseHandler) {
            return $http.get('https://api.spotify.com/v1/search?q=' + searchTerm + '&type=album').success(function (data) {
                responseHandler(data);
              })
              // handle error
              .error(function (data) {
                responseHandler(data);
              });
        },
        
        getAlbums : function(albums, responseHandler) {
            var albumString = albums.toString();

            console.log("lkhaoo");
            console.log(albumString);
            return $http.get('https://api.spotify.com/v1/albums?ids=' + albumString).success(function(data) {
                responseHandler(data);
            })
            .error(function(data) {
                responseHandler(data);
            });
        }
    };    
}]);
