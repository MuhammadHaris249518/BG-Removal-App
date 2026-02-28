import React from 'react'
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { useContext } from 'react';
import { Appcontext } from '../context/Appcontext';
import { useEffect } from 'react';
const Navbar = () => {
  const {openSignIn}=useClerk();
  const{isSignedIn,user}=useUser();
  const {credit,localCreditData}=useContext(Appcontext)
  useEffect(()=>{
    if(isSignedIn){
      localCreditData()
    }

  },[isSignedIn])
  return (
    <div className='flex items-center justify-between mx-6 py-5 lg:mx-44'>
        <Link to='/' className='hover:scale-105 active:scale-95 hover:drop-shadow-x1 transition-all duration-300 inline-block'><img className='w-36 sm:w-48 md:w-52 lg:w-60 'src={assets.logo} alt="" /></Link>
        {
          isSignedIn
          ?<div>
            <UserButton/>
          </div>
          :
 <button onClick={()=>openSignIn({})} className='bg-blue-600 text-white px-5 py-2 rounded-full flex items-center justify-center gap-3
        hover:bg-blue-700 hover:scale-105 hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.7)]
        transition-all duration-300
      '>
            Get started <img className='w-3 sm:w-4' src={assets.arrow_icon} alt="" />
        </button>
        }
       
    </div>
  )
}
export default Navbar;