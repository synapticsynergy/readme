(function() {
  'use strict';
  angular.module('app.config', ['app.landingController']).config(config);

  function config($stateProvider) {
    $stateProvider.state('landing', {
      url: '/',
      templateUrl: 'app/landing/landing.tmpl.html',
      controller: 'LandingController'
    })
  }
})();