const User = require('./userModel');
const findCorrelations = require('../../ml/correlations');


function newUser (email, firstname, lastname) {
  return User.create({
    email: email,
    firstname: firstname,
    lastname: lastname
  });
}

function findUser (email) {
  return User.findOne({
    email: email
  });
}

function removeUser (email) {
  return User.remove({
    email: email
  });
}

User.prototype.addActivity = function (activity, day) {
  var user = this;
  return user.getDay(day)
    .then(function (day) {
      day.activities.push(activity);
      return user.save();
    });
}

User.prototype.deleteActivity = function (activity, day) {
  var user = this;
  return user.getDay(day)
    .then(function (day) {
      day.activities.splice(
        day.activities.indexOf(activity), 1
      );
      return user.save();
    });
}

User.prototype.addMetric = function (metric, day) {
  var user = this;
  return user.getDay(day)
    .then(function (day) {
      day.metrics.push(metric);
      return user.save();
    });
}

User.prototype.deleteMetric = function (metric, day) {
  var user = this;
  return user.getDay(day)
    .then(function (day) {
      day.metrics.splice(
        day.metrics.indexOf(metric), 1
      );
      return user.save();
    });
}

User.prototype.saveJournal = function (journal, day) {
  var user = this;
  return user.getDay(day)
    .then(function (day) {
      day.journalEntry = journal;
      return user.save();
    });
}

User.prototype.findCorrelations = function (metric) {
  var user = this;
  return new Promise(function (resolve, reject) {
    resolve(findCorrelations(user, metric));
  });
}

User.prototype.getDay = function (date) {
  for (var x = 0; x < this.days.length; x++) {
    var day = this.days[x];
    if (day.date === date) {
      return new Promise(function (resolve, reject) {
        resolve(day);
      });
    }
  }

  // if day not found, add it and return it
  this.days.push({
    date: date,
    activities: [],
    metrics: [],
    journalEntry: '',
    sentiment: ''
  });
  return this.save()
    .then(function (user) {
      return user.getDay(date);
    });
}

module.exports = {
  newUser: newUser,
  findUser: findUser,
  removeUser: removeUser,
  User: User
}
