(function() {
  'use strict';
  angular.module('app.home', ['app.home.entries', 'app.home.insights', 'app.home.journal'])
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', '$mdSidenav', '$window', '$location', 'Home', 'Auth'];

  function HomeController($scope, $mdSidenav, $window, $location, Home, Auth) {
    // jshint validthis: true
    var home = this;

    //Opens and closes the sidenav menu
    home.openLeftMenu = function() {
      $mdSidenav('left')
        .toggle();
    }
    //Sets the date in the Home factory
    home.dateSetter = function(value) {
      Home.dateSetter(value);
    }

    home.logout = Auth.logout;
  }
})();
