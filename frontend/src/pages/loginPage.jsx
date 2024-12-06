// src/components/Login.js
import React from 'react';
import useLogin from '../hooks/useLogin';  // Import the custom hook
import '../css/Auth.css';  // Import the CSS for styling

function Login() {
  const {
    fldUsername,
    setFldUsername,
    fldPassword,
    setFldPassword,
    errorMessage,
    handleLogin,
  } = useLogin();  //hooks

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your Username"
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

          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="auth-button">Login</button>
        </form>

        <p className="redirect-text">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
