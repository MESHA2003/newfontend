import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import BACKEND_URL from '../component/BackendUrl';
import AppNavBar from '../component/AppNavBar';

const Register = () => {
  // State to hold the form values
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  // Configure Toastr options
  toastr.options = {
    closeButton: true,
    progressBar: true,
    positionClass: 'toast-top-right',
    timeOut: '5000',
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toastr.error("Passwords do not match!", "Error");
      return;
    }

    try {
      // Make API call to register the user
      const response = await axios.post(`${BACKEND_URL}/api/register/`, {
        username,
        email,
        first_name,
        last_name,
        password,
        confirm_password: confirmPassword,
      });

      // Show success message and navigate to the home page
      toastr.success(response.data.message, "Success");
      navigate('/login');
    } catch (error) {
      // Show error message from the server
      if (error.response && error.response.data.error) {
        toastr.error(error.response.data.error, "Error");
      } else {
        toastr.error("An unexpected error occurred. Please try again.", "Error");
      }
    }
  };

  return (


    <>
      <AppNavBar />
      <div className="container">
        <header className="my-5 text-center">
          <h1>My Diary</h1>
        </header>

        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg p-4 mb-5 bg-white rounded">
              <h4 className="card-title text-center mb-4">Register</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Enter your username"
                    value={username}
                    required
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="first_name" className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="first_name"
                    placeholder="Enter your first name"
                    value={first_name}
                    required
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="last_name" className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="last_name"
                    placeholder="Enter your last name"
                    value={last_name}
                    required
                    onChange={(e) => setLastName(e.target.value)}
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
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirm-password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Register</button>
              </form>
              <div className="text-center mt-3">
                <p>
                  Already have an account?{' '}
                  <Link to="/" className="text-primary">Log in</Link>
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

export default Register;
