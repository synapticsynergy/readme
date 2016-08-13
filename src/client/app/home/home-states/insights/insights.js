(function() {
  'use strict';
  angular.module('app.home.insights', []).controller('InsightsController',
    InsightsController);

  function InsightsController($scope, homeFactory, $http, store) {
    /*jshint validthis: true */
    var insights = this;

    insights.userMetrics = store.get('userData').userMetrics;

    insights.currentCorrelationData = [{'Null': 'null'}];

    insights.getCorrelations = function(selection) {
      var profile = store.get('userData');
      return $http({
          method: "POST",
          url: '/user/correlation',
          data: {
            email: profile.email,
            datums: selection
          }
        }).then(function success(resp){
          console.table(resp.data);
          return resp.data;
        }, function error(resp){
          console.log("Error!", resp)
          alert('Sorry, there was an error adding your datums')
      })
    }

    insights.submitSelection = function(selection) {
      insights.getCorrelations(selection)
      .then(function(dataArr){
        console.log('This is the correl data', dataArr)
          store.set('currentCorrelationData', dataArr);
          insights.currentCorrelationData = dataArr;
      })
      .catch(function(err){
        console.log('There was an error getting your correlations', err);
      })
    }

  }
})();
