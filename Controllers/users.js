const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/user.js");
// Register
router.post("/register", async (req, res) => {
  try {
    let {  username, password } = req.body;
  // validate
    if (!username || !password )
      return res.status(400).json({ msg: "Not all fields have been entered." });
    const existingUser = await User.findOne({ username: username });
    if (existingUser)
      return res
            .status(400)
            .json({ msg: "An account with this username already exists." });
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      password: passwordHash,
      workouts: [],
      image: "",
      height: 0,
      weight: 0
    });

    const savedUser = await newUser.save();
    const frontEndUser = {
      token: "",
      user: savedUser
     }
    res.json(frontEndUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Login
router.post("/login", async (req, res) => {
try {
  const { username, password } = req.body;
  // validate
  if (!username || !password)
    return res.status(400).json({ msg: "Not all fields have been entered." });
  const user = await User.findOne({ username: username });
  if (!user)
    return res
          .status(400)
          .json({ msg: "No account with this email has been registered." });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });
  const token = jwt.sign({ id: user._id }, "" + process.env.JWT_SECRET);
  res.json({
      token: token,
      user: {
      id: user._id,
      username: user.username,
      workouts: user.workouts,
      image: user.image,
      height: user.height,
      weight: user.weight,
      },
  });
} catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Delete
router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Check if token is valid
router.post("/tokenIsValid", async (req, res) => {
  try {
  const token = req.header("x-auth-token");
  if (!token) return res.json(false);
  const verified = jwt.verify(token, "" + process.env.JWT_SECRET);
  if (!verified) return res.json(false);
  const user = await User.findById(verified.id);
  if (!user) return res.json(false);
  return res.json(true);
  } catch (err) {
  res.status(500).json({ error: err.message });
  }
});
//ADD TO WORKOUT ARRAY 
router.post("/:id/:token", (req,res) =>{
  User.findById(req.params.id, (err,foundUser)=>{
    if (err){
      console.log(err)
    }else{
      foundUser.workouts.push(req.body)
      foundUser.save((err, newUser)=>{
        res.json({
          token: req.params.token,
          user: {
          id: newUser._id,
          username: newUser.username,
          workouts: newUser.workouts,
          image: newUser.image,
          height: newUser.height,
          weight: newUser.weight,
          }
        })
      })
    }
  })
})

//REMOVE TO WORKOUT ARRAY 
router.delete("/:userid/:token/:index", (req,res) =>{
  console.log('im getting here')
  User.findById(req.params.userid, (err,foundUser)=>{
    if (err){
      console.log(err)
    }else{
      foundUser.workouts.splice(req.params.index, 1)
      foundUser.save((err, newUser)=>{
      res.json({
          token: req.params.token,
          user: {
          id: newUser._id,
          username: newUser.username,
          workouts: newUser.workouts,
          image: newUser.image,
          heigth: newUser.height,
          weight: newUser.weight,
          }
        })
      })
    }
  })
})
// EDIT WORKOUT  
router.put("/:userid/:token/:index", (req,res) =>{
  console.log('im getting here')
  User.findById(req.params.userid, (err,foundUser)=>{
    if (err){
      console.log(err)
    }else{
      foundUser.workouts[req.params.index] = req.body
      foundUser.save((err, newUser)=>{
      res.json({
          token: req.params.token,
          user: {
          id: newUser._id,
          username: newUser.username,
          workouts: newUser.workouts,
          image: newUser.image,
          heigth: newUser.height,
          weight: newUser.weight,
          }
        })
      })
    }
  })
})

// EDIT PROFILE  
router.put("/:userid/:token", (req,res) =>{
  console.log('im getting to the route')
  User.findById(req.params.userid, (err,foundUser)=>{
    if (err){
      console.log(err)
    }else{
      foundUser.image = req.body.image
      foundUser.height = req.body.height
      foundUser.weight = req.body.weight
      foundUser.save((err, newUser)=>{
      res.json({
          token: req.params.token,
          user: {
          id: newUser._id,
          username: newUser.username,
          workouts: newUser.workouts,
          image: newUser.image,
          height: newUser.height,
          weight: newUser.weight,
          }
        })
      })
    }
  })
})

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    username: user.username,
    id: user._id,
  });
});
module.exports = router;
