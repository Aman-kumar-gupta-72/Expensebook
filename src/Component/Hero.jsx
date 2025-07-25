import React from 'react'
import { Link } from 'react-router-dom'
import expence from "../assets/Expens.jpg"
import { GiExpense } from "react-icons/gi"
import tracker from "../assets/tracker.jpg"

const Hero = () => {
  return (
    <div className='w-full'>
      {/* Hero Top Section */}
      <div className='min-h-[500px] w-full  px-6 py-10 text-center'>
        <div className='flex flex-col items-center  '>
          <h1 className='text-3xl mt-15 sm:text-4xl md:text-5xl font-bold'>
            Stop notes expence in your diary
          </h1>
          <p className='mt-5 text-lg sm:text-xl'>
            Expenses keeps everything organized so you can say goodbye <br className='hidden sm:block' />
            to that envelope of receipts!
          </p>

          <Link to="/login">
            <button className='bg-emerald-600  px-5 py-3 text-lg rounded-2xl mt-6 text-white hover:bg-emerald-700 transition'>
              Start now - it's free
            </button>
          </Link>

          <p className='text-base sm:text-lg mt-4 text-gray-700'>
            Free forever with unlimited users
          </p>
        </div>

        {/* Icons */}
        <div className='relative top-8 sm:block'>
          <GiExpense
            size={100}
            className='absolute top-0 left-0 text-emerald-400'
          />
          <GiExpense
            size={100}
            className='absolute top-0 right-0 text-emerald-400'
          />
        </div>
      </div>

      {/* Image with background */}
      <div className='relative bg-gray-200 h-[400px] sm:h-[500px] rounded-t-full flex justify-center items-center'>
        <img
          src={expence}
          alt="Expense"
          className='w-[90%]   sm:h-[500px] sm:w-[700px] rounded-xl sm:mb-15  shadow-lg object-'
        />
      </div>

      {/* Submit Section */}
      <div className='w-full flex flex-col lg:flex-row items-center justify-center px-6 py-16 gap-10'>
        {/* Left Background Circle */}
        <div className='relative w-full lg:w-1/2 flex justify-center'>
          <div className='w-[300px] h-[400px] sm:w-[600px] sm:h-[300px] bg-gray-400 rounded-full absolute top-15  z-0' />
          <img
            src={tracker}
            alt="Tracker"
            className='relative z-10 max-w-full h-[500px] sm:h-[500px]  object-contain'
          />
        </div>

        {/* Right Content */}
        <div className='w-full lg:w-1/2 text-center lg:text-left'>
          <h1 className='text-3xl sm:text-4xl font-bold mb-4'>
            Submit on the go
          </h1>
          <p className='text-lg sm:text-xl text-gray-800'>
            Capture transaction details like amount, category, date, and description <br className='hidden sm:block' />
            for better tracking. Helps maintain a digital record of your <br className='hidden sm:block' />
            daily, weekly, and monthly transactions.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Hero
