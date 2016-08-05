(function() {
  'use strict';
  var app = angular
    .module('app', ['app.landing', 'app.home', 'ui.router', 'auth0', 'angular-storage', 'angular-jwt', 'ngRoute']);

    app.config(['$routeProvider', 'authProvider', '$httpProvider', '$locationProvider', 'jwtInterceptorProvider',
      function myAppConfig ($routeProvider, authProvider, $httpProvider, $locationProvider, jwtInterceptorProvider) {

        authProvider.init({
            domain: 'synapticsynergy.auth0.com',
            clientID: 'kg0sT6tTpDoBwb2A1WllySYiarHLz8HV',
            loginState: 'landing'
        })

        //Called when login is successful
        authProvider.on('loginSuccess', ['$location', 'profilePromise', 'idToken', 'store',
          function($location, profilePromise, idToken, store) {

            console.log("Login Success");
            profilePromise.then(function(profile) {
              store.set('profile', profile);
              store.set('token', idToken);
            });

            $location.path('/home');
        }]);

        //Called when login fails
        authProvider.on('loginFailure', function() {
          alert("Error");
        });

        //Remove this when testing
        //Angular HTTP Interceptor function
        // jwtInterceptorProvider.tokenGetter = ['store', function(store) {
        //     return store.get('token');
        // }];
        // //Push interceptor function to $httpProvider's interceptors
        // $httpProvider.interceptors.push('jwtInterceptor');

    }]);

    app.config(function config($stateProvider, $urlRouterProvider) {

       // Configure routes for your application
      // $routeProvider
      //   .when( '/home', {
      //     controller: 'HomeController',
      //     templateUrl: 'app/home/home.tmpl.html',
      //     requiresLogin: true
      //   })

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
          controllerAs: 'home',
          data: { requiresLogin: true }
        })

      $urlRouterProvider.otherwise('/');
  })
    .run(['auth', function(auth) {
  // This hooks all auth events to check everything as soon as the app starts
      auth.hookEvents();
    }]);





})();



