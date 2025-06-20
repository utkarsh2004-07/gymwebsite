import React from 'react';
import { Link } from 'react-router-dom';
// import './Footer.css'; // If you have custom styles, import here

const Footer = () => {
  return (
    <footer className="bg-secondary py-8">
      <div className="container mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-4 px-4">
        {/* Footer Logo and Description */}
        <div className="flex flex-col mb-8">
          <div className="flex items-center mb-6">
            <Link to="/" className="flex items-center space-x-2 text-dark text-xl font-semibold">
              <img src="assets/logo.png" alt="logo" className="w-10 h-10" />
              <span>Power</span>
            </Link>
          </div>
          <p className="text-light mb-6">
            Take the first step towards a healthier, stronger you with our unbeatable pricing plans. Let's sweat, achieve, and conquer together!
          </p>
          <div className="flex space-x-4">
            <Link to="#" className="text-light hover:text-primary border border-light rounded-full p-2 text-lg">
              <i className="ri-facebook-fill"></i>
            </Link>
            <Link to="#" className="text-light hover:text-primary border border-light rounded-full p-2 text-lg">
              <i className="ri-instagram-line"></i>
            </Link>
            <Link to="#" className="text-light hover:text-primary border border-light rounded-full p-2 text-lg">
              <i className="ri-twitter-fill"></i>
            </Link>
          </div>
        </div>
        
        {/* Footer Columns */}
        <div className="flex flex-col">
          <h4 className="text-dark text-2xl font-medium mb-6">Company</h4>
          <div className="space-y-4">
            <Link to="#" className="text-light hover:text-primary no-underline text-xl contents">Business</Link>
            <Link to="#" className="text-light hover:text-primary no-underline text-xl contents">Franchise</Link>
            <Link to="#" className="text-light hover:text-primary no-underline text-xl contents">Partnership</Link>
            <Link to="#" className="text-light hover:text-primary no-underline text-xl contents">Network</Link>
          </div>
        </div>
        
        <div className="flex flex-col">
          <h4 className="text-dark text-2xl font-medium mb-6">About Us</h4>
          <div className="space-y-4">
            <Link to="#" className="text-light hover:text-primary no-underline text-xl contents">Blogs</Link>
            <Link to="#" className="text-light hover:text-primary no-underline text-xl contents">Security</Link>
            <Link to="#" className="text-light hover:text-primary no-underline text-xl contents">Careers</Link>
          </div>
        </div>
        
        <div className="flex flex-col">
          <h4 className="text-dark text-2xl font-medium mb-6">Contact</h4> 
          <div className="space-y-4">
            <Link to="#" className="text-light hover:text-primary no-underline text-xl contents">Contact Us</Link>
            <Link to="#" className="text-light hover:text-primary no-underline text-xl contents">Privacy Policy</Link>
            <Link to="#" className="text-light hover:text-primary no-underline text-xl contents">Terms & Conditions</Link>
            <Link to="#" className="text-light hover:text-primary no-underline text-xl contents">BMI Calculator</Link>
          </div>
        </div>
      </div>
      <div className="bg-dark py-4 text-center text-light text-sm">
        <p>Copyright © 2023 Web Design Mastery. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
