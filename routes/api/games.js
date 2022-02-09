const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Deck = require('../../models/Deck');
const Game = require('../../models/Game');
const User = require('../../models/User');

const validateGameInput = require('../../validation/game')

// return specific game data
router.get('/find/:id', passport.authenticate('jwt', { session: false }),(req, res) => {
  Game.findById(req.params.id)
    .then(game => res.json(game))
    .catch(err =>
      res.status(404).json({ nogamefound: 'No game found with that ID' })
    );
});
// return pending games
router.get('/pending', passport.authenticate('jwt', { session: false }),(req, res) => {
  Game.find({ $and: 
    [{winner: {$exists: false}}, 
      { $or: [{ player1Id: req.user.id }, { player2Id: req.user.id }]}] 
    })
    .then(game => res.json(game))
    .catch(err =>
      res.status(404).json({ nogamefound: 'No pending games found' })
    );
});
// return complete games
router.get('/complete', passport.authenticate('jwt', { session: false }),(req, res) => {
  Game.find({ $and: 
    [{ winner: { $exists: true } }, 
      { $or: [{ player1Id: req.user.id }, { player2Id: req.user.id }] }] 
    })
    .then(game => res.json(game))
    .catch(err =>
      res.status(404).json({ nogamefound: 'No complete games found' })
    );
});

//create new game
router.post('/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const deck = await Deck.findById(req.body.deckId);
    const player2 = await User.findById(req.body.player2Id);
    if (!deck) return res.status(404).json({ invaliddeck: 'Invalid deck choice' });
    if (!player2) return res.status(404).json({ invaliduser: 'Invalid user choice' });

    const newGame = new Game({
      player1Id: req.user.id,
      player2Id: req.body.player2Id,
      deck: req.body.deckId
    });

    newGame.save().then(game => res.json(game));
  }
);

//update game information
router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const game = await Game.findOne({ _id: req.params.id });
    const player1 = await User.findOne({ _id: game.player1Id });
    if (req.body.playerCorrect === undefined || req.body.playerCorrect === undefined ) {
      return res.status(404).json({invaliddata: 'Missing data on round'})
    }

    if (player1.id === req.user.id) {
      game.player1Time = req.body.playerTime;
      game.player1Correct = req.body.playerCorrect;
    } else {
      game.player2Time = req.body.playerTime;
      game.player2Correct = req.body.playerCorrect;
    }

    if (game.player1Time && game.player2Time) {
      if ((game.player1Correct > game.player2Correct) || (game.player1Correct === game.player2Correct && game.player1Time < game.player2Time)) {
        game.winner = game.player1Id;
      } else {
        game.winner = game.player2Id;
      }
    }
    game.save().then(game => res.json(game));
  }
);

// delete specific game
// router.delete('/:id',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {
//     Game.deleteOne({ _id: req.params.id })
//       .then(() => res.json({ deleted: "Game was deleted" }))
//       .catch(err => res.status(404).json({ nogamefound: 'No game found with that ID' }))
//   }
// );

module.exports = router;