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
    date: {
      type: Date,
      default: Date.now
    }
  })
UserSchema.index({ username: 'text'});

module.exports = User = mongoose.model('User', UserSchema);