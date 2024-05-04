import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/transactions')
      .then(response => {
        setTransactions(response.data);
      })
      .catch(error => {
        console.error('Error fetching transactions:', error);
        setError(error);
      });
  }, []);

  return (
    <div>
      <h1>Transactions</h1>
      {error ? (
        <p>Failed to load transactions: {error.message}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>From Address</th>
              <th>To Address</th>
              <th>Token Name</th>
              <th>Amount Sent</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.from}</td>
                <td>{transaction.to}</td>
                <td>{transaction.tokenName}</td>
                <td>{transaction.value}</td> {/* Assuming 'value' is in the smallest unit of the token, you may want to format it */}
                <td>{new Date(parseInt(transaction.timeStamp) * 1000).toLocaleString()}</td> {/* Converts timestamp to local time string */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Transactions;
