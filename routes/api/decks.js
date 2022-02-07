const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Deck = require('../../models/Deck');
const validateDeckInput = require('../../validation/deck');

router.get('/', (req, res) => {
  Deck.find({public: true })
    .sort({ name: 1 })
    .then(decks => res.json(decks))
    .catch(err => res.status(404).json({ nodecksfound: 'No decks found' }));
});

router.get('/:id', (req, res) => {
  Deck.findById(req.params.id)
    .then(deck => res.json(deck))
    .catch(err =>
      res.status(404).json({ nodeckfound: 'No deck found with that ID' })
    );
});

router.get('/user/:user_id', (req, res) => {
  Deck.find({ user: req.params.user_id })
    .then(decks => res.json(decks))
    .catch(err =>
      res.status(404).json({ nodecksfound: 'No decks found from that user' }
      )
    );
});

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
      category: req.body.category.split(','),
      public: req.body.public
    });

    newDeck.save().then(deck => res.json(deck));
  }
);

router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateDeckInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const deck = Deck.findById(req.params.id);
    deck.update({
      name: req.body.name,
      category: req.body.category.split(','),
      public: req.body.public
    }).then(deck => res.json(deck));
  }
);

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Deck.deleteOne({ _id: req.params.id })
      .then(() => res.json({ deckDeleted: "Deck was deleted"}))
      .catch(err => res.status(404).json({ nodeckfound: 'No deck found with that ID' }))
  }
);

module.exports = router;