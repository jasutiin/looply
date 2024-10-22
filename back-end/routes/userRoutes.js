// https://www.freecodecamp.org/news/build-a-restful-api-using-node-express-and-mongodb/

const express = require('express');
const router = express.Router();
const UserModel = require('../models/userModel');

router.post('/createNewUser', async (req, res) => {
  try {
    const dataToSave = UserModel.create(req.body);
    res.status(200).json(dataToSave);
  } catch (err) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/getAllUsers', async (req, res) => {
  try {
    const data = await UserModel.find();
    return res.json(data);
  } catch (err) {}
});

module.exports = router;
