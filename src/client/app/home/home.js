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

 function homeFactory ($http) {

   var services = {};

   services.insertData = function(params){
     return $http.post('/user', params);
   }

   services.getUserData = function(){
     var name = JSON.parse(window.localStorage.profile).split(' ');
     return $http.post({
        method: "POST",
        url: '/user',
        email: JSON.parse(window.localStorage.profile).email,
        firstname: name[0],
        firstname: name[1]
      });
    }

    services.userActivities = window.localStorage.userActivities;

    services.userMetrics = window.localStorage.userActivities;

   return services;
  }

})();
