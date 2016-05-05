angular.module('AuthService', []).factory('Auth',
  ['$q', '$timeout', '$http',
  function ($q, $timeout, $http) {

    // create user variable
    var userStatus = null;
    var loggedUser = null;
    var loggedUsername = null;

    // return available functions for use in the controllers
    return ({
      isLoggedIn: isLoggedIn,
      getUserStatus: getUserStatus,
      login: login,
      logout: logout,
      register: register,
      getCurrentUser: getCurrentUser,
      getCurrentUsername: getCurrentUsername
    });
    
    function getCurrentUser() {
      return loggedUser;
    }
    
    function getCurrentUsername() {
      return loggedUsername;
    }
    
    function isLoggedIn() {
      if(userStatus) {
        return true;
      } else {
        return false;
      }
    }
    
    function getUserStatus(responseHandler) {
     // return userStatus;
     $http.get('/status')
      // handle success
      .success(function (data) {
        console.log("STATUS");
        console.log(data.status);
        console.log("USERNMAE");
        console.log(data.user);
        if(data.status){
          userStatus = true;
          loggedUsername = data.user.username;
          loggedUser = data.user;
        } else {
          userStatus = false;
          loggedUsername = null;
          loggedUser = null;
        }
        responseHandler();
      })
      // handle error
      
      .error(function (data) {
        console.log("FAIL");
        userStatus = false;
        loggedUsername = null;
        loggedUser = null;
        responseHandler();
      });
    }


    function login(username, password) {
    
      // create a new instance of deferred
      var deferred = $q.defer();
    
      // send a post request to the server
      $http.post('api/login',
        {username: username, password: password})
        // handle success
        .success(function (data, status) {
          if(status === 200 && data.status){
            userStatus = true;
            loggedUsername = username;
            deferred.resolve();
          } else {
            userStatus = false;
            loggedUsername = null;
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          userStatus = false;
         loggedUsername = null;
          deferred.reject();
        });
    
      // return promise object
      return deferred.promise;
    
    }
    
    function logout() {
    
      // create a new instance of deferred
      var deferred = $q.defer();
    
      // send a get request to the server
      $http.get('api/logout')
        // handle success
        .success(function (data) {
          userStatus = false;
          loggedUsername = null;
          deferred.resolve();
        })
        // handle error
        .error(function (data) {
          userStatus = false;
         loggedUsername = null;
          deferred.reject();
        });
    
      // return promise object
      return deferred.promise;
    
    }
    
    function register(username, password) {
    
      // create a new instance of deferred
      var deferred = $q.defer();
    
      // send a post request to the server
      $http.post('/users',
        {username: username, password: password})
        // handle success
        .success(function (data, status) {
          if(status === 200 && data.status){
            deferred.resolve();
          } else {
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          deferred.reject();
        });
    
      // return promise object
      return deferred.promise;
    
    }

}]);

