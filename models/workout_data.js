  const mongoose = require('mongoose');
  const Schema = mongoose.Schema;

  const workoutSchema = new Schema({
    date: {type: String, required: true},
    time: {type: String},
    areaTarget: {type: String},
    exercise: {type: String, required: true},
    sets: {type: Number, required: true},
    reps: {type: Number, require: true},
    weight: {type: Number, require: true},
    meal: [String],
    comments: [String],
  })

  const Workout = mongoose.model('Workout', workoutSchema);
  module.exports = Workout;
