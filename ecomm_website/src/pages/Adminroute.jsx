import React from 'react'
import Adminnavbar from "./Adminnavbar"
import Admindashboard from "./Admindashboard"
import { Route, Routes } from 'react-router-dom'
import Products from './Products'
import Category from './Category'
import Brand from './Brand'

const Adminroute = () => {
  return (
    <>

<div class="main-panel">
    
      <Adminnavbar/>
    

      <Routes>
        <Route path='dashboard' element={<Admindashboard/>}/>
        <Route path='product' element={<Products/>}/>
        <Route path='category' element={<Category/>}/>
        <Route path='brand' element={<Brand/>}/>
      </Routes>
      </div>
      </>

  )
}

export default Adminroute
