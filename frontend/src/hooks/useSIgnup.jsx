import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useSignup = () => {
  const [fldUsername, setFldUsername] = useState('');
  const [fldPassword, setFldPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();

    // Reset error message before submitting
    setErrorMessage('');

    // Check if passwords match
    if (fldPassword !== confirmPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }

    // Send signup request to node backend
    axios
      .post('http://192.168.1.29:5000/api/add_user', { fldUsername, fldPassword })
      .then((response) => {
        console.log('Signup successful: ', response);
        
        // Clear form fields after successful signup
        setFldUsername('');
        setFldPassword('');
        setConfirmPassword('');

        // Show success toast message
        toast.success("Account Created");
      })
      .catch((error) => {
        console.error('Error during signup:', error);
        setErrorMessage('Error during signup');
        toast.error('Account taken, please try again');
      });
  };

  return {
    fldUsername,
    setFldUsername,
    fldPassword,
    setFldPassword,
    confirmPassword,
    setConfirmPassword,
    errorMessage,
    setErrorMessage,
    handleSignup,
  };
};

export default useSignup;
