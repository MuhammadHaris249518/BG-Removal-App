import React from 'react'
import Header from '../components/Header';
import Steps from '../components/steps';
import BgSlider from '../components/BgSlider';
import Testemonials from '../components/Testemonials';

const Home = () => {
  return (
    <div>
        <Header/>
        <Steps/>
        <BgSlider/>
        <Testemonials/>
    </div>
  )
}
export default Home;