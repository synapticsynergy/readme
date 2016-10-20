(function() {
  'use strict';
  angular.module('app.home.journal', []).controller('JournalController', JournalController);
  JournalController.$inject = ['$scope', 'Journal', 'Home'];

  function JournalController($scope, Journal, Home) {
    // jshint validthis: true
    var journal = this;
    journal.message = '';
    journal.sentiment = '';
    journal.entry = Home.date === undefined ? '' : Home.getDay(Home.date.toISOString()).journalEntry;
    journal.showSent = true;
    journal.saveJournal = function() {
      Journal.saveJournal.call(journal);
      Home.getUserData();
    };
    journal.getSentiment = function(text) {
      Journal.getSentiment(text).then(function(res) {
        journal.sentiment = res.data.docSentiment.type;
        journal.showSent = false;
      }).catch(function(err) {
        console.log('Error ', err)
      });
    };
  }
})();
