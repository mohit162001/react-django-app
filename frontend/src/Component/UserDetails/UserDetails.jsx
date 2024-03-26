import React, { useState } from 'react'
import './userdetails.css'
import avatar from '../Assests/avatar.png'

import admin_image1 from '../Assests/admin_img1.jpg'
import UserFormModel from './UserFormModel'
import { Link } from 'react-router-dom'
import { isAdminUser } from '../../helper'
function UserDetails({username,email,address,userId}) {
    // console.log(address)
    const [showForm,setShowForm] = useState(false)
    function handleFormModelState(){
        setShowForm((prev)=>!prev)
    }


    return (
        <>
        <h3 className='userprofile-h3'>{isAdminUser()?"Admin Profile":"User Profile"}</h3>
        <div className="avatar-img">
            <img src={isAdminUser()?admin_image1: avatar} alt="" className='avatar'/>
        </div>
        <div className="userprofile-container">
            
            <div>
            <div className="user-info">
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
                <Link to='/'><button className='user-action-back'>Back</button></Link>
            </div>
            </div>
        </div>
        {showForm && <UserFormModel username={username} email={email} address={address} userId={userId} handleClose={handleFormModelState}/>}
        </>
      )
}

export default UserDetails