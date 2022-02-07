const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeckSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: [String],
    required: false
  },
  public: {
    type: boolean,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Deck = mongoose.model('deck', DeckSchema);