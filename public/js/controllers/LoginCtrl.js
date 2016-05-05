

angular.module('LoginCtrl', []).controller('LoginController', [
'$scope', '$location', 'User', 'Auth',
function($scope, $location, User, Auth){
  $scope.registerUser = function(){
    User.create(
      {"username": $scope.user,"password": $scope.password}, function(data) {

    });
  };
  
  $scope.loginUser = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call login from service
      Auth.login($scope.user, $scope.password)
        // handle success
        .then(function () {
          $location.path('/');
          $scope.disabled = false;
          $scope.loginForm = {};
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;
          $scope.loginForm = {};
        });

  };
}]);