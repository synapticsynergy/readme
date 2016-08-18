const User = require('./userModel');
const ml = require('../../ml/correlations');
const http = require('request-promise');
// const wunderground = require('wunderground')('921c08ecbdcbf50c');

function findOrCreateUser(email, firstname, lastname) {
  // use just the email to find them in case this is
  // coming from a place we assume the user has already
  // been created
  return User.findOne({
      email: email
    })
    .then(function(user) {
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

function removeUser(email) {
  return User.remove({
    email: email
  });
}

User.prototype.addActivity = function(activities, day, location) {
  var user = this;
  return user.getDay(day)
    .then(function(foundDay) {

    if (foundDay.gotWeather === false) {
      var dateForWeather = foundDay.date.split('T')[0].split('-').join('');
       return user.getWeather(dateForWeather, location)
        .then(function(newWeatherParams) {
          console.log('addAc newWeatherParams: ', newWeatherParams)
          activities = activities.concat(newWeatherParams);
          console.log('addAc activities: ', activities)
          activities.forEach(function(activity) {
            if (user.userActivities.indexOf(activity) === -1) {
              user.userActivities.push(activity);
            }
          });
          foundDay.activities = foundDay.activities.concat(activities);
          foundDay.gotWeather = true;
          return user.save();
        })
        
    } else {
      activities.forEach(function(activity) {
        if (user.userActivities.indexOf(activity) === -1) {
          user.userActivities.push(activity);
        }
      });
      console.log('activities', activities)
      foundDay.activities = foundDay.activities.concat(activities);
      return user.save();
    }
  })
};

User.prototype.deleteActivity = function(activity, day) {
  var user = this;
  return user.getDay(day)
    .then(function(foundDay) {
      foundDay.activities.splice(
        foundDay.activities.indexOf(activity), 1
      );
      return user.save();
    });
};

User.prototype.addMetric = function(metrics, day) {
  var user = this;
  return user.getDay(day)
    .then(function(foundDay) {
      metrics.forEach(function(metric) {
        if (user.userMetrics.indexOf(metric) === -1) {
          user.userMetrics.push(metric);
        }
      });
      foundDay.metrics = foundDay.metrics.concat(metrics);
      return user.save();
    });
};

User.prototype.deleteMetric = function(metric, day) {
  var user = this;
  return user.getDay(day)
    .then(function(foundDay) {
      foundDay.metrics.splice(
        foundDay.metrics.indexOf(metric), 1
      );
      return user.save();
    });
};

User.prototype.saveJournal = function(journal, day) {
  var user = this;
  return user.getDay(day)
    .then(function(foundDay) {
      foundDay.journalEntry = journal;
      return user.save();
    });
};

User.prototype.findCorrelations = function(metric) {
  var user = this;
  return new Promise(function(resolve) {
    resolve(ml.findCorrelations(user, metric));
  });
};

User.prototype.driftSearch = function(metric, maxDays) {
  var user = this;
  return new Promise(function(resolve) {
    resolve(ml.driftSearch(user, metric, maxDays));
  });
};

User.prototype.getDay = function(date) {
  for (var x = 0; x < this.days.length; x++) {
    var day = this.days[x];
    if (day.date === date) {
      return new Promise(function(resolve) {
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
    .then(function(user) {
      return user.days[user.days.length - 1];
    });
};

//calls the wunderground API for weather data and pulls pertinent info out of the response
User.prototype.getWeather = function(date, location) {
  var newWeatherParams = [];

  var urlFirst = 'http://api.wunderground.com/api';
  var urlAPIKey = '/921c08ecbdcbf50c';
  var urlDate = '/history_' + date;
  var urlLocation = '/q/' + location.lat + ',' + location.lng + '.json'

  var queryUrl = urlFirst + urlAPIKey + urlDate + urlLocation;

  var options = {
    uri: queryUrl,
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  };

  return http(options)
    .then(function(weatherData) {
        var dailySum = weatherData.history.dailysummary[0];
        var dailyCond = weatherData.history.observations;

        if (dailySum.fog === '1') {
          newWeatherParams.push('fog');
          console.log('fog updated')
        }
        if (dailySum.rain === '1') {
          newWeatherParams.push('rain')
          console.log('rain updated')
        }
        if (dailySum.snow === '1') {
          newWeatherParams.push('snow')
          console.log('snow updated')
        }
        if (dailySum.hail === '1') {
          newWeatherParams.push('hail')
          console.log('hail updated')
        }
        if (dailySum.maxhumidity !== '' && parseInt(dailySum.maxhumidity) > 70) {
          newWeatherParams.push('humid')
          console.log('humid updated')
        }
        if (parseInt(dailySum.meanwindspdi) > 15) {
          newWeatherParams.push('windy')
          console.log('windy updated')
        }

        newWeatherParams.push('highs in the ' + dailySum.maxtempi.slice(0, -1) + '0s')
        console.log('maxTemp updated')

        newWeatherParams.push('lows in the ' + dailySum.mintempi.slice(0, -1) + '0s')
        console.log('minTemp updated')

        //Grabs a weather condition halfway through the daily weather observations
        newWeatherParams.push("Conditions: " + dailyCond[Math.floor(dailyCond.length / 2)].conds)
        console.log('conds updated');

        return newWeatherParams;
    })
}

module.exports = {
  findOrCreateUser: findOrCreateUser,
  removeUser: removeUser,
  User: User
};