(function() {
    'use strict';

    angular
        .module('app', ['ui.router'])
        .config(config);

        function config($stateProvider) {
            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'app/home/home.tmpl.html',
                    controller: 'MainController'
                })
        }

})();
