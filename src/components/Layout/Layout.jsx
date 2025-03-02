import React, { useState } from 'react'
import Style from './Layout.module.css'
import Nav from '../Nav/Nav'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
    const [first, setfirst] = useState(0)
  return (
   <>
   
   <Nav/>
  <div className='container mx-auto pt-20'>
  <Outlet></Outlet>

  </div>
   <Footer/>
   
   </>
  )
}
