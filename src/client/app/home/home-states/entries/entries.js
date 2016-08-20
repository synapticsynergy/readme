(function() {
  'use strict';
  angular.module('app.home.entries', [])
    .controller('EntriesController', EntriesController);

  EntriesController.$inject = ['$http', 'Home', 'store', 'Entries'];

  function EntriesController($http, Home, store, Entries) {
    // jshint validthis: true
    var entries = this;

    entries.activeField = "Activities";

    entries.autoCompleteDisabled = false;

    entries.daysActivities = [];
    entries.daysMetrics = [];

    entries.showActivities = function(){
      if (entries.daysActivities.length > 0){
        return true;
      }
    };

    entries.userActivities = store.get('userData').userActivities;
    entries.userMetrics = store.get('userData').userMetrics;


    entries.changeField = function() {
      if (entries.activeField === "Activities") {
        entries.activeField = "Metrics"
        entries.showActivities = false;
      } else {
        entries.activeField = "Activities";
        entries.showActivities = true;
      }
    }

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
      if (entries.activeField === 'Activities') {
        entries.daysActivities.splice(index, 1);
      } else {
        entries.daysMetrics.splice(index, 1);
      }
    }

    entries.postData = function(type) {
      var url = entries.activeField === 'Activities' ? '/user/activity' : '/user/metric';
      var datums = entries.activeField === 'Activities' ? entries.daysActivities : entries.daysMetrics;
      var profile = store.get('userData');
      var currentlySelectedDate = Home.date;
      var userLocation = Home.userLocation;

      $http({
        method: "POST",
        url: url,
        data: {
          email: profile.email,
          datums: datums,
          date: currentlySelectedDate,
          location: userLocation
        }
      })
      .then(function(resp) {
        console.log("Post Success! " + entries.activeField, resp)
        entries.activeField === 'Activities' ? entries.daysActivities = [] : entries.daysMetrics = [];
        Home.getUserData();
      })
      .catch(function(err) {
        console.log('There was an error adding your datums', err)
      })
    }
  }
})();
