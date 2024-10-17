const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  videoId: {
    // where the comment is
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video',
    required: true,
  },
  userId: {
    // who commented
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // reference to the User schema
    required: true,
  },
  commentText: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
});

const Comment = new mongoose.model('Comment', commentSchema);
module.exports = Comment;
