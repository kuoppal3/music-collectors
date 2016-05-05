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

//var app = angular.module('musicCollectors', ['ui.router', 'ngResource', 'appRoutes']);



/*app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    });
    
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: '/login.html',
      controller: 'LoginCtrl'
    });

 $urlRouterProvider.otherwise('home');
}]);



app.factory('posts', [function(){
  var o = {
    posts: []
  };
  return o;
}]);

app.controller('MainCtrl', [
'$scope',
'posts',
  function($scope, posts){
    
    $scope.posts = posts.posts;
  $scope.addPost = function(){
    $scope.posts.push({title: $scope.title, upvotes: 0});
    $scope.title = '';
  };
}]);


app.factory("User", function($resource) {
  return $resource("/users/", {}, {
      query: {method:'GET', isArray:false},
      post: {method:'POST'},
      update: {method:'PUT'},
      remove: {method:'DELETE'}
  });
});

// http://stackoverflow.com/questions/24551680/angular-ng-resource-post-sending-query-params-not-json
app.controller('LoginCtrl', [
'$scope', 'User',
function($scope, User){
  $scope.registerUser = function(){
    console.log(User);
    console.log("ADSADS");
    console.log($scope.user);
    console.log($scope.password);
    User.post(
      {"username": $scope.user,"password": $scope.password}, function(data) {
      console.log("USERS:");
      console.log(data.users);
    });
  };
}]);


*/