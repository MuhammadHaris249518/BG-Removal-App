import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='flex items-center justify-between flex-col-reverse lg:flex-row gap-y-10 px-4 mt-10 lg:px-44 sm:mt-20'>
        {/*--------Left side--------  */}
        <div>
              <h1 className='text-4xl xl:text-5xl 2xl:text-6xl font-bold text-neutral-700 leading-tight'>Remove the <br className='max-md:hidden' /><span className='bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-500 hover:scale-105 hover:drop-shadow-xl transition-all duration-300'>background</span> from <br className='max-md:hidden'/>images for free.</h1>
              <p className='my-6 text-[15px] text-gray-500'>
                Upload any image and get clean, transparent results in seconds. <br className='max-sm:hidden' /> No Photoshop or technical skills required.
              </p>
              <div>
                <input type="file" name="" id="upload" className='hidden' />
                <label className='inline-flex gap-3 px-8 py-3.5 rounded-full cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 hover:scale-105 transition-all duration-300 ' htmlFor="upload">
                    <img width={20} src={assets.upload_btn_icon} alt="" />
                     <p className='text-white text-sm'>Upload your image</p>
                </label>
              </div>
        </div>
        {/* --------Right side-------- */}
        <div className='w-full max-w-md'>
          <img src={assets.header_img} alt="" />

        </div>

    </div>
  )
}
export default Header