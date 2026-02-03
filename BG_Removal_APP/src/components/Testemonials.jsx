import React from 'react'
import { testimonialsData } from '../assets/assets';

const Testemonials = () => {
  return (
    <div>
        {/* Title */}
        <h1 className='text-center text-2xl md:text-3xl lg:text-4xl mt-4 mb-12 font-semibold bg-gradient-to-r from-blue-900 to-blue-500 bg-clip-text text-transparent py-5'>Customer Testimonials</h1>
<div className='grid '>
{testimonialsData.map((item,index)=>(
    <div key={index}>
<p>”</p>
<p>{item.text}</p>
<div>
    <img src={item.image} alt="" /></div>
    <div>
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