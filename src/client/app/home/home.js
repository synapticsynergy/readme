(function() {
  'use strict';
  angular.module('app.home', ['app.home.entries', 'app.home.insights', 'app.home.journal', 'app.home.about'])
  .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', '$mdSidenav', '$window', '$location', 'Home', 'Auth'];

  function HomeController($scope, $mdSidenav, $window, $location, Home, Auth) {
    // jshint validthis: true (prevents linting from throwing a warning)
    var home = this;
    
    //Sets the date in the Home factory
    home.dateSetter = function(value) {
      Home.dateSetter(value);
    }

    //Logout functionality
    home.logout = Auth.logout;

    //Opens and closes the sidenav menu
    home.openLeftMenu = function() {
      $mdSidenav('left')
        .toggle();
        console.log(Home.userLocation)
    }

    //Sets the user's current location in the Home factory; runs on page load
    navigator.geolocation.getCurrentPosition(function(position) {
      Home.locSetter(position);
    });

  }
})();
