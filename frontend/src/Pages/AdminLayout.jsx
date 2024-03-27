import React from 'react'
import SideBar from '../Component/SideBar/SideBar'
// import { Outlet } from 'react-router-dom'
import './CSS/adminlayout.css'
import Navbar from '../Component/Navbar/Navbar'
import Footer from '../Component/Footer/Footer'
function AdminLayout({children}) {
  return (
    <>

    <main>
    <SideBar/>
    <div className='admin-outlet-pages'>
    {/* <Outlet/>  */}
    {children}
    </div>   
    </main>   

    </>
  )
}

export default AdminLayout