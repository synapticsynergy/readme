var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');
var app = require('../index.js');
var Users = require('../src/db/user/userController.js');

chai.use(require('chai-things'));

var testUsers = [
  {
    firstname: 'Bill',
    lastname: 'Joe',
    email: 'bill@joe.com'
  },
  {
    firstname: 'Sammy',
    lastname: 'Coolio',
    email: 'cool@coolio.com'
  },
  {
    firstname: 'Bobby',
    lastname: 'Kid'
    email: 'bobby@kid.com'
  }
];


// Return a JSON object back from the response
// Handles both `res.send(JSON.stringify({}))` and `res.json({})`
var getBody = function (res) {
  return JSON.parse(res.text);
};

describe('RESTful API', function () {

  beforeEach(function () {
    // Send a deep copy in so internal mutations do not affect our `testUsers` array above
    // Note: This copy technique works because we don't have any functions
    var usersCopy = JSON.parse(JSON.stringify(testUsers));
    Users.setAll(usersCopy);
  });

  // describe('/api/users', function () {

  //   describe('GET', function () {

  //     it('responds with a 200 (OK)', function (done) {

  //       request(app)
  //         .get('/api/users')
  //         .expect(200, done);

  //     });

  //   });

    describe('POST', function () {

      var newUser = {
        name: 'Josh',
        email: 'josh@josh.io'
      };

      it('responds with a 201 (Created) when a valid user is sent', function (done) {

        request(app)
          .post('/user')
          .send(newUser)
          .expect(201, done);

      });

    });

  });



