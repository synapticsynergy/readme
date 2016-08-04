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

    User.newUser(req.body.email,req.body.firstname,req.body.lastname)
      .then(function(user) {
        var adding = JSON.stringify(user);
        res.status(201).send(adding);
      })
      .catch(function(err) {
        console.error(err,'Error adding user');
      });
  });


app.route('/user/find')
  .post(function(req, res) {
    console.log(req.body.email, 'where is the email');
    User.findUser(req.body.email)
      .then(function(user) {
        var userString = JSON.stringify(user);
        res.send(userString);
      })
      .catch(function(err) {
        console.error(err,'Error finding user');
      });
  });


//User specific, by id
// app.route('/user/:id')
//   .get(function(req, res) {
//     var idPath = req.path.split('/');
//     var id = idPath[idPath.length - 1];

//     User.findUser(id)
//       .then(function(user) {
//         var userString = JSON.stringify(user);
//         res.send(userString);
//       })
//       .catch(function(err) {
//         console.error(err, 'Error Getting User');
//       });

//   });
  // .put(function(req, res) {
  //   var idPath = req.path.split('/');
  //   var id = idPath[idPath.length - 1];
  //   var userString = JSON.stringify(Users.updateOne(id, req.body));
  //   res.send(userString);
  // })
  // .delete(function(req, res) {
  //   var idPath = req.path.split('/');
  //   var id = idPath[idPath.length - 1];
  //   var userString = JSON.stringify(Users.deleteOne(id));
  //   res.send(userString);
  // });









var port = process.env.PORT || 3000;
var databaseUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/readme';

mongoose.connect(databaseUrl, function () {
  app.listen(port, function () {
    console.log('Server listening on ' + port);
  });
});
