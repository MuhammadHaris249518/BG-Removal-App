import React from 'react'
import { assets } from '../assets/assets';

const Steps = () => {
  return (
    <div className='mx-4 lg:px-44 py-20 lg:mx-44 xl:py-40'>
        <h1 className='text-center text-2xl md:text-3xl lg:text-4xl mt-4 mb-12 font-semibold bg-gradient-to-r from-blue-900 to-blue-500 bg-clip-text text-transparent'>
            Remove background <br /> image in 3 steps
        </h1>
        <div className='flex items-start flex-wrap gap-4 mt-16 xl:mt-24 justify-center'>
            <div className='flex items-start gap-4 bg-white border drop-shadow-md p-7 pb-10 rounded hover:scale-105 transition-all duration-300 w-64'>
<img className='max-w-9'src={assets.upload_icon} alt="" />
<div><p className='text-xl font-medium'>Upload your image</p>
<p className='text-sm text-neutral-500 mt-1'>Upload the image from your device</p>
</div>
            
        </div>
<div className='flex items-start gap-4 bg-white border drop-shadow-md p-7 pb-10 rounded hover:scale-105 transition-all duration-300 w-64'>
<img className='max-w-9'src={assets.upload_icon} alt="" />
<div><p className='text-xl font-medium'>Remove background</p>
<p className='text-sm text-neutral-500 mt-1'>Our AI removes the background in seconds.</p>
</div>
            
        </div>
<div className='flex items-start gap-4 bg-white border drop-shadow-md p-7 pb-10 rounded hover:scale-105 transition-all duration-300 w-64'>
<img className='max-w-9'src={assets.upload_icon} alt="" />
<div><p className='text-xl font-medium'>Download image</p>
<p className='text-sm text-neutral-500 mt-1'>Download image without background</p>
</div>
            
        </div>
        
        </div>
    </div>
  )
}
export default Steps;