const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Card = require('../../models/Card');
const validateCardInput = require('../../validation/card')

// return all cards in a deck
router.get('/deck/:deck_id', (req, res) => {
  Card.find({ deck: req.params.deck_id })
    .sort({ date: -1 })
    .then(cards => res.json(cards))
    .catch(err => res.status(404).json({ nocardsfound: 'No cards found' }));
});

// return specific card
router.get('/:id', (req, res) => {
  Card.findById(req.params.id)
    .then(card => res.json(card))
    .catch(err =>
      res.status(404).json({ nocardfound: 'No card found with that ID' })
    );
});

//create new card for a deck
router.post('/deck/:deck_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCardInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newCard = new Card({
      deck: req.params.deck_id,
      front: req.body.front,
      back: req.body.back
    });

    newCard.save().then(card => res.json(card));
  }
);

//update card information
router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { errors, isValid } = validateCardInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const card = await Card.findOne({_id: req.params.id});
    if (req.body.front) card.front = req.body.front;
    if (req.body.back) card.back = req.body.back;
    card.reviewed = Date.now;
    if (req.body.count) card.count = req.body.count;

    card.save().then(card => res.json(card));
  }
);

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Card.deleteOne({ _id: req.params.id })
      .then(() => res.json({ deleted: "Card was deleted" }))
      .catch(err => res.status(404).json({ nocardfound: 'No card found with that ID' }))
  }
);

module.exports = router;