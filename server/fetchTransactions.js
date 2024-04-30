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


const axios = require('axios');

async function fetchUsers() {
    try {
        const response = await axios.get('http://localhost:3000/users');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch users');
    }
}

async function getAllTokenTransferEvents(walletAddress) {
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
        console.error('Error in getAllTokenTransferEvents:', error.message);
        throw error;
    }
}

async function fetchAllTransactions() {
    try {
        const users = await fetchUsers();
        return Promise.all(users.map(user => getAllTokenTransferEvents(user.walletAddress)));
    } catch (error) {
        console.error('Error fetching transactions:', error.message);
        throw error;
    }
}

module.exports = { fetchAllTransactions };
