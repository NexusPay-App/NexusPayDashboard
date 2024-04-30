require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Schema definition
const UserSchema = new mongoose.Schema({
  phoneNumber: String,
  walletAddress: String
});

// Model
const User = mongoose.model('User', UserSchema);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users.map(user => ({
      phoneNumber: user.phoneNumber,
      walletAddress: user.walletAddress
    })));
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json({
        phoneNumber: user.phoneNumber,
        walletAddress: user.walletAddress
      });
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
