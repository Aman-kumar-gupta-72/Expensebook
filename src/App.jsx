import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Sinip';
import Dashboard from './Pages/Dashboard'; // Import the Dashboard component


import './App.css';
import Header from './Component/Header';
import Footer from './Component/Footer';


function App() {
  return (
    <Router>
      <div className='' >
        <Header /> {/* Add the Header component here */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} /> {/* Add a route for the Dashboard */}
        </Routes>
        <Footer/>
      </div>
    </Router>
   
  );
}

export default App;