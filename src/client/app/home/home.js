(function() {
  'use strict';
  angular.module('app.home', [
    'app.home.entries',
    'app.home.insights',
    'app.home.journal'
      ])
  .controller('HomeController', HomeController)
  .factory('homeFactory', homeFactory);

  function HomeController($scope) {
    /*jshint validthis: true */
    var home = this;
  }

 function homeFactory ($http, $q) {

   var services = {};

   services.insertData = function(params){
     return $http.post('/user', params);
   }

   services.getUserData = function(userIdOrEmail){
     return $http.get('/user/' + userIdOrEmail);
   }

   return services;
  }

})();
