// https://www.freecodecamp.org/news/build-a-restful-api-using-node-express-and-mongodb/

const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  vidUrl: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model('Data', dataSchema);
