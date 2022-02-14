const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeckSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  lowerName: {
    type: String,
    required: true,
  },
  category: {
    type: [String],
    required: false
  },
  public: {
    type: Boolean,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

DeckSchema.index({ name: 'text', category: 'text' });


module.exports = Deck = mongoose.model('Deck', DeckSchema);