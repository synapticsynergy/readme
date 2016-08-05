(function() {
  'use strict';
  angular.module('app.home', [
    'app.home.entries',
    'app.home.insights',
    'app.home.journal'
      ])
  .controller('HomeController', HomeController);

  function HomeController($scope) {
    /*jshint validthis: true */
    var home = this;
  }

  .factory('homeFactory', homeFactory);

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
