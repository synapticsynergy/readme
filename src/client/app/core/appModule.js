(function() {
  'use strict';
  angular
    .module('app', ['app.mainController', 'app.landingController', 'ui.router'])

    .config(function config($stateProvider) {
      $stateProvider
        .state('landing', {
          url: '/',
          templateUrl: 'app/landing/landing.tmpl.html',
          controller: 'LandingController'
        })

        .state('account', {
          url: '/account',
          templateUrl: 'app/account/account.tmpl.html',
          controller: 'AccountController'
        })

        .state('home', {
          url: '/home',
          templateUrl: 'app/home/home.tmpl.html',
          controller: 'HomeController'
        })        
  })

})();   

