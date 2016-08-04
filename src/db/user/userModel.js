var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  email: String,
  firstname: String,
  lastname: String,
  days: [
    {
      date: Date,
      // the DO things
      activities: [String],
      // the ARE things
      metrics: [String],
      // one journal entry per day 
      // sentiment possibly from watson?
      journalEntry: String,
      sentiment: String
    }
  ],
  // things that the user has already done
  // for auto-complete or something
  userActivities: [String],
  // metrics the user has already nominated
  // same, autocomplete or something
  userMetrics: [String]
});

module.exports = mongoose.model('User', userSchema);
