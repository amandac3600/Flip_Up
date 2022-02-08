const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Deck = require('../../models/Deck');
const User = require('../../models/User');
const Card = require('../../models/Card');

const validateDeckInput = require('../../validation/deck');

// returns all public decks
router.get('/', (req, res) => {
  Deck.find({public: true })
    .sort({ name: 1 })
    .then(decks => res.json(decks))
    .catch(err => res.status(404).json({ nodecksfound: 'No decks found' }));
});

// returns specific deck. allows only owner or if desk if public
router.get('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const deck = await Deck.findOne({ _id: req.params.id })
  if (!deck) return res.status(404).json({ nodecksfound: 'No decks found with that ID' });

  const deckUser = await User.findOne({ _id: deck.user })

  if (deckUser.id === req.user.id || deck.public) {
    const cards = await Card.find({deck: deck.id})
    return res.json({
      deck,
      cards: cards.map(card => card.id)
    });
  } else {
    return res.status(404).json({ nopermission: 'You do not have permission to view this deck' })
  }
});

// returns all decks created by specified user. only public unless creator
router.get('/user/:user_id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const decks = await Deck.find({ user: req.params.user_id });
  if (!decks) return res.status(404).json({ nodecksfound: 'No decks found from that user' });

  if (req.params.user_id === req.user.id) {
    return res.json(decks);
  } else {
    return res.json(decks.filter(deck => deck.public ))
  }
});

// creates deck for user
router.post('/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { errors, isValid } = validateDeckInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    const deck = await Deck.findOne({ name: req.body.name, user: req.user.id })

    if (deck) return res.status(400).json({ invalidname: 'Deck name already exists'});
    
    const newDeck = new Deck({
      user: req.user.id,
      name: req.body.name,
      // category: req.body.category.split(',').map(cat => cat.trim()),
      category: req.body.category,
      public: req.body.public
    });

    newDeck.save().then(deck => res.json(deck));
  }
);

// edit deck owned by user
router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { errors, isValid } = validateDeckInput(req.body);

    if (!isValid) return res.status(400).json(errors);

    const deck = await Deck.findOne({_id: req.params.id})

    if (deck) {

      const deckUser = await User.findOne({_id: deck.user})

      if (deckUser.id === req.user.id) {
        if (deck.name) {
          const checkDeckName = await Deck.findOne({ name: req.body.name })
          if (!checkDeckName) deck.name = req.body.name;
        }
        if (deck.category) deck.category = req.body.category;
        // if (deck.category) deck.category = req.body.category.split(',').map(cat => cat.trim()),

        deck.public = req.body.public;

        deck.save().then(deck => res.json(deck))
      } else {
        return res.status(404).json({ invaliduser: 'You do not own this deck' })
      }
    } else {
      return res.status(404).json({ nodecksfound: 'No decks found with that id' });
    }
  }
);

// delete deck if owned by logged in user
router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const deck = await Deck.findOne({ _id: req.params.id })

    if (deck) {
      const deckUser = await User.findOne({ _id: deck.user })

      if (deckUser.id === req.user.id) {
        Deck.deleteOne({ _id: req.params.id })
        .then(() => res.json({ deleted: "Deck was deleted" }))
        .catch(err => res.status(404).json({ nodeckfound: 'No deck found with that ID' }))
      } else {
        return res.status(404).json({ invaliduser: 'You do not own this deck' });
      }
      
    } else {
      return res.status(404).json({ nodeckfound: 'No deck found with that ID' })
    }
  }
);

module.exports = router;