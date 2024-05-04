import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setError(error);
      });
  }, []);

  return (
    <div>
      <h1>Users</h1>
      {error ? (
        <p>Failed to load users: {error.message}</p>
      ) : (
        <>
          <h2>Total Users: {users.length}</h2>
          <ul>
            {users.map(user => (
              <li key={user.phoneNumber}>{user.phoneNumber}</li> // Using phoneNumber as key
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Users;
