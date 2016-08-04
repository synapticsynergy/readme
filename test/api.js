var assert = require('chai').assert;
var mongoose = require('mongoose');
var userController = require('../src/db/user/userController');
var User = userController.User;
var request = require('supertest')('http://localhost:3000');
var app = require('../src/server/server.js');


// Return a JSON object back from the response
// Handles both `res.send(JSON.stringify({}))` and `res.json({})`
var getBody = function (res) {
  return JSON.parse(res.text);
};

describe('RESTful API', function () {
  var testEmail = 'shmoe@test.com';
  var firstname = 'shmoe';
  var lastname = 'cool';
  var newUser = {
        firstname: firstname,
        lastname: lastname,
        email: testEmail
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

    describe('POST', function () {

      it('responds with a 201 (Created) when a valid user is sent', function (done) {

        request
          .post('/user')
          .send(newUser)
          .expect(201, done);

      });

    });

  });



