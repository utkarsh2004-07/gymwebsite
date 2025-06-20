import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import the library to handle cookies

const ProtectedRoute = () => {
  // Check if token exists in cookies
  const token = Cookies.get('token'); // Retrieve the token from the cookie

  // console.log('Token from cookie:', token); // Debug: Print token to console

  if (!token) {
    // If no token found, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If token exists, allow access to the route
  return <Outlet />;
};

export default ProtectedRoute;
