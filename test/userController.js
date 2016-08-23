var assert = require('chai').assert;
var mongoose = require('mongoose');
var userController = require('../src/db/user/userController');
var User = userController.User;


describe('userController', function () {
  var testEmail = '1@asdfccc.com';
  var testFirstName = 'budleigh';
  var testLastName = 'salterton';
  // var testDate = new Date(2016, 6, 6);
  var testDate = '2016-07-06T07:00:00.000Z';
  var testLocation = { lat: 33.671521999999996, lng: -117.84693320000001 };
  var databaseUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/readme';

  before(function () {
    // ensures the db is connected before tests run
    return mongoose.createConnection(databaseUrl);
  });

  after(function () {
    // clean up test data after all tests run
    return userController.removeUser(testEmail);
  });

  describe('findOrCreateUser', function () {
    it('should create a new user', function () {
      return userController.findOrCreateUser(testEmail, testFirstName, testLastName)
        .then(function (user) {
          assert.instanceOf(user, User);
        });
    });

    it('should find a previously created user', function () {
      return userController.findOrCreateUser(testEmail)
        .then(function (user) {
          assert.instanceOf(user, User);
        });
    });
  });

  describe('addActivity', function () {
    it('should add an activity', function () {
      return userController.findOrCreateUser(testEmail)
        .then(function (user) {
          return user.addActivity(['bowling'], testDate, testLocation);
        })
        .then(function (user) {
          return user.getDay(testDate);
        })
        .then(function (day) {
          assert.include(day.activities, 'bowling');
        });
    });
  });

  describe('deleteActivity', function () {
    it('should delete an activity', function () {
      return userController.findOrCreateUser(testEmail)
        .then(function (user) {
          return user.deleteActivity('bowling', testDate);
        })
        .then(function (user) {
          return user.getDay(testDate);
        })
        .then(function (day) {
          assert.notInclude(day.activities, 'bowling');
        });
    });
  });

  describe('addMetric', function () {
    it('should add a metric', function () {
      return userController.findOrCreateUser(testEmail)
        .then(function (user) {
          return user.addMetric(['headache'], testDate);
        })
        .then(function (user) {
          return user.getDay(testDate);
        })
        .then(function (day) {
          assert.include(day.metrics, 'headache');
        });
    });
  });

  describe('deleteMetric', function () {
    it('should delete a metric', function () {
      return userController.findOrCreateUser(testEmail)
        .then(function (user) {
          return user.deleteMetric('headache', testDate);
        })
        .then(function (user) {
          return user.getDay(testDate);
        })
        .then(function (day) {
          assert.notInclude(day.metrics, 'headache');
        });
    });
  });

  describe('saveJournal', function () {
    it('should save the journal', function () {
      return userController.findOrCreateUser(testEmail)
        .then(function (user) {
          return user.saveJournal('test journal', testDate);
        })
        .then(function (user) {
          return user.getDay(testDate);
        })
        .then(function (day) {
          var journal = day.journalEntry;
          assert.equal('test journal', journal);
        });
    });
  });

  describe('findCorrelations', function () {
    it('should find correlations', function () {
      return userController.findOrCreateUser(testEmail)
        .then(function (user) {
          return user.findCorrelations('headache');
        })
        .then(function (correlations) {
          assert.isArray(correlations);
        });
    });
  });

  describe('driftSearch', function () {
    it('should driftsearch', function () {
      return userController.findOrCreateUser(testEmail)
        .then(function (user) {
          return user.driftSearch('headache', 2);
        })
        .then(function (correlations) {
          assert.isArray(correlations);
        });
    });
  });
});
