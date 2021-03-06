// public/js/services/UserService.js
angular.module('UserService', []).factory('User', ['$http', function($http) {

    return {
        // call to get all users
        get : function() {
            return $http.get('/api/users');
        },
        
        get : function(username) {
            return $http.get('/api/users/' + username);
        },

        // call to POST and create a new user
        create : function(userData) {
            return $http.post('/api/users', userData);
        },
        
        addAlbum : function(userName, albumData) {
            return $http.post('/api/users/' + userName + '/collection', albumData);
        },
        
        removeAlbum : function(userName, albumData) {
            return $http.delete('/api/users/' + userName + '/collection/' +  albumData.albumId);
        },
        
        
        update : function(userName, userData) {
            return $http.put('/api/users/' + userName, userData);
        },

        // call to DELETE a user
        delete : function(username) {
            return $http.delete('/api/users/' + username);
        },
        
        login : function(userData) {
            return $http.post('/api/login/', userData);
        }
    }       

}]);
 