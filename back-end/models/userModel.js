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
    default: 0,
  },
  followingAmount: {
    type: Number,
    default: 0,
  },
  totalLikesAmount: {
    type: Number,
    default: 0,
  },
  likedVideos: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Video',
    default: [],
  },
  createdVideos: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Video',
    default: [],
  },
  savedVideos: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Video',
    default: [],
  },
  followersList: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    default: [],
  },
  followingList: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    default: [],
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
