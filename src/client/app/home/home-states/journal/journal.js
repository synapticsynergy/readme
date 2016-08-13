(function () {
  'use strict';
  angular.module('app.home.journal', [])
  .controller('JournalController', JournalController)
  .factory('Journal', Journal);

  function JournalController ($scope, Journal, homeFactory) {
    // jshint validthis: true
    var journal = this;

    journal.message = '';

    journal.entry = "Enter your thoughts for today...";

    journal.saveJournal = Journal.saveJournal;


    // journal.date = (new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())).toString();
    // journal.day = homeFactory.getDay(journal.date);
    // if (journal.day !== undefined) {
    //   journal.dailyMemo = journal.day.journalEntry;
    // }
    // journal.bounceTimeout = null;

    // journal.onChange = function () {
    //   journal.message = 'edited...';
    //   clearTimeout(journal.bounceTimeout);
    //   journal.bounceTimeout = setTimeout(function () {
    //     journal.save();
    //     journal.message = 'saved!';
    //   }, 2000);
    // };

    // journal.save = function () {
    //   // there must be a better way to do the following
    //   var day = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    //   day = day.toString();
    //   Journal.saveJournal(journal.dailyMemo, day);
    // };
  }

  function Journal ($http, store, homeFactory) {
    var services = {};

    services.saveJournal = function () {
      var profile = store.get('userData');
      var currentlySelectedDate = homeFactory.date;
      return $http({
        method: 'POST',
        url: '/user/journal',
        data: {
          entry: this.entry,
          email: profile.email,
          date: currentlySelectedDate
        }
      }).then(function(data){
        console.log(data);
      });
    };

    return services;
  }
})();
