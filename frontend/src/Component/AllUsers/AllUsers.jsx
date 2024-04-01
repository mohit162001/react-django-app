import React, { useContext, useState } from 'react';
import './allusers.css';
import { useMutation } from '@apollo/client';
import { ALL_USERS_DETAILS, DELETE_PRODUCT, GET_ALL_PRODUCTS, USER_STATUS_MANAGE } from '../../query/query';
import delete_icon from '../Assests/delete-icon.png'
import avatar from '../Assests/avatar.png'

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Model from '../Model/Model';
import { ShopContext } from '../../Context/ShowContext';
import { formatDateOnly } from '../../helper';
function AllUsers({ users, currPage, itemsperPage }) {

  const start = (currPage - 1) * itemsperPage;
  const end = start + itemsperPage;
  const {setMenu} = useContext(ShopContext)
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("info");
  const [status,setStatus] = useState(true)

  const [mutationManageStatus] = useMutation(USER_STATUS_MANAGE,{
    onCompleted(){
        handleSnackbarOpen('',"User status updated successfully")
    },
    onError(){
        handleSnackbarOpen('error',"Can not manage status ")
    },
    refetchQueries: [{ query: ALL_USERS_DETAILS }]
  })


  function handleStatus(userId,checked){
    console.log(userId,checked)
    setStatus((prev)=>!prev)
    mutationManageStatus({
        variables:{
            userId:userId,
            status:checked      
        }
    })
  }


  const handleSnackbarOpen = (severity, message) => {
    setSeverity(severity);
    setMessage(message);
    setOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <>
    <Snackbar open={open} autoHideDuration={1000} onClose={handleSnackbarClose} anchorOrigin={{vertical:"top",horizontal:"center"}}>
        <MuiAlert elevation={6}   severity={severity} sx={{fontSize: "1.4rem",width:"100%",background:"#ffc250",fontWeight:600}}>
         {message}
       </MuiAlert>
      </Snackbar>
      <div className="allusers">
        <div className="allusers-format-main">
          <p>Profile</p>
          <p>Username</p>
          <p>Email</p>
          <p>Last Login</p>
          <p>Date Joined</p>
          <p>Status</p>
        </div>
        <hr className='allusers-hr'/>
        <div className='allusers-list-container'>
        {users.slice(start, end).map((item,i) => {
          return (<>
            {item.role.role==="user"&&
            (<div  key={i}>
              <div className="allusers-format allusers-format-main">
                <img src={item.image?"http://localhost:8000/media/" + item.image:avatar} alt="alternative" className='carticon-product-icon' />
                <p className='allusers-p'>{item.username}</p>
                <input type="text" className='all-user-email' value={item.email} />
                <p > {formatDateOnly(item.lastLogin)}</p>
                <p className='allusers-p'> {formatDateOnly(item.dateJoined)}</p>
                <label class="switch">
                    <input type="checkbox" checked={item.isActive} name='status' disabled={item.role.role==="admin"&&true} onChange={(event)=>handleStatus(item.id,event.target.checked)} />
                    <span class="slider round"></span>
                </label>
              </div>
              <hr className='allusers-hr'/>
            </div>)}</>
          );
        })}
        </div>
      </div>
    </>
  );
}

export default AllUsers;
