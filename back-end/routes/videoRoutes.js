// https://www.freecodecamp.org/news/build-a-restful-api-using-node-express-and-mongodb/

const express = require('express');
const router = express.Router();
const VideoModel = require('../models/videoModel');
const UserModel = require('../models/userModel');

// create a video then add it to list of videos user has
router.post('/postVideo', async (req, res) => {
  try {
    const { userId } = req.body; // userId of person posting the video
    const video = await VideoModel.create(req.body);
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { $push: { createdVideos: video._id } },
      { new: true }
    );
    res.status(200).json({ video, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// when clicking on video from profile
router.get('/getVideo/:id', async (req, res) => {
  try {
    const video = await VideoModel.findById(req.params.id);
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/getAllVideos', async (req, res) => {
  try {
    const data = await VideoModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// for lazy loading in home screen while scrolling
router.get('/getSixRandomVideos', async (req, res) => {
  try {
    const videos = await VideoModel.aggregate([{ $sample: { size: 6 } }]);
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch('/updateDescription/:id', async (req, res) => {
  try {
    const { description } = req.body;
    const video = await VideoModel.findByIdAndUpdate(
      req.params.id,
      { description },
      { new: true }
    );
    res.status(200).json(video);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch('/updatePrivacy/:id', async (req, res) => {
  try {
    const { privacy } = req.body;
    const video = await VideoModel.findByIdAndUpdate(
      req.params.id,
      { privacy },
      { new: true }
    );
    res.status(200).json(video);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch('/handleView/:id', async (req, res) => {
  try {
    const { viewerId } = req.body;

    const video = await VideoModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { views: viewerId },
        $inc: { viewsCount: 1 },
      },
      { new: true }
    );

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    res.status(200).json(video);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// like a video which adds it to viewer's liked videos list
// also increments the video's and creator's like counts
router.patch('/addLike/:id', async (req, res) => {
  try {
    const { viewerId } = req.body; // id of person doing the liking
    const { posterId } = req.body; // id of person who posted the video

    // add viewer to list of who liked the video, increment likes
    const video = await VideoModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likes: viewerId },
        $inc: { likesCount: 1 },
      },
      { new: true }
    );

    // add video to list of viewer's liked videos
    const viewer = await UserModel.findByIdAndUpdate(
      viewerId,
      {
        $addToSet: { likedVideos: video._id },
      },
      { new: true }
    );

    // increment poster's total like count
    const poster = await UserModel.findByIdAndUpdate(
      posterId,
      {
        $inc: { likesCount: 1 },
      },
      { new: true }
    );

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    res.status(200).json({ video, viewer, poster });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// unlike a video which removes video from viewer's list of liked videos
// also decrements the video's and creator's like counts
router.patch('/removeLike/:id', async (req, res) => {
  try {
    const { viewerId } = req.body; // id of person doing the liking
    const { posterId } = req.body; // id of person who posted the video

    // remove viewer from list of who liked the video, decrement likes
    const video = await VideoModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likes: viewerId },
        $inc: { likesCount: -1 },
      },
      { new: true }
    );

    // remove video from list of viewer's liked videos
    const viewer = await UserModel.findByIdAndUpdate(
      viewerId,
      {
        $pull: { likedVideos: video._id },
      },
      { new: true }
    );

    // decrement poster's total like count
    const poster = await UserModel.findByIdAndUpdate(
      posterId,
      {
        $inc: { likesCount: -1 },
      },
      { new: true }
    );

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    res.status(200).json({ video, viewer, poster });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// saves video which adds it to viewer's saved videos list
// also increments the video's save counts
router.patch('/addSave/:id', async (req, res) => {
  try {
    const { viewerId } = req.body;

    const video = await VideoModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { saves: viewerId },
        $inc: { savesCount: 1 },
      },
      { new: true }
    );

    const viewer = await UserModel.findByIdAndUpdate(
      viewerId,
      {
        $addToSet: { savedVideos: video._id },
      },
      { new: true }
    );

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    res.status(200).json({ video, viewer });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// unsaves video which removes it from viewer's saved videos list
// also decrements the video's save counts
router.patch('/removeSave/:id', async (req, res) => {
  try {
    const { viewerId } = req.body;

    const video = await VideoModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { saves: viewerId },
        $inc: { savesCount: -1 },
      },
      { new: true }
    );

    const viewer = await UserModel.findByIdAndUpdate(
      viewerId,
      {
        $pull: { savedVideos: video._id },
      },
      { new: true }
    );

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    res.status(200).json({ video, viewer });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch('/addComment/:id', async (req, res) => {
  try {
    const { commentId } = req.body;

    const video = await VideoModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { comments: commentId },
        $inc: { commentsCount: 1 },
      },
      { new: true }
    );

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    res.status(200).json(video);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch('/removeComment/:id', async (req, res) => {
  try {
    const { commentId } = req.body;

    const video = await VideoModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { comments: commentId },
        $inc: { commentsCount: -1 },
      },
      { new: true }
    );

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    res.status(200).json(video);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
