  const mongoose = require('mongoose');
  const Schema = mongoose.Schema;

  const workoutSchema = new Schema({
    date: {type: String, required: true},
    target: [String],
    exercise: {type: String, required: true},
    meal: [String],
    comments: [String],
  })

  const Workout = mongoose.model('Workout', workoutSchema);
  module.exports = Workout;
