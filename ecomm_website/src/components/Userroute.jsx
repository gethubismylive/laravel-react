import React from 'react'
import Navbar from './Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from '../Page/Home'
import Cart from '../Page/Cart'
import ProductDetails from '../Page/ProductDetails'
import Payment from '../Page/Payment'

const Userroute = () => {
  return (
    <>
    <div>
      <Navbar/>
    </div>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/products/:id' element={<ProductDetails/>}/>
      <Route path='/payment' element={<Payment/>}/>
      
    </Routes>
    </>
    
  )
}

export default Userroute
