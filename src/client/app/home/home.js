(function () {
  'use strict';
  angular.module('app.home', ['app.home.entries', 'app.home.insights',
    'app.home.journal'
  ]).controller('HomeController', HomeController).factory('homeFactory',
    homeFactory);

  function HomeController () {
    // jshint validthis: true
    var home = this;
  }

  function homeFactory ($http, store) {
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
    return services;
  }
})();
