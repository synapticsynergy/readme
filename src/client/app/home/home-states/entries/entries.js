(function() {
  'use strict';
  angular.module('app.home.entries', []).controller('EntriesController',
    EntriesController);

  function EntriesController($http, $scope, homeFactory, store) {
    var entries = this;

    entries.userDate;

    entries.autoCompleteDisabled = true;

    entries.changeAutoComplete = function() {
      entries.userDate ? entries.autoCompleteDisabled = false : entries.autoCompleteDisabled =
        true;
    }

    entries.daysActivities = [];
    entries.daysMetrics = [];

    entries.userActivities = store.get('profile').userActivities;
    entries.userMetrics = store.get('profile').userMetrics;

    entries.userActivitiesStub = ['run', 'rage', 'slide', 'skip', 'hop','hold', 'hodor'];
    entries.userMetricsStub = ['headache', 'angry', 'happy', 'sad','joyful'];

    entries.addItem = function(selection, type) {
      if (type === 'activity') {
        entries.daysActivities.push(selection);
        entries.searchTextAct = null;
        entries.activityForm.$setPristine();
      } else {
        entries.daysMetrics.push(selection);
        entries.searchTextMet = null;
        entries.metricForm.$setPristine();
      }
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
      var datums = type === 'activity' ? entries.daysActivities : entries
        .daysMetrics;
      $http({
        method: "POST",
        url: url,
        data: {
          email: window.localStorage.userData.email,
          firstname: store.get('profile').given_name,
          lastname: store.get('profile').family_name,
          datums: datums,
          date: entries.userDate
        }
      }).then(function success(resp) {
        console.log("Posted!", resp)
        type === 'activity' ? entries.daysActivities = [] : entries.daysMetrics = [];
        homeFactory.getUserData();
      }, function error(resp) {
        console.log("Error!", resp)
        alert('Sorry, there was an error adding your datums')
      })
    }

  }
})();
