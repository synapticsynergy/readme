(function() {
  'use strict';
  angular.module('app.home.insights', []).controller('InsightsController',
    InsightsController);

  function InsightsController($scope, Home, $http, store, Insights, $rootScope) {
    /*jshint validthis: true */
    var insights = this;

    insights.switch = false;

    insights.showSVG = false;

    insights.userMetrics = store.get('userData').userMetrics;

    insights.currentCorrelationData = [{'Null': 'null'}];
    // insights.$watch( ,Insights)
    insights.latestCorrData = store.get('currentCorrelationData')

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
      insights.metricDisplay = selection.charAt(0).toUpperCase() + selection.slice(1);
      insights.getCorrelations(selection)
      .then(function(dataArr){
        console.log('This is the correl data', dataArr)
          store.set('currentCorrelationData', dataArr);
          insights.currentCorrelationData = dataArr;
          $rootScope.$broadcast('newData', { data:dataArr });
          insights.displayData = dataArr;
          insights.displayData = insights.displayData.map(function(obj) {
            console.log(Object.keys(obj));
            var key = Object.keys(obj)[0];
            obj[key] = ~~(obj[key] * 100);
            return obj;
          }).sort(function(a,b) {
              var keyA = Object.keys(a)[0];
              var keyB = Object.keys(b)[0];
              return Math.abs(b[keyB]) - Math.abs(a[keyA]);
          });
      })
      .catch(function(err){
        console.log('There was an error getting your correlations', err);
      })
      insights.showSVG = true;
    }

  }
})();
