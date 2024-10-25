// https://www.freecodecamp.org/news/build-a-restful-api-using-node-express-and-mongodb/

const express = require('express');
const router = express.Router();
const UserModel = require('../models/userModel');

router.post('/createNewUser', async (req, res) => {
  try {
    const dataToSave = UserModel.create(req.body);
    res.status(200).json(dataToSave);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/removeUser/:id', async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/getAllUsers', async (req, res) => {
  try {
    const data = await UserModel.find();
    return res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/getUser/:id', async (req, res) => {
  try {
    const data = await UserModel.findById(req.params.id);
    return res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch('/updateName/:id', async (req, res) => {
  try {
    const { name } = req.body;
    const user = await UserModel.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch('/updateUsername/:id', async (req, res) => {
  try {
    const { username } = req.body;
    const user = await UserModel.findByIdAndUpdate(
      req.params.id,
      { username },
      { new: true }
    );
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch('/updateEmail/:id', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findByIdAndUpdate(
      req.params.id,
      { email },
      { new: true }
    );
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch('/updatePassword/:id', async (req, res) => {
  try {
    const { password } = req.body;
    const user = await UserModel.findByIdAndUpdate(
      req.params.id,
      { password },
      { new: true }
    );
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch('/updateProfilePicture/:id', async (req, res) => {
  try {
    const { profilePicture } = req.body;
    const user = await UserModel.findByIdAndUpdate(
      req.params.id,
      { profilePicture },
      { new: true }
    );
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch('/updateBio/:id', async (req, res) => {
  try {
    const { bio } = req.body;
    const user = await UserModel.findByIdAndUpdate(
      req.params.id,
      { bio },
      { new: true }
    );
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// using id of the user being followed
router.patch('/followUser/:id', async (req, res) => {
  try {
    const { followerId } = req.body; // the user who is doing the following
    const followingId = req.params.id; // the user being followed

    const existingFollowing = await UserModel.findOne({
      _id: followerId,
      followingList: followingId,
    });

    if (existingFollowing) {
      return res
        .status(400)
        .json({ message: 'You are already following this user.' });
    }

    const followedUserUpdate = UserModel.findByIdAndUpdate(
      followingId,
      {
        $addToSet: { followersList: followerId },
        $inc: { followersAmount: 1 },
      },
      { new: true }
    );

    const followingUserUpdate = UserModel.findByIdAndUpdate(
      followerId,
      {
        $addToSet: { followingList: followingId },
        $inc: { followingAmount: 1 },
      },
      { new: true }
    );

    const [followedUser, followingUser] = await Promise.all([
      followedUserUpdate,
      followingUserUpdate,
    ]);

    if (!followedUser || !followingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ followedUser, followingUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// using id of the user being unfollowed
router.patch('/unfollowUser/:id', async (req, res) => {
  try {
    const { unfollowerId } = req.body; // the user who is unfollowing
    const unfollowedId = req.params.id; // the user being unfollowed

    const existingFollowing = await UserModel.findOne({
      _id: unfollowerId,
      followingList: unfollowedId,
    });

    if (!existingFollowing) {
      return res
        .status(400)
        .json({ message: 'You are not following this user.' });
    }

    const unfollowedUserUpdate = UserModel.findByIdAndUpdate(
      unfollowedId,
      {
        $pull: { followersList: unfollowerId },
        $inc: { followersAmount: -1 },
      },
      { new: true }
    );

    const unfollowerUserUpdate = UserModel.findByIdAndUpdate(
      unfollowerId,
      {
        $pull: { followingList: unfollowedId },
        $inc: { followingAmount: -1 },
      },
      { new: true }
    );

    const [unfollowedUser, unfollowerUser] = await Promise.all([
      unfollowedUserUpdate,
      unfollowerUserUpdate,
    ]);

    if (!unfollowedUser || !unfollowerUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ unfollowedUser, unfollowerUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
