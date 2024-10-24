// https://www.freecodecamp.org/news/build-a-restful-api-using-node-express-and-mongodb/

const express = require('express');
const router = express.Router();
const VideoModel = require('../models/videoModel');

// for posting a video
router.post('/postVideo', async (req, res) => {
  try {
    const dataToSave = await VideoModel.create(req.body);
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// when clicking on video from profile
router.get('/getVideo/:id', async (req, res) => {
  try {
    const data = await VideoModel.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// for lazy loading in home screen while scrolling
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
    const data = await VideoModel.aggregate([{ $sample: { size: 6 } }]);
    res.json(data);
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
    const { userId } = req.body;

    const video = await VideoModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { views: userId },
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

router.patch('/addLike/:id', async (req, res) => {
  try {
    const { userId } = req.body;

    const video = await VideoModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likes: userId },
        $inc: { likesCount: 1 },
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

router.patch('/removeLike/:id', async (req, res) => {
  try {
    const { userId } = req.body;

    const video = await VideoModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likes: userId },
        $inc: { likesCount: -1 },
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

router.patch('/addSave/:id', async (req, res) => {
  try {
    const { userId } = req.body;

    const video = await VideoModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { saves: userId },
        $inc: { savesCount: 1 },
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

router.patch('/removeSave/:id', async (req, res) => {
  try {
    const { userId } = req.body;

    const video = await VideoModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { saves: userId },
        $inc: { savesCount: -1 },
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
