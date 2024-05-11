import React, { useContext, useState } from 'react'
import './userdetails.css'
import avatar from '../Assests/avatar.png'

import admin_image1 from '../Assests/admin_img1.jpg'
import UserFormModel from './UserFormModel'
import { Link } from 'react-router-dom'
import { isAdminUser } from '../../helper'
import { ShopContext } from '../../Context/ShowContext'
function UserDetails({username,email,address,userId,image}) {
    // console.log(address)
    const {setMenu,theme} = useContext(ShopContext)
    const [showForm,setShowForm] = useState(false)
    function handleFormModelState(){
        setShowForm((prev)=>!prev)
    }

    console.log(image)
    return (
        <>
        <h3 className={theme==="dark-theme"?"userprofile-h3-dark":'userprofile-h3'}>{isAdminUser()?"Admin Profile":"User Profile"}</h3>
        <div className="avatar-img">
            {image?<img className='avatar' alt="alterative" src={"http://localhost:8000/media/"+image}/>:<img src={isAdminUser()?admin_image1: avatar} alt="alterative" className='avatar'/>}
        </div>
        <div className="userprofile-container">
            
            <div>
            <div className={theme==="dark-theme"?"user-info-dark":'user-info'}>
                <div className="userlable">
                    <lable className="userprofile-lable" >Username :</lable>
                    <lable className="userprofile-lable" >Email :</lable>
                    <lable className="userprofile-lable" >Address :</lable>
                </div>
                <div className="uservalues">
                    <input className="userprofile-input username"  type="text" value={username} readOnly/>
                    <input className="userprofile-input"  type="text" value={email} readOnly/>
                    <input className="userprofile-input"  type="text" value={address ?address:"Update your address"} readOnly/>
                </div>
       
            </div>
            <div className="user-action">
                <button className='user-action-update' onClick={handleFormModelState}>Update Profile</button>
                <Link to='/'><button onClick={()=>setMenu('shop')} className='user-action-back'>Back</button></Link>
            </div>
            </div>
        </div>
        {showForm && <UserFormModel username={username} email={email} address={address} userId={userId} handleClose={handleFormModelState}/>}
        </>
      )
}

export default UserDetails