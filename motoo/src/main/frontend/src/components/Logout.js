import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get('/api/logout');
      navigate('/login');
    } catch (error) {
      console.error('Logout error', error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
