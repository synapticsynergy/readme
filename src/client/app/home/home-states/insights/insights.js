(function() {
  'use strict';
  angular.module('app.home.insights', []).controller('InsightsController',
    InsightsController);

  function InsightsController($scope, homeFactory) {
    /*jshint validthis: true */
    var insights = this;

    insights.userActivities = homeFactory.userActivities;
    insights.userMetrics = homeFactory.userMetrics;

    insights.logIt = function(){
      console.log(insights.userActivities);
      console.log(insights.userMetrics);      
    }
  }
})();
