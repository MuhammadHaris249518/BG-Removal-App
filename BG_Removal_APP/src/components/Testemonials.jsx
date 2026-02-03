import React from 'react'
import { testimonialsData } from '../assets/assets';

const Testemonials = () => {
  return (
    <div>
        {/* Title */}
        <h1 className='text-center text-2xl md:text-3xl lg:text-4xl mt-4 mb-12 font-semibold bg-gradient-to-r from-blue-900 to-blue-500 bg-clip-text text-transparent py-5'>Customer Testimonials</h1>
<div className='grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto px-4 py-8 hover:scale-105 transition-all duration-300'>
{testimonialsData.map((item,index)=>(
    <div className='bg-white rounded-xl p-6 drop-shadow-md max-w-lg m-auto' key={index}>
<p className='text-4xl text-gray-500'>”</p>
<p  className='text-sm text-gray-500'>{item.text}</p>
<div className='flex gap-4 items-center mt-5 mb-5 py-1 '>
    <img className='w-24 rounded-full'src={item.image} alt="" /></div>
    <div className=''>
        <p>{item.author}</p>
        <p>{item.jobTitle}</p>
    </div>
    </div>

))}
</div>

    </div>
  )
}
export default Testemonials;