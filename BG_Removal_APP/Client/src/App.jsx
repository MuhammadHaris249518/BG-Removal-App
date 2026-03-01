import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Result from './pages/Result'
import Buycredit from './pages/buycredit';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
const App = () => {
  return (
    <div className='min-h-screen bg-slate-50'>
      <ToastContainer position='bottom-right'/>
      <Navbar/>
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/result' element={<Result/>}/>
        <Route path='/buy' element={<Buycredit/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}
export default App;