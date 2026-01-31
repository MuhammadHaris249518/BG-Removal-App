import React from 'react'

const BgSlider = () => {
    const[sliderpostion,setsliderposition]=userstate(50)
const hadnlesliderchange=(e)=>{
    setsliderposition(e.target.value)
}
  return (
    <div>
    {/* Title */}
    <h1>Tranform image to non background<br />image in seconds</h1>

    </div>
  )
}
export default BgSlider;
