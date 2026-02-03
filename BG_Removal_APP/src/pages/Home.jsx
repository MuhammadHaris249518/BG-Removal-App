import React from 'react'
import Header from '../components/Header';
import Steps from '../components/steps';
import BgSlider from '../components/BgSlider';
import Testemonials from '../components/Testemonials';
import Upload from '../components/upload';
import Footer from '../components/footer';

const Home = () => {
  return (
    <div>
        <Header/>
        <Steps/>
        <BgSlider/>
        <Testemonials/>
        <Upload/>
        
    </div>
  )
}
export default Home;