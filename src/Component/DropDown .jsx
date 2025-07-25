import React, { useState } from 'react';
import { logout } from '../Firebase/auth';
import { useNavigate } from 'react-router-dom';

const UserDropdown = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error.message);
      alert('Failed to log out.');
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center focus:outline-none"
      >
        <div className='w-10 h-10 border border-white rounded-[50%] '>
          <span className='font-bold text-3xl text-green-500'>{user?.displayName?.charAt(0).toUpperCase()}</span>
        </div>
        {/* Optional: Add a dropdown icon */}
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-blue-200 rounded-md shadow-xl z-20">
          <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"> {user.displayName}</span>
          <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"> {user.email}</span>
          <button
            onClick={handleLogout}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;