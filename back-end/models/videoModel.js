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
  views: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    default: [],
  },
  viewsAmount: {
    type: Number,
    default: 0,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    default: [],
  },
  likesAmount: {
    type: Number,
    default: 0,
  },
  commentsAmount: {
    // list of comments can be received by filtering by vid id in comments collection
    type: Number,
    default: 0,
  },
  saves: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Comment',
    default: [],
  },
  savesAmount: {
    type: Number,
    default: 0,
  },
});

const Video = mongoose.model('Video', videoSchema);
module.exports = Video;
