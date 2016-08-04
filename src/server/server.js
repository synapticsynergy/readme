var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var User = require('../db/user/userController.js');
var _ = require('underscore');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '/../client')));


//Routes
//
app.route('/user')
  //Add a user.
  .post(function(req, res) {
    if (req.body) {
      console.log(req.body, 'state of data');
      var adding = JSON.stringify(User.newUser(req.body.email,req.body.firstname,req.body.lastname));
      res.status(201).send(adding);
    } else {
      console.error('Error adding user');
    }
  });


//User specific, by email
app.route('/api/users/:email')
  .get(function(req, res) {
    var idPath = req.path.split('/');
    var id = idPath[idPath.length - 1];
    var userString = JSON.stringify(Users.getOne(id));
    res.send(userString);
  })
  .put(function(req, res) {
    var idPath = req.path.split('/');
    var id = idPath[idPath.length - 1];
    var userString = JSON.stringify(Users.updateOne(id, req.body));
    res.send(userString);
  })
  .delete(function(req, res) {
    var idPath = req.path.split('/');
    var id = idPath[idPath.length - 1];
    var userString = JSON.stringify(Users.deleteOne(id));
    res.send(userString);
  });









var port = process.env.PORT || 3000;
var databaseUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/readme';

mongoose.connect(databaseUrl, function () {
  app.listen(port, function () {
    console.log('Server listening on ' + port);
  });
});
