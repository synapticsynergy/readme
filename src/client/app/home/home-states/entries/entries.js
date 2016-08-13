(function() {
  'use strict';
  angular.module('app.home.entries', []).controller('EntriesController',
    EntriesController);

  function EntriesController($http, homeFactory, store) {
    var entries = this;

    entries.activeField = "Activities";

    entries.showActivities = true;

    entries.changeField = function(){
      if(entries.activeField === "Activities"){
        entries.activeField = "Metrics"
        entries.showActivities = false;
      } else {
        entries.activeField = "Activities";
        entries.showActivities = true;
      }
    }

    entries.autoCompleteDisabled = false;

    entries.daysActivities = [];
    entries.daysMetrics = [];

    entries.userActivities = store.get('userData').userActivities;
    entries.userMetrics = store.get('userData').userMetrics;

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
      var datums = type === 'activity' ? entries.daysActivities : entries.daysMetrics;
      var profile = store.get('userData');
      var currentlySelectedDate = homeFactory.date;

      $http({
        method: "POST",
        url: url,
        data: {
          email: profile.email,
          datums: datums,
          date: currentlySelectedDate
        }
      }).then(function success(resp) {
        console.log("Posted!", resp)
        type === 'activity' ? entries.daysActivities = [] : entries.daysMetrics = [];
        homeFactory.getUserData();
      }).catch(function(err){
        console.log('There was an error adding your datums', err)
      })
    }

  }
})();
