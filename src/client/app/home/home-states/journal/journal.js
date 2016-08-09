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
    }

    journal.save = function () {
      Journal.saveJournal(journal.dailyMemo, new Date().getDate().toString());
    }
  }

  function Journal ($http) {
    var services = {};

    services.saveJournal = function (text, day) {
      return $http.post({
        url: '/user/journal',
        entry: text,
        day: day.toString()
      });
    }

    return services;
  }
})();
