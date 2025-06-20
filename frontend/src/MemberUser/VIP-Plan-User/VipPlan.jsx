import React, { useState } from 'react';
import { FaHome, FaChartPie, FaUtensils, FaPhone, FaDumbbell, FaTools, FaCalculator, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SideNavbarDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCalorieCalculator, setShowCalorieCalculator] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleCalorieCalculator = () => setShowCalorieCalculator(!showCalorieCalculator);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-white text-gray-800 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out`}>
        <button onClick={toggleSidebar} className="absolute top-1 right-1 md:hidden">
          <FaTimes size={24} />
        </button>
        <nav>
          <ul className="space-y-2">
            <li>
              {/* <a href="#" className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200 no-underline">
                <FaHome className="mr-2" size={20} />
                Home
              </a> */}
            </li>
            <li>
              <Link to={"/calorie"} className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200 no-underline">
                <FaChartPie className="mr-2" size={20} />
                Calories
              </Link>
            </li>
            <li>
            <Link to={"/diet"} className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200 no-underline">
                <FaUtensils className="mr-2" size={20} />
                Diet
              </Link>
            </li>
            <li>
            <Link to={"/contact"}className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200 no-underline">
                <FaPhone className="mr-2" size={20} />
                Contact
              </Link>
            </li>
            <li>
              <a href="#" className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200 no-underline">
                <FaDumbbell className="mr-2" size={20} />
                Workout
              </a>
            </li>
            <li>
              <button 
                onClick={toggleCalorieCalculator}
                className="w-full flex items-center justify-between py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200 text-gray-800"
              >
                <span className="flex items-center">
                  <FaTools className="mr-2" size={20} />
                  Tools
                </span>
                <FaChevronDown className={`transition-transform duration-200 ${showCalorieCalculator ? 'rotate-180' : ''}`} />
              </button>
              {showCalorieCalculator && (
                <div className="ml-6 mt-2">
                  <a href="#" className="flex items-center py-2 px-4 rounded transition duration-200 hover:bg-gray-200 no-underline text-gray-800">
                    <FaCalculator className="mr-2" size={16} />
                    Calorie Calculator
                  </a>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-10">
        <button onClick={toggleSidebar} className="md:hidden">
          <FaBars size={24} />
        </button>
        <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
        <p>Welcome to your fitness dashboard. Select an option from the sidebar to get started.</p>
      </div>
    </div>
  );
};

export default SideNavbarDashboard;