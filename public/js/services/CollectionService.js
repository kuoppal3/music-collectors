// public/js/services/CollectionService.js
angular.module('CollectionService', []).factory('Collection', ['$http', function($http) {

    return {
        // call to get collections
        get : function(username) {
            return $http.get('/api/users/' + username + '/collection');
        },

        // call to POST and create collection
        create : function(username, collectionData) {
            return $http.post('/api/users/' + username + '/collection', collectionData);
        },

        // call to DELETE a collection
        delete : function(username, collectionId) {
            return $http.delete('/api/users/' + username + '/collection/' + collectionId);
        }
    }       

}]);
