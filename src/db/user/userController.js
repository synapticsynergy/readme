const User = require('./userModel');

function newUser (email) {
  return User.create({
    email: email
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

User.addActivity = function (activity, day) {
  this.days[day].activities.push(activity);
  return this.save();
}

User.deleteActivity = function (activity, day) {
  this.days[day].activities.splice(
    this.days[day].activities.indexOf(activity), 1
  );
  return this.save();
}

User.addMetric = function (metric, day) {
  this.days[day].metrics.push(metric);
  return this.save();
}

User.deleteMetric = function (metric, day) {
  this.days[day].metrics.splice(
    this.days[day].metrics.indexOf(metric), 1
  );
  return this.save();
}

User.saveJournal = function (journal, day) {
  this.days[day].journal = journal
  return this.save();
}

User.getCorrelations = function (metric) {
  return {}
}

User.getDay = function (date) {
  for (var x = 0; x < this.days.length; x++) {
    var day = this.days[x];
    if (day.date === date) {
      return day;
    }
  }
}

module.exports = {
  newUser: newUser,
  findUser: findUser,
  removeUser: removeUser,
  User: User  
}
