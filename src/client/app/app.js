(function() {
  'use strict';
  var app = angular
    .module('app', [
      'app.landing',
      'app.home',
      'ui.router',
      'auth0',
      'angular-storage',
      'angular-jwt',
      'ngRoute',
      'ngMaterial'
      ]);

    app.config(['$routeProvider', 'authProvider', '$httpProvider', '$locationProvider', 'jwtInterceptorProvider',
      function myAppConfig ($routeProvider, authProvider, $httpProvider, $locationProvider, jwtInterceptorProvider) {

        authProvider.init({
            domain: 'synapticsynergy.auth0.com',
            clientID: 'kg0sT6tTpDoBwb2A1WllySYiarHLz8HV',
            loginState: 'landing'
        })

        //Called when login is successful
        authProvider.on('loginSuccess', ['$location', 'profilePromise', 'idToken', 'store', '$http',
          function($location, profilePromise, idToken, store, $http) {

            console.log("Login Success");
            profilePromise
              .then(function(profile) {
                store.set('profile', profile);
                store.set('token', idToken);
              })
              .then(function(){
                     var profile = JSON.parse(window.localStorage.profile);
                     var name = profile.name.split(' ');
                      return $http({
                        method: "POST",
                        url: '/user',
                        email: profile.email,
                        firstname: name[0],
                        lastname: name[1]
                      });
              })
              .then(function(userData){
                console.log(userData)
                window.localStorage.setItem('userData', JSON.stringify(userData));
              });

            $location.path('/home');
        }]);

        //Called when login fails
        authProvider.on('loginFailure', function() {
          alert("Error");
        });

        //Remove this when testing
        //Angular HTTP Interceptor function
        jwtInterceptorProvider.tokenGetter = ['store', function(store) {
            return store.get('token');
        }];
        //Push interceptor function to $httpProvider's interceptors
        $httpProvider.interceptors.push('jwtInterceptor');

    }]);

    app.config(function config($stateProvider, $urlRouterProvider) {

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
          // data: { requiresLogin: true }
        })
        .state('home.entries', {
          url: '/entries',
          templateUrl: 'app/home/home-states/entries/entries.tmpl.html',
          controller: 'EntriesController',
          controllerAs: 'entries'

          // data: { requiresLogin: true }
        })
        .state('home.journal', {
          url: '/journal',
          templateUrl: 'app/home/home-states/journal/journal.tmpl.html',
          controller: 'JournalController',
          controllerAs: 'journal'

          // data: { requiresLogin: true }
        })
        .state('home.insights', {
          url: '/insights',
          templateUrl: 'app/home/home-states/insights/insights.tmpl.html',
          controller: 'InsightsController',
          controllerAs: 'insights'

          // data: { requiresLogin: true }
        })

      $urlRouterProvider.otherwise('/');
  })
    .run(['auth', function(auth) {
  // This hooks all auth events to check everything as soon as the app starts
      auth.hookEvents();
    }]);

  app.run(['$rootScope', 'auth', 'store', 'jwtHelper', '$location',
    function($rootScope, auth, store, jwtHelper, $location) {
      $rootScope.$on('$locationChangeStart', function() {
        var token = store.get('token');
        if (token) {
          if (!jwtHelper.isTokenExpired(token)) {
            if (!auth.isAuthenticated) {
              //Re-authenticate user if token is valid
              auth.authenticate(store.get('profile'), token);
            }
          } else {
            // Either show the login page or use the refresh token to get a new idToken
            $location.path('/');
          }
        }
      });
  }]);

})();
