var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  email: String,
  firstname: String,
  lastname: String,
  days: [
    {
      date: String,
      // the DO things
      activities: [String],
      // the ARE things
      metrics: [String],
      // one journal entry per day
      // sentiment possibly from watson?
      journalEntry: String,
      sentiment: String,
      gotWeather: {type: Boolean, default: false}
    }
  ],
  // things that the user has already done
  // for auto-complete or something
  userActivities: [String],
  // metrics the user has already nominated
  // same, autocomplete or something
  userMetrics: [String],

  popularItems: {
    type: Object,
    default: {
      act:{},
      met:{}
    }
  }

}, {minimize: false});

module.exports = mongoose.model('User', userSchema);
