const User = require('./userModel');
const ml = require('../../ml/correlations');
const wunderground = require('wunderground')('921c08ecbdcbf50c');

function findOrCreateUser (email, firstname, lastname) {
  // use just the email to find them in case this is
  // coming from a place we assume the user has already
  // been created
  return User.findOne({
    email: email
  })
    .then(function (user) {
      if (!user) {
        return User.create({
          email: email,
          firstname: firstname,
          lastname: lastname
        });
      } else {
        return user;
      }
    });
}

function removeUser (email) {
  return User.remove({
    email: email
  });
}

User.prototype.addActivity = function (activities, day, location) {
  var user = this;
  return user.getDay(day)
    .then(function (foundDay) {

      //checks to see if weather data has been obtained for the given day 
      if (foundDay.getWeather === false){

        //puts the date into a format the getWeather function can use
        var dateWeather = foundDay.date.split('T')[0].split('-').join('');

        user.getWeather(dateWeather, location, function(weatherData){
        //after the resolve of the getWeather function, add the additional paramaters into the activities array
          activities = activities.concat(weatherData);

          activities.forEach(function (activity) {
            if (user.userActivities.indexOf(activity) === -1) {
              user.userActivities.push(activity);
            }
          });
      foundDay.activities = foundDay.activities.concat(activities);
      //sets the getWeather variable to true to indicate that weather data has been obtained for the given day
      foundDay.getWeather = true;
      return user.save();
        })
      }
    });
};

User.prototype.deleteActivity = function (activity, day) {
  var user = this;
  return user.getDay(day)
    .then(function (foundDay) {
      foundDay.activities.splice(
        foundDay.activities.indexOf(activity), 1
      );
      return user.save();
    });
};

User.prototype.addMetric = function (metrics, day) {
  var user = this;
  return user.getDay(day)
    .then(function (foundDay) {
      metrics.forEach(function (metric) {
        if (user.userMetrics.indexOf(metric) === -1) {
          user.userMetrics.push(metric);
        }
      });
      foundDay.metrics = foundDay.metrics.concat(metrics);
      return user.save();
    });
};

User.prototype.deleteMetric = function (metric, day) {
  var user = this;
  return user.getDay(day)
    .then(function (foundDay) {
      foundDay.metrics.splice(
        foundDay.metrics.indexOf(metric), 1
      );
      return user.save();
    });
};

User.prototype.saveJournal = function (journal, day) {
  var user = this;
  return user.getDay(day)
    .then(function (foundDay) {
      foundDay.journalEntry = journal;
      return user.save();
    });
};

User.prototype.findCorrelations = function (metric) {
  var user = this;
  return new Promise(function (resolve) {
    resolve(ml.findCorrelations(user, metric));
  });
};

User.prototype.driftSearch = function (metric, maxDays) {
  var user = this;
  return new Promise(function (resolve) {
    resolve(ml.driftSearch(user, metric, maxDays));
  });
};

User.prototype.getDay = function (date) {
  for (var x = 0; x < this.days.length; x++) {
    var day = this.days[x];
    if (day.date === date) {
      return new Promise(function (resolve) {
        resolve(day);
      });
    }
  }

  // if day not found, add it and return it
  this.days.push({
    date: date.toString(),
    activities: [],
    metrics: [],
    journalEntry: '',
    sentiment: ''
  });
  return this.save()
    .then(function (user) {
      return user.days[user.days.length - 1];
    });
};

User.prototype.getWeather = function (date, location, callback) {
  var newWeatherParams = [];

  var query = {
    date: date,
    lat: location.lat,
    lng: location.lng
  }

  wunderground.history(query, function(err, weatherData){
    if (!err){
      var dailySum = weatherData.history.dailysummary[0];
      var dailyCond = weatherData.history.observations;
      //Grabs the following data and puts it into the newWeatherParams for return
      if (dailySum.fog === '1'){
        newWeatherParams.push('fog');
        console.log('fog updated')
      }
      if (dailySum.rain === '1'){
        newWeatherParams.push('rain')
        console.log('rain updated')
      }
      if (dailySum.snow === '1'){
        newWeatherParams.push('snow')
        console.log('snow updated')
      }
      if (dailySum.hail === '1'){
        newWeatherParams.push('hail')
        console.log('hail updated')
      }
      if (parseInt(dailySum.maxhumidity) > 60){
        newWeatherParams.push('humid')
        console.log('humid updated')
      }
      if (parseInt(dailySum.meanwindspdi) > 15){
        newWeatherParams.push('windy')
        console.log('windy updated')
      }
      
      newWeatherParams.push('highs in the ' + dailySum.maxtempi[0] + '0s')
      console.log('maxTemp updated')
    
    
      newWeatherParams.push('lows in the ' + dailySum.mintempi[0] + '0s')
      console.log('minTemp updated')
      
      //Grabs a condition halfway through the daily weather observations
      newWeatherParams.push("Conditions: " + dailyCond[Math.floor(dailyCond.length/2)].conds)
      console.log('conds updated')
    } else {
      console.log(err, "There was an error getting your weather shit")
    }
     callback(newWeatherParams);
  })
}

module.exports = {
  findOrCreateUser: findOrCreateUser,
  removeUser: removeUser,
  User: User
};
