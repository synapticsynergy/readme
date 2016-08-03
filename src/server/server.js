var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/../client')));

var port = process.env.PORT || 3000;
var databaseUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/readme';

mongoose.connect(databaseUrl, function () {
  app.listen(port, function () {
    console.log('Server listening on ' + port);
  });
});
