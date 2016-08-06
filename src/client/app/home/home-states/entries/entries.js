(function() {
  'use strict';
  angular.module('app.home.entries', []).controller('EntriesController',
    EntriesController);

  function EntriesController($scope, $timeout, $q, $log, homeFactory) {
    /*jshint validthis: true */
    var entries = this;

    //Date Picker Variable
    entries.userDate;

    entries.autoCompleteDisabled = true;

    entries.daysActivities = [];

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

    entries.addItem = function(selection) {
      entries.daysActivities.push(selection);
      entries.activityForm.$setPristine();
    }

    entries.removeItem = function(index) {
      entries.daysActivities.splice(index, 1);
    }


  //end of Entries Controller  
  }
})();
