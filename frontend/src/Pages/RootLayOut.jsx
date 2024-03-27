import React from 'react'
import Navbar from '../Component/Navbar/Navbar'
import Footer from '../Component/Footer/Footer'
// import { Outlet } from 'react-router-dom'
// import ShopContextProvider from '../Context/ShowContext'

function RootLayOut({children}) {
  return (
    <>
    {/* <ShopContextProvider> */}
    <Navbar/>
    {children}
    <Footer/>
    {/* </ShopContextProvider> */}
    </>
  )
}

export default RootLayOut