(function() {
  'use strict';
  angular.module('app.home.entries', [])
    .controller('EntriesController', EntriesController);

  EntriesController.$inject = ['$http', 'Home', 'store', 'Entries'];

  function EntriesController($http, Home, store, Entries) {
    // jshint validthis: true
    var entries = this;

    entries.activeField = "Activities"; //prune

    entries.autoCompleteDisabled = false;

    entries.daysActivities = [];
    entries.daysMetrics = [];

    entries.recentAct = ['hops', 'skips', 'jumps', 'google', 'computer', 'play music', 'read book','flip', 'roger', 'go for a walk', 'dog walk', 'wirte with pen', 'play bass', 'read novel'];
    entries.recentMet = ['happy', 'sad', 'headache', 'car crash', 'creative', 'artisitic', 'sick'];

    entries.showActivities = function(){
      if (entries.daysActivities.length > 0 || entries.daysMetrics.length > 0){
        return true;
      }
    };

    entries.userActivities = store.get('userData').userActivities;
    entries.userMetrics = store.get('userData').userMetrics;

    entries.postBoth = function(){
      entries.postData('/user/activity', entries.daysActivities)
        .then(function(){
          entries.postData('/user/metric', entries.daysMetrics);
        }).then(function(){
          console.log('Posteddddddd')
        });
    }


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
      if (type === 'activity') {
        entries.daysActivities.splice(index, 1);
      } else {
        entries.daysMetrics.splice(index, 1);
      }
    }

    entries.addItemSideOptions = function(index, type) {
      if (type === 'activity') {
        var item = entries.recentAct.splice(index, 1);
        entries.daysActivities.push(item[0]);
      } else {
        var item = entries.recentMet.splice(index, 1);
        entries.daysMetrics.push(item[0]);
      }
    }

    entries.postData = function(url, datums) {
      var url = url;
      var datums = datums;
      var profile = store.get('userData');
      var currentlySelectedDate = Home.date;
      var userLocation = Home.userLocation;

      return $http({
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
        entries.daysActivities = [];
        entries.daysMetrics = [];
        Home.getUserData();
      })
      .catch(function(err) {
        console.log('There was an error adding your datums', err)
      })
    }
  }
})();
