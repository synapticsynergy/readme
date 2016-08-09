(function() {
  'use strict';
  angular.module('app.home.insights', []).controller('InsightsController',
    InsightsController);

  function InsightsController($scope, homeFactory, $http) {
    /*jshint validthis: true */
    var insights = this;

    insights.correlationData = 'The data points of your life are not connected in any way. All aspects of your universe exist in separate, unreachable dimensions. Basically, there are no correlations.';

    insights.userActivities = homeFactory.userActivities;
    insights.userMetrics = homeFactory.userMetrics;

    insights.userActivitiesStub = ['run', 'rage', 'slide', 'skip', 'hop', 'hold', 'hodor'];

    insights.userMetricsStub = ['headache', 'angry', 'happy', 'sad', 'joyful'];

    insights.getCorrelations = function(selection) {
      return $http({
          method: "POST",
          url: '/user/correlation',
          datums: selection
        }).then(function success(resp){
          console.log("Posted!", resp)
        }, function error(resp){
          console.log("Error!", resp)
          alert('Sorry, there was an error adding your datums')
      })
    }

    insights.submitSelection = function(selection) {
      insights.getCorrelations(selection)
      .then(function(dataArr){
          console.log(dataArr);
          return dataArr;
      })
      .catch(function(err){
        console.log("There was getting your correlations friendo!", err);
      })
    }

  }
})();
