import React from 'react'
import SideBar from '../Component/SideBar/SideBar'
import { Outlet } from 'react-router-dom'
import './CSS/adminlayout.css'
function AdminLayout() {
  return (
    <>
    <main>
    <SideBar/>
    <div className='admin-outlet-pages'>
    <Outlet/> 
    </div>   
    </main>   
    </>
  )
}

export default AdminLayout