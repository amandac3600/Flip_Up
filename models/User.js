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
    points: {
      type: Number,
      default: 0
    },
    friendIds: {
      type: [Schema.Types.ObjectId],
      ref: 'User'
    },
    pendingRequests: {
      type: [Schema.Types.ObjectId],
      ref: 'User'
    },
    outgoingRequests: {
      type: [Schema.Types.ObjectId],
      ref: 'User'
    },
    wins: {
      type: [Schema.Types.ObjectId],
      ref: 'User'
    },
    losses: {
      type: [Schema.Types.ObjectId],
      ref: 'User'
    },
    icon: {
      type: String,
      required: true,
      default: '128044'
    },
    date: {
      type: Date,
      default: Date.now
    }

  })
UserSchema.index({ username: 'text'});

module.exports = User = mongoose.model('User', UserSchema);