import React, { useState } from 'react';
import { signup } from "../Firebase/auth";
import { useNavigate } from 'react-router-dom';
import lphoto from "../assets/sinup.jpg"

const Signup = () => {
  const [name,setName]= useState("")
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(name,email, password); // Use the signup function from authService
      // Redirect to dashboard or home page after successful signup
      

      navigate('/'); // Redirect to the home page or dashboard
    } catch (error) {
      // Handle signup errors (e.g., display error message)
      console.error('Signup error:', error.message);
      alert(error.message); // Basic error display
    }
  };

  return (
    <div className="auth-container min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(to right top, #d16ba5, green)' }} >
      <div className="flex w-full max-w-4xl  bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="w-full md:w-1/2 p-8">
          <h2 className='text-2xl text-center font-bold mb-5'>Signup</h2>
          <p className='text-center text-gray-500 mb-3'>Please create your accounts here</p>
          <form onSubmit={handleSignup} className="auth-form">
            <div className="form-group">
              <label className="block text-gray-700 text-sm font-bold mb-2"  >Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="shadow appearance-none border rounded-full w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="form-group">
              <label className="block text-gray-700 text-sm font-bold mb-2"  >Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="shadow appearance-none border rounded-full w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="form-group">
              <label className="block text-gray-700 text-sm font-bold mb-2" >Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="shadow appearance-none border rounded-full w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
        
        <button type="submit" className="auth-button w-full bg-blue-700 mb-3 mt-3 rounded-2xl p-2">Sign Up</button>
      </form>
      </div>
     <div className="hidden  md:block md:w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${lphoto}) `}}>
              {/* Add content for the right section here */}
            </div>
    </div>
    </div >
  );
};

export default Signup;