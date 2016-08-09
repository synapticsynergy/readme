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

    insights.currentCorrelationData = [{'run': 0.01}, {'walk': -1}, {'headache': 0.90},{'eat': -0.20},{'sleep': 0.00},{'ascend': 1}];

    insights.getCorrelations = function(selection) {
      console.log("getCorrelations selection", selection)
      return $http({
          method: "POST",
          url: '/user/correlation',
          body: {
            datums: selection
          }
          
        }).then(function success(resp){
          console.log("Posted!", resp)
        }, function error(resp){
          console.log("Error!", resp)
          alert('Sorry, there was an error adding your datums')
      })
    }

    insights.submitSelection = function(selection) {
      console.log("submitSelection selection", selection)
      insights.getCorrelations(selection)
      .then(function(dataArr){
          return dataArr;
      })
      .catch(function(err){
        console.log("There was an error getting your correlations friendo!", err);
      })
    }

  }
})();
