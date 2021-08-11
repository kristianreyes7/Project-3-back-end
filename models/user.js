const mongoose = require('mongoose')
const  Workout = require('./workout_data')
const Schema = mongoose.Schema

const userSchema = Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, unique: true, required: true },
  image: {type: String},
  weight: {type: Number},
  height: {type: Number},
  workouts: [{
    date: {type: String},
    time: {type: String},
    target: {type: String},
    exercise: {type: String},
    sets: {type: Number},
    reps: {type: Number},
    weight: {type: Number},
    meal: {type: String},
    comments: {type: String},
  }],
})

const User = mongoose.model('User', userSchema)

module.exports = User;