(function() {
  'use strict';
  angular.module('app.home', ['app.home.entries', 'app.home.insights', 'app.home.journal', 'app.home.about'])
  .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', '$mdSidenav', '$window', '$location', 'Home', 'Auth', '$rootScope'];

  function HomeController($scope, $mdSidenav, $window, $location, Home, Auth, $rootScope) {
    // jshint validthis: true (prevents linting from throwing a warning)
    var home = this;

    home.currentState = {};

    $rootScope.$on('$stateChangeSuccess', function(event, toState){
      home.currentState = toState;
    })

    home.displayDatePicker = function(){

      if (home.currentState.url === '/about' || home.currentState.url === '/insights'){
        return false;
      } else {
        return true;
      }
    }

    //Sets the date in the Home factory
    home.dateSetter = function(value) {
      Home.dateSetter(value);
      $location.path('home/entries');
    }

    //Logout functionality
    home.logout = Auth.logout;

    //Opens and closes the sidenav menu
    home.openLeftMenu = function() {
      $mdSidenav('left')
        .toggle();
    }

    //Sets the user's current location in the Home factory; runs on page load
    navigator.geolocation.getCurrentPosition(function(position) {
      Home.locSetter(position);
    });

  }
})();
