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
//seed
workout.get('/seed', (req, res) => {
  Workout_data.create([
    {
      date: "2012",
      time: "12:02pm",
      target: "Chest",
      exercise: "Bench Press",
      sets: 3,
      reps: 15,
      meal: ["Protein Shake"],
      comments: ["good"],
    },
    {
      date: "2015",
      time: "12:00pm",
      target: "Back",
      exercise: "Lat Pull",
      sets: 3,
      reps: 15,
      meal: ["Beer Shake"],
      comments: ["good"],
    },
    {
      date: "2021",
      time: "12:02pm",
      target: "Legs",
      exercise: "Leg Press",
      sets: 3,
      reps: 12,
      meal: ["Egg Shake"],
      comments: ["great"],
    },
    {
      date: "2022",
      time: "2:02pm",
      target: "Shoulders",
      exercise: "Shoulder Press",
      sets: 3,
      reps: 10,
      meal: ["Sandwhich"],
      comments: ["sucked"],
    } 
  ], (error, newWorkout) => {
    error?
    console.log(error)
    :
    res.json(newWorkout);
  })  
})

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