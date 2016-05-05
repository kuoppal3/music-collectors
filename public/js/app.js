angular.module('musicCollectorsApp', ['ngRoute', 'appRoutes', 'MainCtrl','LoginCtrl','AccountCtrl', 'CollectionCtrl', 'CollectionService', 'UserService', 'AuthService', 'SpotifyService'])
.run(['$rootScope', '$location', '$route', 'Auth',
function($rootScope, $location, $route, Auth) {
  $rootScope.$on('$routeChangeStart',
    function (event, next, current) {
      Auth.getUserStatus(function() {
        if (next.access.restricted && !Auth.isLoggedIn()) {
           $location.path('/login');
           $rootScope.loggedInUser = null;
        } else {
          $rootScope.loggedInUser = Auth.getCurrentUser();
        }
      });

  });
}]);
