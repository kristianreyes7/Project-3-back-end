  const mongoose = require('mongoose');
  const Schema = mongoose.Schema;

  const workoutSchema = new Schema({
    date: {type: String},
    time: {type: String},
    areaTarget: {type: String},
    exercise: {type: String},
    sets: {type: Number},
    reps: {type: Number},
    weight: {type: Number},
    meal: [String],
    comments: [String],
  })

  const Workout = mongoose.model('Workout', workoutSchema);
  module.exports = Workout;
