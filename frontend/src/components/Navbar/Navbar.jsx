import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";
import axios from 'axios'
import { useNavigate  } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const username = localStorage.getItem("userDetails")
  // console.log(JSON.parse(username.name))


  const userDetails = JSON.parse(username);




  const toggleMenu = () => setShowMenu(!showMenu);
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const closeMenu = () => {
    setShowMenu(false);
    setShowDropdown(false);
  };


  const handlelogout = () => {
    const response = axios.post("https://gymwebsite-is32.onrender.com/api/user/logout", {
      withCredentials: true
    }).then((response) => {
      console.log(response.data)
      navigate("/login")

    });
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1150) {
        setShowMenu(false);
        setShowDropdown(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinkClass = "text-gray-600 hover:text-blue-500 transition-colors duration-300 no-underline ";
  const mobileNavLinkClass = "block py-3 px-4 text-gray-700 hover:bg-gray-100 transition-colors duration-300 no-underline w-full";

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <NavLink to="/" className="text-3xl font-black text-blue-600 no-underline">
            HellFi
          </NavLink>

          <div className="hidden lg:flex items-center space-x-8">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/calorie" className={navLinkClass}>Calorie</NavLink>
            <NavLink to="/diet" className={navLinkClass}>Diet</NavLink>
            <NavLink to="/yoga" className={navLinkClass}>Yoga</NavLink>


            {
              userDetails ? "" : <NavLink to="/login" className={navLinkClass}>Login</NavLink>
            }




            <NavLink to="/member" className={navLinkClass}>Premium</NavLink>
            <NavLink to="/contact" className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300 no-underline">
              Contact
            </NavLink>

            <div className="relative">
              <div className="flex items-center cursor-pointer" onClick={toggleDropdown}>
                <FaRegCircleUser className="text-2xl text-gray-600 hover:text-blue-500 transition-colors duration-300 mr-2" />
                <span className="text-gray-700 hover:text-blue-500 transition-colors duration-300">{userDetails?.name}</span>
              </div>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <div className="px-4 py-2 text-sm text-gray-500 border-b">
                    Signed in as <br />
                    <span className="font-medium text-gray-700">{userDetails?.name}</span>
                  </div>
                  <NavLink to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 no-underline" onClick={closeMenu}>
                    Profile
                  </NavLink>
                  <NavLink to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 no-underline" onClick={handlelogout}>
                    Logout
                  </NavLink>
                </div>
              )}
            </div>
          </div>

          <div className="lg:hidden">
            <button onClick={toggleMenu} className="text-2xl text-gray-600 focus:outline-none">
              {showMenu ? <IoClose /> : <IoMenu />}
            </button>
          </div>
        </div>

        {showMenu && (
          <div className="lg:hidden mt-4 bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <FaRegCircleUser className="text-3xl text-blue-500" />
                <div>
                  <p className="font-medium text-gray-800">{userDetails?.name}</p>
                  <p className="text-sm text-gray-500">Welcome back!</p>
                </div>
              </div>
            </div>
            <div className="py-2">
              <NavLink to="/" className={mobileNavLinkClass} onClick={closeMenu}>
                <span className="mr-3">🏠</span> Home
              </NavLink>
              <NavLink to="/calorie" className={mobileNavLinkClass} onClick={closeMenu}>
                <span className="mr-3">🍎</span> Calorie
              </NavLink>
              <NavLink to="/diet" className={mobileNavLinkClass} onClick={closeMenu}>
                <span className="mr-3">🥗</span> Diet
              </NavLink>
              <NavLink to="/yoga" className={mobileNavLinkClass} onClick={closeMenu}>
                <span className="mr-3">🧘</span> Yoga
              </NavLink>
              <NavLink to="/login" className={mobileNavLinkClass} onClick={closeMenu}>
                <span className="mr-3">🔐</span> Login
              </NavLink>
              <NavLink to="/profile" className={mobileNavLinkClass} onClick={closeMenu}>
                <span className="mr-3">👤</span> Profile
              </NavLink>
              {/* <NavLink to="/settings" className={mobileNavLinkClass} onClick={closeMenu}>
                <span className="mr-3">⚙️</span> Settings
              </NavLink> */}
            </div>
            <div className="p-4">
              <NavLink
                to="/contact"
                className="block w-full text-center bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                onClick={closeMenu}
              >
                Contact Us
              </NavLink>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;