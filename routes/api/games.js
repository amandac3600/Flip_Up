const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Game = require('../../models/Game');
const validateGameInput = require('../../validation/game')

// return specific game data
router.get('/:id', passport.authenticate('jwt', { session: false }),(req, res) => {
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
      res.status(404).json({ nogamefound: 'No game found with that ID' })
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
      res.status(404).json({ nogamefound: 'No game found with that ID' })
    );
});

//create new game
router.post('/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {

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
    if (req.body.playerCorrect === undefined || req.body.playerCorrect === undefined ) {
      return res.status(404).json({invaliddata: 'Missing data on round'})
    }
    if (game.player1Id === req.user.id) {
      game.player1Time = req.body.playerTime;
      game.player1Correct = req.body.playerCorrect;
    } else {
      game.player2Time = req.body.playerTime;
      game.player2Correct = req.body.playerCorrect;
    }

    if (game.player1Time && game.player2Time) {
      if ((game.player1Correct > game.player2Correct) || (game.player1Correct === game.player2Correct && game.player1Time > game.player2Time)) {
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