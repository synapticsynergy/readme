(function () {
  'use strict';
  angular.module('app.home.journal', [])
  .controller('JournalController', JournalController)
  .factory('Journal', Journal);

  function JournalController ($scope, Journal, homeFactory) {
    // jshint validthis: true
    var journal = this;
    journal.message = '';

    journal.ta = {};

    journal.ta.htmlcontent2 = '<h2>Try me 2!</h2><p>textAngular is a super cool WYSIWYG Text Editor directive for AngularJS</p><p><b>Features:</b></p><ol><li>Automatic Seamless Two-Way-Binding</li><li style="color: blue;">Super Easy <b>Theming</b> Options</li><li>Simple Editor Instance Creation</li><li>Safely Parses Html for Custom Toolbar Icons</li><li>Doesn&apos;t Use an iFrame</li><li>Works with Firefox, Chrome, and IE8+</li></ol><p><b>Code at GitHub:</b> <a href="https://github.com/fraywing/textAngular">Here</a></p>';


    journal.date = (new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())).toString();
    journal.day = homeFactory.getDay(journal.date);
    if (journal.day !== undefined) {
      journal.dailyMemo = journal.day.journalEntry;
    }
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
