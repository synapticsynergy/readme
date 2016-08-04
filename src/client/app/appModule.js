(function() {
    'use strict';

    angular
        .module('app', [
            'ui.router', 
            'app.mainController'
            ])
        .config(config);

        // function config($stateProvider) {
        //     $stateProvider
        //         .state('home', {
        //             url: '/',
        //             templateUrl: 'app/home/home.tmpl.html',
        //             controller: 'MainController'
        //         })
        // }

})();
