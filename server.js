//====Dependencies====//
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const db = mongoose.connection;
const cors = require('cors')
// const session = require('express-session')
require ('dotenv').config();

//=====PORT====//
const PORT = process.env.PORT || 3003;

//====Database====//
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,  
  useUnifiedTopology: true,
  useFindAndModify: false,
});

//error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//====Middleware====//
app.use(cors());
app.use(express.json());
// app.use(
//   session({
//     secret: process.env.SECRET, //a random string do not copy this value or your stuff will get hacked
//     resave: false, // default more info: https://www.npmjs.com/package/express-session#resave
//     saveUninitialized: false // default  more info: https://www.npmjs.com/package/express-sess  ion#resave
//   })
// )

app.get('/', (req, res) => {
  res.redirect('/workout');
})
const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next()
  } else {
    res.redirect('/session/login')
  }
}
//====Controllers====//
const workout_controller = require('./Controllers/workout_router.js');
app.use('/workout', workout_controller);

const user_controller = require('./Controllers/users.js');
app.use('/user', user_controller);

//====listener====//
app.listen(PORT, () => {
  console.log('Listening on port:', PORT);
})