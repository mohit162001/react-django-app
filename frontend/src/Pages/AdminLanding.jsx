import React from 'react'
import FallBack from '../Component/FallBack/FallBack'
import admin_fallback from '../Component/Assests/admin-fallback.png'
function AdminLanding() {
  return (
    <div className='admin-landing-page'>
        <FallBack image={admin_fallback} heading={"Welcome Back Admin"} btn_lable={"Side Bar"} link={'/admin/statistics'} setMenuValue={'statistics'} admin={true}/>
    </div>
  )
}

export default AdminLanding