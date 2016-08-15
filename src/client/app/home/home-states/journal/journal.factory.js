(function () {
  'use strict';
  angular.module('app.home.journal')
  .factory('Journal', Journal);

  Journal.$inject = ['$http', 'store', 'Home'];

  function Journal ($http, store, Home) {
    var services = {
      saveJournal: saveJournal
    };

    return services;

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
    };

  }
})();
