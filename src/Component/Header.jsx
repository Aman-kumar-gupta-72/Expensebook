import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Dropdown from "./DropDown ";
import Exptra from '../assets/exo.jpg'

import { useNavigate } from 'react-router-dom';


const Header = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // Clean up the subscription on unmount
  }, [auth]);
  console.log(user);
  

  

  return (
    <header className="bg-gray-800 text-white p-4">
       <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          {/* Your Logo Here */}
          <Link to="/" className="text-2xl font-bold text-white mr-4">
          <img src={Exptra} alt="" className='h-20' />
          </Link>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
              {user && (
                <li><Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link></li>
              )}
            </ul>
          </nav>
        
        {user && (
          <Dropdown user={user} />
        )}
        {!user && (
          <nav>
            <ul className="flex space-x-4">
              <li><Link to="/login" className="hover:text-gray-300">Login</Link></li>
              <li><Link to="/signup" className="hover:text-gray-300">Signup</Link></li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
