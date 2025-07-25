import React from 'react'
import { Link } from 'react-router-dom'
import expence from "../assets/Expens.jpg"
import { GiExpense } from "react-icons/gi";
import tracker from "../assets/tracker.jpg"

const Hero = () => {

  return (
    <div className=' w-full   relative'>
      <div className='min-h-[500px] w-full   '>
        <div className='flex flex-col mt-10'>
          <h1 className='text-5xl font-sans font-bold'>Stop notes expence in your diary</h1>
          <p className='mt-5 text-2xl'>Expenses keeps everything organized so you can say goodbye <br /> to that envelope of receipts!</p>

        </div>
        <Link to="/login">
          <button className='bg-emerald-600 p-2 text-xl rounded-2xl mt-4 '>Start now-it's free</button>
        </Link>
        <span className='absolute top-56 left-28 ' ><GiExpense size={150} /></span>
        <span className='absolute top-56 right-36 ' ><GiExpense size={150} /></span>

        <p className='text-xl mt-4'>Free forever with ultimate users</p>
      </div>
      <div className='h-[700px] rounded-t-full bg-gray-200 '>
        <div className='h-[600px]  w-[70%]  absolute top-96 left-52 rounded-4xl '>
          <img src={expence} alt="" className='' />

        </div>

      </div>
      <div className='w-full h-[600px] flex relative'>
         <div className='md:w-1/2 rounded-r-full h-68  bg-gray-400 absolute top-42 '> </div> 
         <span><img src={tracker} alt="" height={70} className='h-[500px] absolute top-10 left-32 ' /></span>
        
         <div className=' md:w-1/2 absolute right-0 h-[600px] '>
            <h1 className='text-5xl text-center mt-48   font-bold  '>Submit on the go</h1>
            <p className='text-2xl mt-3 text-start ml-48'>Capture transaction details like amount, <br /> category, date, and description for better tracking. <br />Helps maintain a digital record of your daily, <br /> weekly,  and monthly transactions</p>
         </div>
      </div>
    </div>
  )
}

export default Hero
