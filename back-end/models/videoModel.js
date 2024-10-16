const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  vidUrl: {
    type: String,
    required: true,
  },
  videoOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  description: {
    type: String,
    default: ' ',
  },
  privacy: {
    type: String,
    enum: ['public', 'private'],
    default: 'public',
  },
  viewAmount: {
    type: Number,
    required: true,
    default: 0,
  },
  likesAmount: {
    type: Number,
    required: true,
    default: 0,
  },
  commentsAmount: {
    type: Number,
    required: true,
    default: 0,
  },
  savesAmount: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Video = mongoose.model('Video', videoSchema);
module.exports = Video;
