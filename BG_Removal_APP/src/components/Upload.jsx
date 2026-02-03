import React from 'react'
import { assets } from '../assets/assets';
const Upload = () => {
  return (
    <div className='pb-16'><h1 className='text-center text-2xl md:text-3xl lg:text-4xl mt-4 mb-12 font-semibold bg-gradient-to-r from-blue-900 to-blue-500 bg-clip-text text-transparent py-6 md:py-16'>
        {/* title */}
        See the magic. Try now</h1>
        <div className='px-66 lg:px-160'>
                        <input type="file" name="" id="upload1" className='hidden' />
                        <label className='inline-flex gap-3 px-8 py-3.5 rounded-full cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 hover:scale-105 transition-all duration-300  ' htmlFor="upload1">
                            <img width={20} src={assets.upload_btn_icon} alt="" />
                             <p className='text-white text-sm'>Upload your image</p>
                        </label>
                      </div></div>
        
  )
}
export default Upload;
