import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  // Check if the auth token exists in localStorage
  const authToken = localStorage.getItem('authToken');

  // If the token doesn't exist, redirect to the login page
  return authToken ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
