var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  email: String,
  firstname: String,
  lastname: String,
  days: [
    {
      date: Date,
      activities: [
        {
          name: String,
        }
      ],
      metrics: [
        {
          name: String,
        }
      ],
    }
  ],
  activites: [
    {
      name: String,
    }
  ],
  metrics: [
    {
      name: String
    }
  ]
});

module.exports = mongoose.model('User', userSchema);