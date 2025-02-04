import React, { useState } from 'react';
import axios from 'axios';
import toastr from 'toastr';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'toastr/build/toastr.css';
import { Link, useNavigate } from 'react-router-dom';
import BACKEND_URL from '../component/BackendUrl';
import AppNavBar from '../component/AppNavBar';

const Login = () => {
  // State to hold the form values
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // API call for login
      const response = await axios.post(`${BACKEND_URL}/api/login/`, {
        username,
        password,
      });

      // Check if the response contains the token
      if (response.data && response.data.token) {
        // Save token to localStorage
        localStorage.setItem('authToken', response.data.token);

        // Display success message
        toastr.success('Login successful! Redirecting to home page.');

        // Redirect to home page
        navigate('/');
      } else {
        // Display error message if token is not in response
        toastr.error('Login failed. Please try again.');
      }
    } catch (error) {
      // Handle API errors
      if (error.response && error.response.data) {
        toastr.error(error.response.data.error || 'An error occurred during login.');
      } else {
        toastr.error('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (

    <>
    <AppNavBar/>


<div className="container">
  
  <header className="my-5 text-center">
    <h1>My Diary</h1>
  </header>

  <div className="row justify-content-center">
    <div className="col-md-6">
      <div className="card shadow-lg p-4 mb-5 bg-white rounded">
        <h4 className="card-title text-center mb-4">Login</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Submit</button>
        </form>
        <div className="text-center mt-3">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="text-primary">Register</Link>
          </p>
        </div>
      </div>
    </div>
  </div>

  {/* Footer Section */}
  <footer className="my-5 text-center">
    <p>&copy; 2025 Meshack | All rights reserved</p>
  </footer>
</div>
    
    
    
    </>
   
  );
};

export default Login;
