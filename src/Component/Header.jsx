import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Dropdown from "./DropDown ";
import Exptra from '../assets/exo.jpg'
import { FaBars, FaTimes } from 'react-icons/fa';


import { useNavigate } from 'react-router-dom';
const Header = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-gray-800 text-white p-4 fixed w-full z-50 shadow">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={Exptra} alt="Logo" className="h-12 w-auto" />
          <span className="text-xl font-bold">ExpenseBook</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          {user && <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>}
          {!user && (
            <>
              <Link to="/login" className="hover:text-gray-300">Login</Link>
              <Link to="/signup" className="hover:text-gray-300">Signup</Link>
            </>
          )}
          {user && <Dropdown user={user} />}
        </nav>

        {/* Mobile Menu Icon */}
        <div className="md:hidden text-2xl cursor-pointer" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav className="md:hidden bg-gray-700 text-white px-4 py-4 space-y-4">
          <Link to="/" onClick={toggleMenu} className="block hover:text-gray-300">Home</Link>
          {user && (
            <Link to="/dashboard" onClick={toggleMenu} className="block hover:text-gray-300">
              Dashboard
            </Link>
          )}
          {!user && (
            <>
              <Link to="/login" onClick={toggleMenu} className="block hover:text-gray-300">Login</Link>
              <Link to="/signup" onClick={toggleMenu} className="block hover:text-gray-300">Signup</Link>
            </>
          )}
          {user && <Dropdown user={user} />}
        </nav>
      )}
    </header>
  );
};

export default Header;
