import React, { useState } from 'react';
import { login } from '../Firebase/auth'; // Import the login function from authService
import { useNavigate } from 'react-router-dom';
import lphoto from "../assets/Lphoto.jpg"


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password); // Use the login function from authService
      // Redirect to dashboard or home page after successful login
      navigate('/'); // Redirect to the home page or dashboard
    } catch (error) {
      // Handle login errors (e.g., display error message)
      console.error('Login error:', error.message);
      alert(error.message); // Basic error display
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)' }}>
      <div className="flex w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Left Section (Login Form) */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-center mb-2">Welcome back</h2>
          <p className="text-center text-gray-600 mb-6">Please Enter your Account details</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email:</label>
              <input 
                type="email" 
                id="email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                className="shadow appearance-none border rounded-full w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password:</label>
              <input 
                type="password" 
                id="password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                className="shadow appearance-none border rounded-full w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <input type="checkbox" id="remember" className="mr-2" />
                <label htmlFor="remember">Keep me logged in</label>
              </div>
              <a href="#" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">Forgot Password?</a>
            </div>
            <button type="submit" className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full">
              Sign In
            </button>
          </form>
        </div>

        {/* Right Section (Placeholder Content) */}
        <div className="hidden md:block md:w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${lphoto}) `}}>
          {/* Add content for the right section here */}
        </div>
      </div>
    </div>
  );
};

export default Login;