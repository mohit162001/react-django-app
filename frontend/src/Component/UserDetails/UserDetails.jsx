import React, { useState } from 'react'
import './userdetails.css'
import avatar from '../Assests/avatar.png'
import UserFormModel from './UserFormModel'
function UserDetails({username,email,address,userId}) {
    const [showForm,setShowForm] = useState(false)
    function handleFormModelState(){
        setShowForm((prev)=>!prev)
    }
    function handleUpdateProfile(){

    }

    return (
        <>
        <h3 className='userprofile-h3'>User Profile</h3>
        <div className="avatar-img">
            <img src={avatar} alt="" className='avatar'/>
        </div>
        <div className="userprofile-container">
            
            <div className="user-info">
                <div className="userlable">
                    <lable className="userprofile-lable" >Username :</lable>
                    <lable className="userprofile-lable" >Email :</lable>
                    <lable className="userprofile-lable" >Address :</lable>
                </div>
                <div className="uservalues">
                    <input className="userprofile-input username"  type="text" value={username} readOnly/>
                    <input className="userprofile-input"  type="text" value={email} readOnly/>
                    <input className="userprofile-input"  type="text" value={address} readOnly/>
                </div>
       
            </div>
            <div className="user-action">
                <button className='user-action-button' onClick={handleFormModelState}>Update Profile</button>
            </div>
        </div>
        {showForm && <UserFormModel username={username} email={email} address={address} userId={userId} handleClose={handleFormModelState}/>}
        </>
      )
}

export default UserDetails