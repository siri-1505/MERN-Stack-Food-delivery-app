import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LogoutPage = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8080/api/users/logout', {}, { withCredentials: true });
      navigate('/login');
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutPage;
