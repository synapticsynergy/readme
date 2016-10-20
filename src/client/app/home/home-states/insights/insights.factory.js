(function() {
  'use strict';
  angular.module('app.home.insights').factory('Insights', Insights);
  Insights.$inject = ['store'];

  function Insights(store) {
    var services = {
      dataRefresh: dataRefresh
    };
    return services;

    function dataRefresh() {
      console.log('dataRefresh working');
      return store.get('currentCorrelationData');
    };
  }
})();