import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateProfile = () => {
  const [fldFirstName, setFldFirstName] = useState('');
  const [fldLastName, setFldLastName] = useState('');
  const [fldAge, setFldAge] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

 
  useEffect(() => {
   
    const token = localStorage.getItem('token');

    if (token){
        axios
      .get('http://192.168.1.29:5000/api/user',{
        headers:{
            Authorization: `Bearer ${token}`
        }
      }) 
      .then((response) => {
        setFldFirstName(response.data.firstName);
        setFldLastName(response.data.lastName);
        setFldAge(response.data.age);
      })
      
      .catch((error) => {
        console.error('Error fetching user profile:', error);
        toast.error('Failed to load profile data');
      });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate input
    if (!fldFirstName || !fldLastName || !fldAge) {
      setErrorMessage('All fields are required');
      setLoading(false);
      return;
    }

    const token = localStorage.getItem('token');
    if(!token){
        setLoading(false);
        setErrorMessage('no token provided');
        return;
    }
    axios
      .patch('http://192.168.1.29:5000/api/updateprofile', {
        fldFirstName,
        fldLastName,
        fldAge,
      },{
        headers:{
            Authorization: `Bearer ${token}`
        }
      })

      .then((response) => {
        toast.success(response.data.message); // Show success toast
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
        setErrorMessage(error.response?.data?.message || 'Failed to update profile');
        setLoading(false);
        toast.error('Profile update failed');
      });
  };

  const handleFieldChange = (setter) => (e) => {
    setter(e.target.value);
    if (errorMessage) {
      setErrorMessage(''); // Clear error message when user starts typing
    }
  };

  return (
    <div>
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            value={fldFirstName}
            onChange={handleFieldChange(setFldFirstName)}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            value={fldLastName}
            onChange={handleFieldChange(setFldLastName)}
          />
        </div>
        <div>
          <label>Age</label>
          <input
            type="number"
            value={fldAge}
            onChange={handleFieldChange(setFldAge)}
          />
        </div>
        <div>
          <button type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </div>
        {errorMessage && <div className="error">{errorMessage}</div>}
      </form>
    </div>
  );
};

export default UpdateProfile;
