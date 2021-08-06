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
//show route
workout.get('/:id', (req, res) => {
  Workout_data.findById(req.params.id, req.body, {new:true}, (error, foundworkout) => {
    error?
    console.log(error)
    :
    res.json(foundworkout);
  })
})

//update
workout.put('/:id', (req, res) => {
  Workout_data.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, foundworkout) => {
    error?
    console.log(error)
    :
    res.json(foundworkout);
  })
})

//delete
workout.delete('/:id', (req, res) => {
  Workout_data.findByIdAndDelete(req.params.id, (error, deleteWorkout) => {
    error?
    console.log(error)
    :
    res.json(deleteWorkout);
  })
})

module.exports = workout;