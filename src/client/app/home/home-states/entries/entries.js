(function() {
  'use strict';
  angular.module('app.home.entries', []).controller('EntriesController',
    EntriesController);

  function EntriesController($scope, homeFactory) {
    /*jshint validthis: true */
    var entries = this;

    entries.init = function () {
      getUserData(window.userEmail)
        .then(function(response){
          entries.userActivities = response.userActivities;
          entries.userMetrics = response.userMetrics;
        })
    }
  }
})();
