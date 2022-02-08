const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const Deck = require('../../models/Deck');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

//get all users registered for serach bar
router.get("/", (req, res) => {
  User.find()
    .sort({username: 1})
    .then(users => res.json(users))
    .catch(err => res.status(404).json({nousers: 'No users found'}))
});

//return data of user logged in
router.get('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
  const decks = await Deck.find({user: req.user.id});
  return (
    res.json({
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
      deck: decks.map(deck => deck.id)
    })
  )
})

//return data of current user. for testing only
router.get('/current', passport.authenticate('jwt', {session: false}), async (req, res) => {
  const decks = await Deck.find({user: req.user.id});
  return (
    res.json({
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
      deck: decks.map(deck => deck.id)
    })
  )
})

//registers new user
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

    // Check to make sure nobody has already registered with a duplicate email
    User.findOne({ email: req.body.email })
    .then(user => {
        if (user) {
            return res.status(400).json({email: "A user has already registered with this address"})
        } else {
            User.findOne({ username: req.body.username })
            .then(user => {
                if (user) {
                    return res.status(400).json({username: "A user has already registered with this username"})
                } else {
                    const newUser = new User({
                        username: req.body.username,
                        email: req.body.email,
                        password: req.body.password
                    })

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                        })
                    })
                }
            })
        }
    })
  })

  //login new users
  router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);


    if (!isValid) return res.status(400).json(errors);

    const email = req.body.email;
    const password = req.body.password;
  
    User.findOne({email})
      .then(user => {
        if (!user) {
          return res.status(404).json({email: 'This user does not exist'});
        }
        
        
        bcrypt.compare(password, user.password)
        .then(async (isMatch) => {
            if (isMatch) {
              const decks = await Deck.find({ user: user.id });
              const payload = { id: user.id, username: user.username, decks: decks.map(deck => deck.id)};
            jwt.sign(
                payload,
                keys.secretOrKey,
                {expiresIn: 8640000000},
                (err, token) => {
                res.json({
                    success: true,
                    token: 'Bearer ' + token
                });
              });
            } else {
                return res.status(400).json({password: 'Incorrect password'});
            }
        })
      })
  })

// router.patch('/', passport.authenticate('jwt', { session: false }), (req, res) => {
//   const { errors, isValid } = validateRegisterInput(req.body);

//   if (!isValid) {
//     return res.status(400).json(errors);
//   }

//   const email = req.body.email;
//   const password = req.body.password;
//   const username = req.body.username;
//   const takenUsername = User.findOne({username: username});
//   if (takenUsername) return res.status(404).json({ nouser: 'Username already taken.' })

//   User.findOne({ _id: req.user.id })
//     .then( user => {

//       user.email = req.body.email;
//       user.username = req.body.username;
//       user.save().then(user => res.json(user));
//     })
//     .catch(err => res.status(404).json({ nouser: 'Unable to find user' }))
// })

module.exports = router;