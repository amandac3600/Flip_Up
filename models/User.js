const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    deck_ids: {
      type: Array,
      default: []
    },
    friend_ids: {
      type: Array,
      default: []
    },
    friend_requests: {
      type: Array,
      default: []
    },
    friends_requested: {
      type: Array,
      default: []
    },
    wins: {
      type: Array,
      default: []
    },
    loses: {
      type: Array,
      default: []
    },
    points: {
      type: Integer,
      default: 0
    },
    date: {
      type: Date,
      default: Date.now
    }

  })

module.exports = User = mongoose.model('User', UserSchema);