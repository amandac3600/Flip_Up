const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  player1Id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
    index: true
  },
  player2Id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
    index: true
  },
  player1Time: {
    type: Number,
  },
  player2Time: {
    type: Number,
  },
  player1Correct: {
    type: Number,
  },
  player2Correct: {
    type: Number,
  },
  winner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true
  },
  deck: {
    type: Schema.Types.ObjectId,
    ref: 'Deck',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  }

})

module.exports = User = mongoose.model('User', GameSchema);