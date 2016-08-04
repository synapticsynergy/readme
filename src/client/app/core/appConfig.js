(function() {
  'use strict';
  angular.module('app.config', []).config(config);

  function config($stateProvider) {
    $stateProvider.state('home', {
      url: '/',
      templateUrl: 'app/home/home.tmpl.html',
      controller: 'HomeController'
    })
  }
})();