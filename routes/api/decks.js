const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Deck = require('../../models/Deck');
const Card = require('../../models/Card');

router.get('/', (req, res) => {
  Deck.find()
    .sort({ date: -1 })
    .then(tweets => res.json(tweets))
    .catch(err => res.status(404).json({ notweetsfound: 'No tweets found' }));
});
