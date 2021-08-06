const bcrypt = require('bcrypt')
const express = require('express');
const users = express.Router();
//===data from schema===//
const User_data = require('../models/user.js');
//====create====//
users.post('/new', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  User_data.create(req.body, (error, createdUser) => {
    error? console.log(error)
    : 
    console.log('user is created', createdUser);
    res.json(createdUser);
  })
});
users.get('/', (req, res) => {
  User_data.find({}, (error, foundUser) => {
    error? console.log(error)
    : 
    res.json(foundUser);
  })
});
//====export====//
module.exports = users;