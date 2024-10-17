// https://www.freecodecamp.org/news/build-a-restful-api-using-node-express-and-mongodb/

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;

const videoRoutes = require('./routes/videoRoutes');
const userRoutes = require('./routes/userRoutes');
const commentRoutes = require('./routes/commentRoutes');

const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use('/video', videoRoutes);
app.use('/user', userRoutes);
app.use('/comment', commentRoutes);

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error);
});

database.once('connected', () => {
  console.log('Database Connected');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
