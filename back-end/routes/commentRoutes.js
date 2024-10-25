// https://www.freecodecamp.org/news/build-a-restful-api-using-node-express-and-mongodb/

const express = require('express');
const router = express.Router();
const CommentModel = require('../models/commentModel');
const VideoModel = require('../models/videoModel');

router.post('/createNewComment', async (req, res) => {
  try {
    const { videoId, userId, commentText } = req.body;
    const newComment = await CommentModel.create({
      videoId,
      userId,
      commentText,
    });

    // add comment to list of comments in video
    const video = await VideoModel.findByIdAndUpdate(videoId, {
      $addToSet: { comments: newComment._id },
      $inc: { commentsCount: 1 },
    });

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    res.status(201).json({ newComment, video });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/deleteComment/:id', async (req, res) => {
  try {
    const { videoId } = req.body;

    const video = await VideoModel.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    const comment = await CommentModel.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    await VideoModel.findByIdAndUpdate(videoId, {
      $pull: { comments: req.params.id },
      $inc: { commentsCount: -1 },
    });

    await CommentModel.findByIdAndDelete(req.params.id);

    res
      .status(200)
      .json({ message: 'Comment deleted successfully', comment, video });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch('/addLike/:id', async (req, res) => {
  try {
    const updatedComment = await CommentModel.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch('/removeLike/:id', async (req, res) => {
  try {
    const updatedComment = await CommentModel.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: -1 } },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
