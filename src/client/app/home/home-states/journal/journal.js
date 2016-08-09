(function() {
  'use strict';
  angular.module('app.home.journal', [])
  .controller('JournalController', JournalController)
  .factory('Journal', Journal);

  function JournalController($scope, Journal) {
    /*jshint validthis: true */
    var journal = this;
    journal.dailyMemo = '';
    journal.message = '';
    journal.bounceTimeout = null;

    journal.onChange = function () {
      journal.message = 'edited...';
      clearTimeout(journal.bounceTimeout);
      journal.bounceTimeout = setTimeout(function () {
        journal.save();
        journal.message = 'saved!';
      }, 2000);
    };

    journal.save = function () {
      var day = new Date();
      day = day.toString();
      Journal.saveJournal(journal.dailyMemo, day);
    }
  }

  function Journal ($http) {
    var services = {};

    services.saveJournal = function (text, day) {
      return $http({
        method: 'POST',
        url: '/user/journal',
        data: {
          entry: text,
          date: day.toString()
        }
      });
    };

    return services;
  }
})();
