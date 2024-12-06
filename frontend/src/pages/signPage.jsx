import React, { } from 'react';
import '../css/Auth.css';  // Import the CSS for styling
import useSignup from '../hooks/useSIgnup';

function Signup() {
  const{
            fldUsername,
            setFldUsername,
            fldPassword,
            setFldPassword,
            confirmPassword,
            setConfirmPassword,
            errorMessage,
            successMessage,
            handleSignup
  } = useSignup();
  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="name"
              placeholder="Enter your username"
              value={fldUsername}
              onChange={(e) => setFldUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={fldPassword}
              onChange={(e) => setFldPassword(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}

          <button type="submit" className="auth-button">Sign Up</button>
        </form>

        <p className="redirect-text">
          Already have an account? <a href="/">Log In</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
