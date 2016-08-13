(function () {
  'use strict';
  angular.module('app.home.about', [])
  .controller('AboutController', AboutController);

  AboutController.$inject = ['$scope'];

  function AboutController ($scope) {
    // jshint validthis: true
    var about = this;
  }
})();
