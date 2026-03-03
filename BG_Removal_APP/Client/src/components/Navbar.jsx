import React from 'react'
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { useContext } from 'react';
import { Appcontext } from '../context/Appcontext';
import { useEffect } from 'react'

/**
 * Navigation Bar Component
 * Displays user authentication state and available credits
 * 
 * - Shows "Get Started" button for signed-out users
 * - Shows Credits display and user profile for signed-in users
 * - Fetches credits from backend when user signs in
 */
const Navbar = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn, user, isLoaded } = useUser();
  
  // Get credit data from global context
  const { credits, loading, error, loadCreditsData } = useContext(Appcontext);

  /**
   * Load user credits when authenticated
   * Updates whenever sign-in status changes
   */
  useEffect(() => {
    if (isSignedIn && isLoaded) {
      loadCreditsData();
    }
  }, [isSignedIn, isLoaded]);

  // Wait for Clerk authentication state to load
  if (!isLoaded) return null;

  return (
    <div className='flex items-center justify-between mx-6 py-5 lg:mx-44'>
      {/* Logo */}
      <Link 
        to='/' 
        className='hover:scale-105 active:scale-95 hover:drop-shadow-x1 transition-all duration-300 inline-block'
      >
        <img 
          className='w-36 sm:w-48 md:w-52 lg:w-60' 
          src={assets.logo} 
          alt="BG Removal Logo" 
        />
      </Link>

      {/* User Section */}
      {isSignedIn ? (
        <div className='flex items-center gap-3'>
          {/* Credits Button */}
          <button 
            className='flex items-center gap-2 bg-blue-100 px-4 sm:px-7 py-1.5 sm:py-2.5 rounded-full hover:scale-105 transition-all duration-700'
            title="Your available credits"
          >
            <img src={assets.credit_icon} alt="Credit Icon" width="20" height="20" />
            <p className='font-semibold'>
              Credits: <span className='text-blue-600'>{loading ? '...' : credits}</span>
            </p>
          </button>

          {/* User Profile Info */}
          <p className='text-gray-600 max-sm:hidden'>
            Hi, {user?.firstName || 'User'}
          </p>

          {/* Clerk User Button */}
          <UserButton />
        </div>
      ) : (
        // Sign In Button for guests
        <button 
          onClick={() => openSignIn({})} 
          className='bg-blue-600 text-white px-5 py-2 rounded-full flex items-center justify-center gap-3 hover:bg-blue-700 hover:scale-105 hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.7)] transition-all duration-300'
        >
          Get started <img className='w-3 sm:w-4' src={assets.arrow_icon} alt="Arrow" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
