const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routers/authRouter');
const postRouter = require('./routers/postRouter');
require('dotenv').config();

const PORT = 5000;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_URL = `mongodb+srv://rss-feed:${DB_PASSWORD}@cluster0.rqdzcnq.mongodb.net/rss-feed?retryWrites=true&w=majority`;

const app = express();

app.use(express.json());
app.use("/auth", authRouter);
app.use('/', postRouter);

const start = async () => {
  try {
    await mongoose.connect(DB_URL);
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
      console.log(e);
  }
}

start();