(function () {
  'use strict';
  angular.module('app.home', ['app.home.entries', 'app.home.insights',
    'app.home.journal'
  ]).controller('HomeController', HomeController).factory('homeFactory',
    homeFactory);

  function HomeController ($scope, $mdSidenav, $window, $location, homeFactory) {
    // jshint validthis: true
    var home = this;

    home.openLeftMenu = function(){
      $mdSidenav('left').toggle();
    }
    home.userDate = "Not a date yet!";

    home.dateLogger = function(value){
      homeFactory.dateLogger(value);
    }

  }




  function homeFactory ($http, store, $mdSidenav) {

    var services = {};

    services.getUserData = function () {
      var profile = store.get('profile');
      return $http({
        method: 'POST',
        url: '/user',
        data: {
          email: profile.email,
          firstname: profile.given_name,
          lastname: profile.family_name
        }
      }).then(function (returnedData) {
        store.set('userData', returnedData.data);
      });
    };

    services.getDay = function (date) {
      var user = JSON.parse(window.localStorage.getItem('userData'));
      for (var x = 0; x < user.days.length; x++) {
        var day = user.days[x];
        if (day.date === date) {
          return day;
        }
      }
    };

    services.date = {};

    services.dateLogger = function(value){
      services.date = value;
      console.log(services.date);
    }



    return services;
  }
})();
