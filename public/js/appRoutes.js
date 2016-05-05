// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {


    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            access: {restricted: true},
            controller: 'MainController'
        })

        // nerds page that will use the NerdController
        .when('/collection', {
            templateUrl: 'views/collection.html',
            access: {restricted: true},
            controller: 'CollectionController'
        })
        
        .when('/login', {
            templateUrl: 'views/login.html',
            access: {restricted: false},
            controller: 'LoginController'
        })
        
        .when('/register', {
            templateUrl: 'views/register.html',
            access: {restricted: false},
            controller: 'LoginController'
        });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

}]);



/*angular.module('appRoutes', []).config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'views/home.html',
      controller: 'MainCtrl'
    });
    
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl'
    });

 $urlRouterProvider.otherwise('home');
}]);
*/