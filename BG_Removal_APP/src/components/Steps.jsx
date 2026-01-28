import React from 'react'
import { assets } from '../assets/assets';

const Steps = () => {
  return (
    <div className='mx-4 lg:px-44 py-20 lg:mx-44 xl:py-40'>
        <h1 className='text-center text-2xl md:text-3xl lg:text-4xl mt-4 mb-12 font-semibold bg-gradient-to-r from-blue-900 to-blue-500 bg-clip-text text-transparent'>
            Steps to remove <br /> background image in seconds
        </h1>
        <div className='flex items-start flex-wrap gap-4 mt-16 xl:mt-24 justify-center'>
            <div className='flex items-start gap-4 bg-white border drop-shadow-md p-7 pb-10 rounded hover:scale-105 transition-all duration-300'>
<img src={assets.upload_icon} alt="" />
<div><p>Upload image</p>
<p>Upload the image from your device</p>
</div>
            </div>
            <div><img src="" alt="" /></div>
            <div><img src="" alt="" /></div>
        </div>
    </div>
  )
}
export default Steps;