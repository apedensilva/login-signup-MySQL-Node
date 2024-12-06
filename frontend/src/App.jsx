import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/loginPage';
import Signup from './pages/signPage';
import Dashboard from './pages/dashboardPage';
import { ToastContainer } from 'react-toastify'; 
import './App.css'; // Import global CSS for the app if you have one

function App() {
  return (
    <Router>
           <ToastContainer />
      <Routes>
        {/* Route for Login page (this will open first) */}
        <Route path="/" element={<Login />} />

        {/* Route for Signup page */}
        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={<Dashboard />} />


      </Routes>
      
    </Router>
  );
}

export default App;
