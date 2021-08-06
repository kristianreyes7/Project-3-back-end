//====dependencies====//
const express = require('express');
const workout = express.Router();
//====data from schema====//
const Workout_data = require('../models/workout_data.js');
//====routes====//
//create
workout.post('/', (req, res) => {
  Workout_data.create(req.body, (error, newWorkout) => {
    error?
    console.log(error)
    :
    res.json(newWorkout);
  });
});


//read
workout.get('/', (req, res) => {
  Workout_data.find({}, (error, foundworkout) => {
    error?
    console.log(error)
    :
    res.json(foundworkout);
  });
});

module.exports = workout;