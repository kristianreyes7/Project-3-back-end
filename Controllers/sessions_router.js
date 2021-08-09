const bcrypt = require('bcrypt')
const express = require('express');
const sessions = express.Router();
//===data from schema===//
const Users = require('../models/user.js');

// on sessions form submit (log in)
sessions.post('/', (req, res) => {
   // Step 1 Look for the username
   Users.findOne({ username: req.body.username }, (error, foundUser) => {
    // Database error
    if (error) {
      console.log(error)
      res.send('oops the db had a problem')
    } else if (!foundUser) {
      // if found user is undefined/null not found etc
      res.send('<a  href="/workout">Sorry, no user found </a>')
    } else {
      // user is found yay!
      // now let's check if passwords match
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        // add the user to our session
        req.session.currentUser = foundUser
        // redirect back to our home page
        res.redirect('/workout')
      } else {
        // passwords do not match
        res.send('<a href="/"> password does not match </a>')
      }
    }
  })
});
//====logout====//
sessions.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/workouts');
  })
});
module.exports = sessions
