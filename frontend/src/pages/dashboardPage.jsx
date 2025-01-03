import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const Dashboard = () => {
  const [username, setUsername] = useState('');
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    // Fetch the username from localStorage
    const storedUsername = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    if (storedUsername) {
      setUsername(storedUsername);
    }
    if(token){
      fetchUserFirstName(token);
      fetchUserLastName(token);
    }

  }, []);

const fetchUserFirstName = async (token) => {
    try {
      const response = await axios.get('http://192.168.1.29:5000/api/user', {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token for authentication
        },
      });

      console.log('Response from backend:', response.data);

      if (response.data.FirstName) {
        setfirstName(response.data.FirstName); // Set first name if available
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

const fetchUserLastName = async (token) =>{
  try {
    const response = await axios.get('http://192.168.1.29:5000/api/user',{
      headers:{
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Response from backend: ', response.data);

    if(response.data.LastName){
      setlastName(response.data.LastName);
    }

  } catch (error) {
    console.error('Error fetching user last name: ', error)
  }
}


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
      <div>  <h2 style={{ textAlign: 'center' }}>
          Hello, {username}!
        </h2>
        <h3 style={{ textAlign: 'center' }}>
        {firstName ? `Your first name: ${firstName} and your last name: ${lastName}` : 'No first name available'}
      </h3>
      </div>
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
