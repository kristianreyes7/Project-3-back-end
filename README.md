App Link: https://devmuscle.herokuapp.com/
Front-End: https://github.com/imdoug/workout-app-front-end/tree/dev
Workout App
- User should be able to create a profile. post('/user/new')
  - Pw are encrypted and salted with bcrypt
  - Users will be able to add:
    - username
    - pw
    - image
    - weight
    - height
    - workouts completed: ["workouts completed", "workout complete", "anotha one"]
- User should be able to log in and view profile. 
  - need a log in page get('/user')
  - profile page get('/user/:id')
  - delete page delete('/user/:id')
  - update page put('/user/:id')
- User should be able to create a workout post('/workout/new') will have to check if this route is okay
  - on new they will be able to input:
    - date
    - target [String]
    - exercise 
    - meal [String]
    - comments [String]
  - they should be able to update the info as needed put('/workout/:id')
  - they should be able to delete as needed delete('/workout/:id')
  - view specific workout get('/workout/:id')
