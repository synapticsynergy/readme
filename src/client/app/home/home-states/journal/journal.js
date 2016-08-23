(function () {
  'use strict';
  angular.module('app.home.journal', [])
  .controller('JournalController', JournalController);

  JournalController.$inject = ['$scope', 'Journal', 'Home'];

  function JournalController ($scope, Journal, Home) {
    // jshint validthis: true
    var journal = this;
    journal.message = '';
    journal.sentiment = '';
    journal.entry = "Enter your thoughts for today...";
    journal.showSent = true;

    journal.saveJournal = Journal.saveJournal;

    journal.getSentiment = function (text) {
      Journal.getSentiment(text)
        .then(function (res) {
          journal.sentiment = res.data.docSentiment.type;
          journal.showSent = false;
        })
        .catch(function(err){
          console.log('Error ', err)
        });
    };

    // journal.date = (new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())).toString();
    // journal.day = Home.getDay(journal.date);
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
})();
