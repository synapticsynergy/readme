(function() {
  'use strict';
  angular.module('app.home.entries', []).controller('EntriesController',
    EntriesController);

  function EntriesController($scope, homeFactory) {
    /*jshint validthis: true */
    var entries = this;

    entries.userDate;

    entries.autoCompleteDisabled = true;

    entries.changeAuto = function() {
      entries.userDate ? entries.autoCompleteDisabled = false : entries.autoCompleteDisabled = true;
    }

    entries.userActivitiesStub = ['run', 'rage', 'slide', 'skip', 'hop', 'hold', 'hodor'];

    entries.init = function () {
      getUserData(window.userEmail)
        .then(function(response){
          entries.userActivities = response.userActivities;
          entries.userMetrics = response.userMetrics;
        })
    }
  }
})();
