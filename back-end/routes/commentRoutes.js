// https://www.freecodecamp.org/news/build-a-restful-api-using-node-express-and-mongodb/

const express = require('express');
const router = express.Router();
const CommentModel = require('../models/commentModel');

router.post('/createNewComment', async (req, res) => {
  try {
    const newComment = await CommentModel.create(req.body);
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/deleteComment/:id', async (req, res) => {
  try {
    const comment = await CommentModel.findByIdAndDelete(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
