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
  }
})

module.exports = Card = mongoose.model('Card', CardSchema);