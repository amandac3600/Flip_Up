const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Deck = require('../../models/Deck');
const validateDeckInput = require('../../validation/deck');

// returns all public decks
router.get('/', (req, res) => {
  Deck.find({public: true })
    .sort({ name: 1 })
    .then(decks => res.json(decks))
    .catch(err => res.status(404).json({ nodecksfound: 'No decks found' }));
});

// returns specific deck
router.get('/:id', (req, res) => {
  Deck.findOne({ _id: req.params.id})
    .then(deck => res.json(deck))
    .catch(err =>
      res.status(404).json({ nodeckfound: 'No deck found with that ID' })
    );
});

// returns all decks created by user
router.get('/user/:user_id', (req, res) => {
  Deck.find({ user: req.params.user_id })
    .then(decks => res.json(decks))
    .catch(err =>
      res.status(404).json({ nodecksfound: 'No decks found from that user' }
      )
    );
});

// creates deck for user
router.post('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateDeckInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newDeck = new Deck({
      user: req.user.id,
      name: req.body.name,
      category: req.body.category.split(',').map(cat => cat.trim()),
      public: req.body.public
    });

    newDeck.save().then(deck => res.json(deck));
  }
);

// edit deck owned by user
router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateDeckInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Deck.findOne({_id: req.params.id})
      .then ( deck => {
        const userDeck = deck.findOne({user: req.user.id});
        console.log ('ud', userDeck);
        console.log('id1', deck.findOne({ user: 1}));
        deck.name = req.body.name;
        deck.category = req.body.category.split(',').map(cat => cat.trim());
        deck.public = req.body.public;

        deck.save().then(deck => res.json(deck))
      })
      .catch(err => res.status(404).json({ nodecksfound: 'No decks found from that user'}))

    // console.log('req', req.user)
    // console.log('user', req.user.id)
    // console.log('deck', deck.user.id)
    // console.log('deck', req.user.id !== deck.user.id)

    // if (req.user.id !== deck.user) {
    //   return res.status(400).json({invaliduser: 'This deck does not belong to you'});
    // }
   
  
  }
);

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Deck.deleteOne({ _id: req.params.id })
      .then(() => res.json({ deleted: "Deck was deleted"}))
      .catch(err => res.status(404).json({ nodeckfound: 'No deck found with that ID' }))
  }
);

module.exports = router;