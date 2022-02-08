const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  Deck: {
    type: Schema.Types.ObjectId,
    ref: 'Deck'
  },
  front: {
    type: String,
    required: true
  },
  back: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  reviewed: {
    type: Date,
    default: Date.now
  },
  count: {
    type: Number,
    default: 0
  }
})

module.exports = Card = mongoose.model('Card', CardSchema);