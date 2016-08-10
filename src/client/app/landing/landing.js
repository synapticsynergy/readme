(function () {
  'use strict';
  angular.module('app.landing', []).controller('LandingController',
    LandingController);

  function LandingController ($location, auth) {
    // jshint validthis: true
    var landing = this;
    landing.auth = auth;

    landing.logout = function () {
      auth.signout();
      window.localStorage.removeItem('profile');
      window.localStorage.removeItem('token');
      $location.path('/landing.tmpl.html');
    };
  }
})();
