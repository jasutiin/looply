// https://www.freecodecamp.org/news/build-a-restful-api-using-node-express-and-mongodb/

const express = require('express');
const router = express.Router();
const VideoModel = require('../models/videoModel');

//Post Method
router.post('/post', async (req, res) => {
  try {
    const dataToSave = await VideoModel.create(req.body);
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get all Method
router.get('/getAll', async (req, res) => {
  try {
    const data = await VideoModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
  try {
    const data = await VideoModel.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get random Method
router.get('/getRandom', async (req, res) => {
  try {
    const data = await VideoModel.aggregate([{ $sample: { size: 1 } }]);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/getRandomSix', async (req, res) => {
  try {
    const data = await VideoModel.aggregate([{ $sample: { size: 6 } }]);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update by ID Method
router.patch('/update/:id', (req, res) => {
  res.send('Update by ID API');
});

//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
  res.send('Delete by ID API');
});

module.exports = router;
