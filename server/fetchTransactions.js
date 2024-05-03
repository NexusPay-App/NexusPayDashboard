// async function fetchModule() {
//     const { default: fetch } = await import('node-fetch');
    
//     // Rest of your functions using fetch
  
//     async function fetchUsers() {
//         const response = await fetch('http://localhost:3000/users');
//         const users = await response.json();
//         return users;
//     }
  
//     async function getAllTokenTransferEvents(walletAddress) {
//         const baseURL = 'https://api.arbiscan.io/api';
//         const apiKey = '7IV4NMZ3RHDJCY7A748JSAK4GM1KWKRB8X';
//         const url = `${baseURL}?module=account&action=tokentx&address=${walletAddress}&page=1&offset=5&sort=desc&apikey=${apiKey}`;
  
//         try {
//             const response = await fetch(url);
//             if (!response.ok) {
//                 throw new Error('Failed to fetch data from API');
//             }
//             const data = await response.json();
//             if (data.status !== '1') {
//                 throw new Error(data.message);
//             }
//             return data.result;
//         } catch (error) {
//             console.error('Error in getAllTokenTransferEvents:', error);
//             throw error;
//         }
//     }
  
//     async function fetchAllTransactions() {
//         try {
//             const users = await fetchUsers();
//             const transactions = await Promise.all(users.map(user => getAllTokenTransferEvents(user.walletAddress)));
//             console.log(transactions);
//         } catch (error) {
//             console.error('Error fetching transactions:', error);
//         }
//     }
  
//     // Export fetchAllTransactions function at the end
//     return { fetchAllTransactions };
//   }
  
//   fetchModule().then(({ fetchAllTransactions }) => {
//     // Use fetchAllTransactions here or export it
//   });


//333333333333333333333333333333333333333333333333333333333333333333333
// const axios = require('axios');

// async function fetchUsers() {
//     try {
//         const response = await axios.get('http://localhost:5000/wallets');
//         console.log(response.data)
//         return response.data;
//     } catch (error) {
//         throw new Error('Failed to fetch users');
//     }
// }

// async function getAllTokenTransferEvents() {
//     const walletAddress = "0x362b42a06f06e6c4ded0e4b8a4ede27c8e226d5f"
//     const anotherwallet = '0x6a0a689b7a710a333341bb4b60c83246bd093c26'
//     const baseURL = 'https://api.arbiscan.io/api';
//     const apiKey = '7IV4NMZ3RHDJCY7A748JSAK4GM1KWKRB8X';
//     const url = `${baseURL}?module=account&action=tokentx&address=${walletAddress, anotherwallet}&page=1&offset=5&sort=desc&apikey=${apiKey}`;
//     try {
//         const response = await axios.get(url);
//         if (response.data.status !== '1') {
//             throw new Error(response.data.message);
//         }
//         return response.data.result;
//     } catch (error) {
//         console.error('Error in getAllTokenTransferEvents:', error.message);
//         throw error;
//     }
// }

// async function fetchAllTransactions() {
//     try {
//         const users = await fetchUsers();
//         // return Promise.all(users.map(user => getAllTokenTransferEvents(user.walletAddress)));
//         return getAllTokenTransferEvents();

//     } catch (error) {
//         console.error('Error fetching transactions:', error.message);
//         throw error;
//     }
// }

// module.exports = { fetchAllTransactions };
//333333333333333333333333333333333333333333333333333333333333333333333


const axios = require('axios');
const mongoose = require('mongoose');
const Transaction = require('./models/Transaction'); // Assuming you have a Transaction model

mongoose.connect(process.env.MONGO_URI);

async function fetchUsers() {
    try {
        const response = await axios.get('http://localhost:5000/wallets');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch users');
    }
}

async function getTokenTransferEvents(walletAddress) {
    const baseURL = 'https://api.arbiscan.io/api';
    const apiKey = '7IV4NMZ3RHDJCY7A748JSAK4GM1KWKRB8X';
    const url = `${baseURL}?module=account&action=tokentx&address=${walletAddress}&page=1&offset=5&sort=desc&apikey=${apiKey}`;
    try {
        const response = await axios.get(url);
        if (response.data.status !== '1') {
            throw new Error(response.data.message);
        }
        return response.data.result;
    } catch (error) {
        console.error('Error fetching transactions for address:', walletAddress, error.message);
        throw error;
    }
}

async function fetchAllTransactions() {
    const users = await fetchUsers();
    for (let i = 0; i < users.length; i += 5) {
        const userSlice = users.slice(i, i + 5);
        const transactionPromises = userSlice.map(user => getTokenTransferEvents(user.walletAddress));
        const transactionResults = await Promise.all(transactionPromises);
        // Store in MongoDB
        transactionResults.forEach(transactions => {
            transactions.forEach(async transaction => {
                const newTransaction = new Transaction(transaction);
                await newTransaction.save();
            });
        });
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds before the next batch
    }
}

module.exports = { fetchAllTransactions };
