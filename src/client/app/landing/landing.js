(function() {
  'use strict';
  angular.module('app.landing', []).controller('LandingController',
    LandingController);

  function LandingController($scope, auth) {
    /*jshint validthis: true */
    var landing = this;
    $scope.auth = auth;
  }
})();
