(function() {
  'use strict';
  angular.module('app.home', [
    'app.home.entries',
    'app.home.insights',
    'app.home.journal'
      ])
  .controller('HomeController',
    HomeController);

  function HomeController($scope) {
    /*jshint validthis: true */
    var home = this;
  }
})();
