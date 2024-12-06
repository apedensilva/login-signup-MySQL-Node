// src/pages/dashboardPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  // Fetch user data after login using the stored token
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/'); // Redirect to login page if no token is found
    } else {
      fetch('http://localhost:5000/api/user', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUserData(data); // Store user data in state
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [navigate]);

  return (
    <div className="dashboard-container">
      <h1>Welcome to Your Dashboard</h1>

      {userData ? (
        <div className="user-info">
          <h2>User Info</h2>
          <p><strong>Username:</strong> {userData.fldUsername}</p>
          <p><strong>Email:</strong> {userData.fldUsername}</p>
          <p><strong>Full Name:</strong> {userData.fldUsername}</p>
          
          <div className="dashboard-actions">
            <button onClick={() => navigate('/profile')}>Go to Profile</button>
            <button onClick={() => navigate('/settings')}>Go to Settings</button>
            <button onClick={() => {
              localStorage.removeItem('token');
              navigate('/'); // Redirect to login page after logout
            }}>
              Logout
            </button>
          </div>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Dashboard;
