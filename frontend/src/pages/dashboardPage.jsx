import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const Dashboard = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the username from localStorage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    // Clear the username and token from localStorage
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    navigate('/');
  };
  
  return (
    <div style={{ padding: '20px', backgroundColor: '#f4f6f9' }}>
      <h1 style={{ textAlign: 'center' }}>Welcome to Your Dashboard</h1>
      {username ? (
        <h2 style={{ textAlign: 'center' }}>
          Hello, {username}!
        </h2>
      ) : (
        <h2 style={{ textAlign: 'center' }}>
          Please log in to see your username.
        </h2>
      )}
        <button
        onClick={handleLogout}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        Logout
      </button>

    </div>

      
    
  );
};

export default Dashboard;
