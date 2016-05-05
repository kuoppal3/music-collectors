// public/js/services/CollectionService.js
angular.module('CollectionService', []).factory('Collection', ['$http', function($http) {

    return {
        // call to get all nerds
        get : function(username) {
            return $http.get('/api/users/' + username + '/collection');
        },


                // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new nerd
        create : function(username, collectionData) {
            return $http.post('/api/users/' + username + '/collection', collectionData);
        },

        // call to DELETE a nerd
        delete : function(username, collectionId) {
            return $http.delete('/api/users/' + username + '/collection/' + collectionId);
        }
    }       

}]);
