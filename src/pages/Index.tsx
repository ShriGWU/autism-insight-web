
import React from 'react';
import { Navigate } from 'react-router-dom';

// Redirect from the old Index page to the new Home page
const Index = () => {
  return <Navigate to="/" replace />;
};

export default Index;
