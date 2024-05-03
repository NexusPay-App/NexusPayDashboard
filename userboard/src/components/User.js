import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const User = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetch(`/user/${id}`)
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.error('Error fetching user details:', error));
  }, [id]);

  return (
    <div>
      <h1>User Details</h1>
      <p>Phone Number: {user.phoneNumber}</p>
      <p>Wallet Address: {user.walletAddress}</p>
    </div>
  );
};

export default User;
