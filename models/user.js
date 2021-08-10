const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = Schema({
  username: { type: String, unique: true, required: true },
  password: String,
  image: {type: String},
  weight: {type: Number},
  height: {type: Number},
  workoutscompleted: [], 
})

const User = mongoose.model('User', userSchema)

module.exports = User;