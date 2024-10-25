// https://www.freecodecamp.org/news/build-a-restful-api-using-node-express-and-mongodb/

const express = require('express');
const router = express.Router();
const VideoModel = require('../models/videoModel');
const UserModel = require('../models/userModel');

// create a video then add it to list of videos user has
router.post('/postVideo', async (req, res) => {
  try {
    const { videoOwner } = req.body; // id of person posting the video
    const video = await VideoModel.create(req.body);
    const user = await UserModel.findByIdAndUpdate(
      videoOwner,
      { $addToSet: { createdVideos: video._id } },
      { new: true }
    );
    res.status(200).json({ video, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// delete video then remove it from list of videos user has
router.delete('/deleteVideo/:id', async (req, res) => {
  try {
    const videoId = req.params.id;
    const video = await VideoModel.findById(videoId);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    const videoOwner = video.videoOwner;

    const user = await UserModel.findByIdAndUpdate(
      videoOwner,
      { $pull: { createdVideos: videoId } },
      { new: true }
    );

    await VideoModel.findByIdAndDelete(videoId);

    res
      .status(200)
      .json({ message: 'Video deleted successfully', video, user });
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

// handle viewing a video which adds the viewer to the list of viewers and increments the view count
router.patch('/handleView/:id', async (req, res) => {
  try {
    const { viewerId } = req.body;

    const video = await VideoModel.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    if (video.views.includes(viewerId)) {
      return res
        .status(400)
        .json({ message: 'You have already viewed this video.' });
    }

    const updatedVideo = await VideoModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { views: viewerId },
        $inc: { viewsCount: 1 },
      },
      { new: true }
    );

    res.status(200).json(updatedVideo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// like a video which adds it to viewer's liked videos list
// also increments the video's and creator's like counts
router.patch('/addLike/:id', async (req, res) => {
  try {
    const { viewerId } = req.body; // id of person doing the liking
    const video = await VideoModel.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    if (video.likes.includes(viewerId)) {
      return res
        .status(400)
        .json({ message: 'You have already liked this video.' });
    }

    await VideoModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likes: viewerId },
        $inc: { likesCount: 1 },
      },
      { new: true }
    );

    const videoOwner = video.videoOwner;
    const viewer = await UserModel.findById(viewerId);

    if (!viewer) {
      return res.status(404).json({ message: 'Viewer not found' });
    }

    if (viewer.likedVideos.includes(video._id)) {
      return res
        .status(400)
        .json({ message: 'Video is already in your liked videos.' });
    }

    await UserModel.findByIdAndUpdate(
      viewerId,
      {
        $addToSet: { likedVideos: video._id },
      },
      { new: true }
    );

    await UserModel.findByIdAndUpdate(
      videoOwner,
      {
        $inc: { likesCount: 1 },
      },
      { new: true }
    );

    res.status(200).json({ message: 'Video liked successfully.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// unlike a video which removes video from viewer's list of liked videos
// also decrements the video's and creator's like counts
router.patch('/removeLike/:id', async (req, res) => {
  try {
    const { viewerId } = req.body; // id of person doing the unliking
    const video = await VideoModel.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    if (!video.likes.includes(viewerId)) {
      return res
        .status(400)
        .json({ message: 'You have not liked this video yet.' });
    }

    await VideoModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likes: viewerId },
        $inc: { likesCount: -1 },
      },
      { new: true }
    );

    const videoOwner = video.videoOwner;
    await UserModel.findByIdAndUpdate(
      viewerId,
      {
        $pull: { likedVideos: video._id },
      },
      { new: true }
    );

    await UserModel.findByIdAndUpdate(
      videoOwner,
      {
        $inc: { likesCount: -1 },
      },
      { new: true }
    );

    res.status(200).json({ message: 'Video unliked successfully.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// saves video which adds it to viewer's saved videos list
// also increments the video's save counts
router.patch('/addSave/:id', async (req, res) => {
  try {
    const { viewerId } = req.body;
    const video = await VideoModel.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    if (video.saves.includes(viewerId)) {
      return res
        .status(400)
        .json({ message: 'You have already saved this video.' });
    }

    await VideoModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { saves: viewerId },
        $inc: { savesCount: 1 },
      },
      { new: true }
    );

    const viewer = await UserModel.findById(viewerId);

    if (!viewer) {
      return res.status(404).json({ message: 'Viewer not found' });
    }

    if (viewer.savedVideos.includes(video._id)) {
      return res
        .status(400)
        .json({ message: 'Video is already in your saved videos.' });
    }

    await UserModel.findByIdAndUpdate(
      viewerId,
      {
        $addToSet: { savedVideos: video._id },
      },
      { new: true }
    );

    res
      .status(200)
      .json({ message: 'Video saved successfully.', video, viewer });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// unsaves video which removes it from viewer's saved videos list
// also decrements the video's save counts
router.patch('/removeSave/:id', async (req, res) => {
  try {
    const { viewerId } = req.body;
    const video = await VideoModel.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    if (!video.saves.includes(viewerId)) {
      return res
        .status(400)
        .json({ message: 'You have not saved this video yet.' });
    }

    await VideoModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { saves: viewerId },
        $inc: { savesCount: -1 },
      },
      { new: true }
    );

    await UserModel.findByIdAndUpdate(
      viewerId,
      {
        $pull: { savedVideos: video._id },
      },
      { new: true }
    );

    res.status(200).json({ message: 'Video unsaved successfully.', video });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
