import React from 'react';
import { FaFacebookF, FaTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import Exptra from '../assets/exo.jpg'


function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold text-white mb-4">Your Company</h3>
            <p className="text-sm">123 Street Name</p>
            <p className="text-sm">City, State, 12345</p>
            <p className="text-sm">Email: info@yourcompany.com</p>
            <p className="text-sm">Phone: (123) 456-7890</p>
          </div>

          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul>
              <li className="mb-2"><a href="#" className="text-sm hover:text-white">About Us</a></li>
              <li className="mb-2"><a href="#" className="text-sm hover:text-white">Features</a></li>
              <li className="mb-2"><a href="#" className="text-sm hover:text-white">Contact</a></li>
            </ul>
          </div>

          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
            <ul>
              <li className="mb-2"><a href="#" className="text-sm hover:text-white">Terms and Conditions</a></li>
              <li className="mb-2"><a href="#" className="text-sm hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>

          <div className=" md:w-1/4  md:mb-0 flex flex-col">
            <h3 className="text-lg font-semibold text-white mb-4 mr-52">Connect</h3>
            <div className="flex gap-5  space-x-4">
              {/* Social Media Icons - Replace with actual icons */}
              <a href="#" className=" text-black  bg-white p-2 hover:text-green"><FaFacebookF /></a>
              <a href="#" className=" text-black  bg-white p-2 hover:text-green"><FaInstagram /></a>
              <a href="#" className=" text-black  bg-white p-2 hover:text-green"><FaTwitter /></a>
            </div>
            <span>
              <img src={Exptra} alt="" className='h-20 mt-10 ml-10' />
            </span>
          </div>
        </div>

        <div className="text-center text-sm mt-8">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
        <span className='text-2xl text-indigo-600'>Develope by AMAN KUMAR</span>
      </div>
    </footer>
  );
}

export default Footer;