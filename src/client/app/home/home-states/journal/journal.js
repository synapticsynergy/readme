(function () {
  'use strict';
  angular.module('app.home.journal', [])
  .controller('JournalController', JournalController)
  .factory('Journal', Journal);

  function JournalController ($scope, Journal, homeFactory) {
    // jshint validthis: true
    var journal = this;
    journal.message = '';
    journal.date = (new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())).toString();
    journal.day = homeFactory.getDay(journal.date);
    journal.dailyMemo = journal.day.journalEntry;
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
      // there must be a better way to do the following
      var day = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
      day = day.toString();
      Journal.saveJournal(journal.dailyMemo, day);
    };
  }

  function Journal ($http) {
    var services = {};

    services.saveJournal = function (text, day) {
      return $http({
        method: 'POST',
        url: '/user/journal',
        data: {
          entry: text,
          email: JSON.parse(window.localStorage.getItem('userData')).email,
          date: day.toString()
        }
      });
    };

    return services;
  }
})();
