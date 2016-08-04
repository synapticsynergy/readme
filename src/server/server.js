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
  .get(function(req, res){

  })
  //Add a user.
  .post(function(req, res) {
    //grab email, firstname, lastname from req.body
    //artificial testing.
    console.log('postman working');

    if (req.body) {
      console.log(req.body, 'state of data');
    }
    var adding = JSON.stringify(Users.create(req.body));
    res.status(201).send(adding);
  });



// app.route('/api/users/:id')
//   .get(function(req, res) {
//     var idPath = req.path.split('/');
//     var id = idPath[idPath.length - 1];
//     var userString = JSON.stringify(Users.getOne(id));
//     res.send(userString);
//   })
//   .put(function(req, res) {
//     var idPath = req.path.split('/');
//     var id = idPath[idPath.length - 1];
//     var userString = JSON.stringify(Users.updateOne(id, req.body));
//     res.send(userString);
//   })
//   .delete(function(req, res) {
//     var idPath = req.path.split('/');
//     var id = idPath[idPath.length - 1];
//     var userString = JSON.stringify(Users.deleteOne(id));
//     res.send(userString);
//   });









var port = process.env.PORT || 3000;
var databaseUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/readme';

mongoose.connect(databaseUrl, function () {
  app.listen(port, function () {
    console.log('Server listening on ' + port);
  });
});
