(function() {
  'use strict';
  angular
    .module('app', ['app.landing', 'app.home', 'ui.router'])

    .config(function config($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('landing', {
          url: '/',
          templateUrl: 'app/landing/landing.tmpl.html',
          controller: 'LandingController',
          controllerAs: 'landing'
        })

        .state('home', {
          url: '/home',
          templateUrl: 'app/home/home.tmpl.html',
          controller: 'HomeController',
          controllerAs: 'home'
        })

      $urlRouterProvider.otherwise('/');         
  })

})();     

