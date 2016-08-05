(function() {
  'use strict';
  angular.module('app.landing', []).controller('LandingController',
    LandingController);

  function LandingController($scope, auth) {
    /*jshint validthis: true */
    var landing = this;
    $scope.auth = auth;

    $scope.logout = function() {
      auth.signout();
      store.remove('profile');
      store.remove('token');
      $location.path('/landing.tmpl.html');
      console.log('Logging Out');
    };
  }
})();
