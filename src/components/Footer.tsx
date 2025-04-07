
import React from 'react';
import { Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start">
            <Link to="/" className="flex items-center space-x-2">
              <Brain className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold text-primary">NeuroDetect</span>
            </Link>
          </div>
          <div className="mt-8 md:mt-0">
            <p className="text-center text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} NeuroDetect. All rights reserved.
            </p>
          </div>
          <div className="mt-8 md:mt-0 flex space-x-6 justify-center md:justify-end">
            <Link to="/" className="text-gray-500 hover:text-primary">
              Home
            </Link>
            <Link to="/about" className="text-gray-500 hover:text-primary">
              About
            </Link>
            <Link to="/prediction" className="text-gray-500 hover:text-primary">
              Prediction
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
