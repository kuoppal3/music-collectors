angular.module('AccountCtrl', []).controller('AccountController',
  ['$scope', '$location', 'Auth',
  function ($scope, $location, Auth) {

    $scope.logout = function () {

      // call logout from service
      Auth.logout()
        .then(function () {
          $location.path('/login');
        });

    };

}]);