(function() {
  'use strict';
  angular.module('app.home.entries', []).controller('EntriesController',
    EntriesController);

  function EntriesController($http, $scope, homeFactory) {
  
    var entries = this;

    entries.userDate;

    entries.autoCompleteDisabled = true;

    entries.changeAutoComplete = function() {
      entries.userDate ? entries.autoCompleteDisabled = false : entries.autoCompleteDisabled = true;
    }

    entries.daysActivities = [];

    entries.daysMetrics = [];

    entries.userActivities = window.localStorage.userActivities;

    entries.userMetrics = window.localStorage.userActivities;

    entries.userActivitiesStub = ['run', 'rage', 'slide', 'skip', 'hop', 'hold', 'hodor'];

    entries.userMetricsStub = ['headache', 'angry', 'happy', 'sad', 'joyful'];

    // entries.init = function () {
    //   getUserData(window.userEmail)
    //     .then(function(response){
    //       entries.userActivities = response.userActivities;
    //       entries.userMetrics = response.userMetrics;
    //     })
    // }

    entries.addItem = function(selection, type) {
      if (type === 'activity') {
        entries.daysActivities.push(selection);
        entries.activityForm.$setPristine();
      } else {
        entries.daysMetrics.push(selection);
        entries.metricForm.$setPristine();
      }
      console.log('activities', entries.daysActivities);
      console.log('metrics', entries.daysMetrics);
    }

    entries.removeItem = function(index, type) {
      if (type === 'activity') {
        entries.daysActivities.splice(index, 1);
      } else {
        entries.daysMetrics.splice(index, 1);
      }
    }

    entries.postData = function(type) {

      var url = type === 'activity' ? '/user/activity' : '/user/metric';
      var datums = type === 'activity' ? entries.daysActivities : entries.daysMetrics;

      $http({
          method: "POST",
          url: url,
          datums: datums,
          day: entries.userDate
        }).then(function success(data){
          console.log("Posted!", data)
        }, function error(data){
          console.log("Error!", data)
      })

    }
  }

})();
