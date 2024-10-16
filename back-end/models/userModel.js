const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: 'hey',
  },
  bio: {
    type: String,
    default: ' ',
  },
  followersAmount: {
    type: Number,
    required: true,
    default: 0,
  },
  followingAmount: {
    type: Number,
    required: true,
    default: 0,
  },
  totalLikesAmount: {
    type: Number,
    required: true,
    default: 0,
  },
  likedVideos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
  createdVideos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
  savedVideos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
  followersList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  followingList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const User = mongoose.model('User', userSchema);
module.exports = User;
