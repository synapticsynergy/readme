var mongoose = require('mongoose');
var userController = require('../src/db/user/userController');
var User = userController.User;
var request = require('supertest')('http://localhost:3000');
var app = require('../src/server/server.js');
var expect = require('chai').expect;

describe('RESTful API', function () {
  var testEmail = 'shmoe@test.com';
  var firstname = 'shmoe';
  var lastname = 'cool';
  var newUser = {
    firstname: firstname,
    lastname: lastname,
    email: testEmail,
    location: { lat: 33.671521999999996, lng: -117.84693320000001 },
    date: testDate
  };

  var testDate = new Date(2016, 6, 6);
  var databaseUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/readme';

  before(function () {
    // ensures the db is connected before tests run
    return mongoose.createConnection(databaseUrl);
  });

  after(function () {
    // clean up test data after all tests run
    return userController.removeUser(newUser.email);
  });

  // User tests.
  describe('POST', function () {
    it('responds with a 201 (Created) when a valid user is sent', function (done) {
      request
        .post('/user')
        .send(newUser)
        .expect(201, done);
    });
  });

  describe('DELETE',  function () {
    it('responds with a 200 when finding deleting a user from an email address', function (done) {
      request
        .delete('/user')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({email: 'shmoe@test.com'})
        .expect(200, done);
    });
  });

  // Activities tests
  describe('POST',  function () {
    it('responds with a 200 when adding an activity', function (done) {
      newUser.datums = ['ran', 'ate breakfast', 'slept in'];
      newUser.date = testDate;

      request
        .post('/user/activity')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send(newUser)
        .expect(200)
        .end(function (err, data) {
          var parsedData = JSON.parse(data.text);
          expect(parsedData.days[0].activities[2]).to.equal('slept in');
          done();
        });
    });
  });

  describe('DELETE',  function () {
    it('responds with a 200 when deleting an activity', function (done) {
      newUser.datums = 'ran';
      newUser.date = testDate;

      request
        .delete('/user/activity')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send(newUser)
        .expect(200, done);
    });
  });

// Metrics tests
  describe('POST',  function () {
    it('responds with a 200 when adding a metric', function (done) {
      newUser.datums = ['headache', 'happy', 'lost weight'];
      newUser.date = testDate;

      request
        .post('/user/metric')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send(newUser)
        .expect(200)
        .end(function (err, data) {
          var parsedData = JSON.parse(data.text);
          expect(parsedData.days[0].metrics[2]).to.equal('lost weight');
          done();
        });
    });
  });

  describe('DELETE',  function () {
    it('responds with a 200 when deleting a metric', function (done) {
      newUser.datums = 'headache';
      newUser.date = testDate;

      request
        .delete('/user/metric')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send(newUser)
        .expect(200, done);
    });
  });

// Journal Route test
  describe('POST',  function () {
    it('responds with a 200 when adding a journal entry', function (done) {
      newUser.entry = 'I am super happy.';
      newUser.date = testDate;

      request
        .post('/user/journal')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send(newUser)
        .expect(200)
        .end(function (err, data) {
          var parsedData = JSON.parse(data.text);
          expect(parsedData.days[0].journalEntry).to.equal('I am super happy.');
          done();
        });
    });
  });

  // Get correlations route test.
  describe('POST', function () {
    it('responds with a 200 when requesting a metric correlation', function (done) {
      // newUser.datums = "headache";
      request
        .post('/user/correlation')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send(newUser)
        .expect(200)
        .end(function (err, data) {
          var parsedData = JSON.parse(data.text);
          expect(parsedData).to.equal(0);
          done();
        });
    });
  });
});
