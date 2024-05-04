// require('dotenv').config();

// const express = require('express');
// const mongoose = require('mongoose');
// const cron = require('node-cron');
// const { fetchAllTransactions } = require('./fetchTransactions'); // Make sure the path is correct
// const app = express();
// const port = 5000;

// // Schema definition
// const UserSchema = new mongoose.Schema({
//   phoneNumber: String,
//   walletAddress: String
// });

// // Model
// const User = mongoose.model('User', UserSchema);

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log('MongoDB connection error:', err));

// app.get('/users', async (req, res) => {
//   try {
//     const users = await User.find({});
//      res.json(users.map(user => ({
//        id: user._id,
//        phoneNumber: user.phoneNumber,
//        walletAddress: user.walletAddress
//      })));
    
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

// // for the arbscan to use to fetch specific  user transactions
// app.get('/wallets', async (req, res) => {
//   try {
//     const users = await User.find({});
//     // res.json(users.map(user => ({
//     //   id: user._id,
//     //   phoneNumber: user.phoneNumber,
//     //   walletAddress: user.walletAddress
//     // })));

//     res.json(users.map(user => ({
//       walletAddress: user.walletAddress
//     })));
    
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });



// app.get('/user/:id', async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (user) {
//       res.json({
//         phoneNumber: user.phoneNumber,
//         walletAddress: user.walletAddress
//       });
//     } else {
//       res.status(404).send('User not found');
//     }
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

// //fetching all the transactions
// app.get('/fetch-transactions', async (req, res) => {
//   try {
//     const transactions = await fetchAllTransactions();
//     res.json(transactions);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

// // Schedule the transaction fetch to run every hour
// cron.schedule('0 * * * *', () => {
//   console.log('Fetching transactions every hour');
//   fetchAllTransactions();
// });

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });


require('dotenv').config();
const cors = require('cors');

const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');
const { fetchAllTransactions } = require('./fetchTransactions'); // Ensure path is correct
const connectDB = require('./db'); // Ensure you have created this module
const Transaction = require('./models/Transaction');
const app = express();
const port = 5000;

// Enable CORS for all requests
app.use(cors());


// Schema definition
const UserSchema = new mongoose.Schema({
  phoneNumber: String,
  walletAddress: String
});

// Model
const User = mongoose.model('User', UserSchema);

// Connect to MongoDB
connectDB();

app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
     res.json(users.map(user => ({
       id: user._id,
       phoneNumber: user.phoneNumber,
       walletAddress: user.walletAddress
     })));
    
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// for the Arbiscan to use to fetch specific user transactions
app.get('/wallets', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users.map(user => ({
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
      res.status(404). send('User not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//fetching all the transactions
app.get('/fetch-transactions', async (req, res) => {
  try {
    const transactions = await fetchAllTransactions();
    res.json(transactions);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//API that fetches every transactions from mongo
app.get('/transactions', async (req, res) => {
  try {
      const transactions = await Transaction.find(); // Fetch all transactions
      res.json(transactions);
  } catch (error) {
      res.status(500).send(error.message);
  }
});


// Schedule the transaction fetch to run every hour
cron.schedule('0 * * * *', () => {
  console.log('Fetching transactions every hour');
  fetchAllTransactions();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

