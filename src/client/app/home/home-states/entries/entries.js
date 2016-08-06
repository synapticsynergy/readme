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



    entries.userActivitiesStub = ['run', 'rage', 'slide', 'skip', 'hop', 'hold', 'hodor'];

    entries.userMetricsStub = ['headache', 'angry', 'happy', 'sad', 'joyful'];

    // entries.init = function () {
    //   getUserData(window.userEmail)
    //     .then(function(response){
    //       entries.userActivities = response.userActivities;
    //       entries.userMetrics = response.userMetrics;
    //     })
    // }

    entries.addItem = function(selection) {
      entries.daysActivities.push(selection);
      entries.activityForm.$setPristine();
    }

    entries.removeItem = function(index) {
      entries.daysActivities.splice(index, 1);
    }

    entries.postData = function(type) {

      var url = type === 'activity' ? '/user/activity' : '/user/metric';

      $http({
        method: "POST",
        url: url,
        activity: entries.daysActivities,
        day: entries.userDate
      }).then(function success(data){
        console.log("Posted!", data)
      }, function error(data){
        console.log("Error!", data)
      })
    }
  
  }
})();
