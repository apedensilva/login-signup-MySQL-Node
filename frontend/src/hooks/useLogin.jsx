import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { toast } from 'react-toastify';

const useLogin = () => {
  const [fldUsername, setFldUsername] = useState('');
  const [fldPassword, setFldPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = (e) => {
    e.preventDefault();

    // Send login request to the backend
    axios
      .post('http://192.168.1.29:5000/auth/login', { fldUsername, fldPassword })
      .then((response) => {
        console.log('Login successful:', response);

        // Save JWT token to localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', fldUsername);

        toast.success('Login Successful!');

        // Navigate to the dashboard after successful login
        navigate('/dashboard');
      })
      .catch((error) => {
        setErrorMessage('Invalid credentials');
        toast.error('Invalid Credentials. Please try again')
        console.error('Error during login:', error);

        // Clear error message after 5 seconds
        setTimeout(() => setErrorMessage(''), 5000);
      });
  };

  return {
    fldUsername,
    setFldUsername,
    fldPassword,
    setFldPassword,
    errorMessage,
    handleLogin,
  };
};

export default useLogin;
