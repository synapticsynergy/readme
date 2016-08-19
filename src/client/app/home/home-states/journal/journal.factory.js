(function () {
  'use strict';
  angular.module('app.home.journal')
  .factory('Journal', Journal);

  Journal.$inject = ['$http', 'store', 'Home'];

  function Journal ($http, store, Home) {
    var services = {
      saveJournal: saveJournal,
      getSentiment: getSentiment
    };

    function saveJournal () {
      var profile = store.get('userData');
      var currentlySelectedDate = Home.date;

      return $http({
        method: 'POST',
        url: '/user/journal',
        data: {
          entry: this.entry,
          email: profile.email,
          date: currentlySelectedDate
        }
      }).then(function(data) {
        console.log(data);
      }).catch(function(err) {
        console.log(err)
      });
    }

    function getSentiment (text) {
      return $http({
        method: 'POST',
        url: '/sentiment/',
        data: {
          text: text
        }
      })
        .then(function (res) {
          return res;
        })
        .catch(function (err) {
          console.error(err);
        });
    }

    return services;
  }
})();
