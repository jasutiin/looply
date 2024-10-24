// https://www.freecodecamp.org/news/build-a-restful-api-using-node-express-and-mongodb/

const express = require('express');
const router = express.Router();
const CommentModel = require('../models/commentModel');
const VideoModel = require('../models/videoModel');

router.post('/createNewComment', async (req, res) => {
  try {
    const { videoId } = req.body;
    const newComment = await CommentModel.create(videoId);

    // add comment to list of comments in video
    const video = await VideoModel.findByIdAndUpdate(videoId, {
      $push: { comments: newComment._id },
      $inc: { commentsCount: 1 },
    });

    res.status(201).json({ newComment, video });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/deleteComment', async (req, res) => {
  try {
    const { commentId, videoId } = req.body;

    // remove comment from videos
    const video = await VideoModel.findByIdAndUpdate(videoId, {
      $pull: { comments: commentId },
      $inc: { commentsCount: -1 },
    });

    // deleting comment from database
    const comment = await CommentModel.findByIdAndDelete(commentId);

    res.status(201).json({ comment, video });
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
