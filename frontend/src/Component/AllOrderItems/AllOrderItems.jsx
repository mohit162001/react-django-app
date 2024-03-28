import React, { useState } from 'react';
import './allorderitems.css';
import delete_icon from '../Assests/delete-icon.png'
import { useMutation } from '@apollo/client';
import {DELETE_ORDER, GET_ALL_ORDERS} from '../../query/query'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
function AllOrdersItem({ orders, currPage, itemsperPage }) {

  const start = (currPage - 1) * itemsperPage;
  const end = start + itemsperPage;
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("info");
  const [mutationOrderDelete] = useMutation(DELETE_ORDER,{
    onCompleted(){
      handleSnackbarOpen('',"Order delete successfully")

    },
    onError(){
      handleSnackbarOpen('error',"Something went wrong")
    },
    refetchQueries: [{ query: GET_ALL_ORDERS }]
  })
  function handleDelete(orderId){
    mutationOrderDelete({variables:{
      orderId:orderId
    }})

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
    <Snackbar open={open} autoHideDuration={1500} onClose={handleSnackbarClose} anchorOrigin={{vertical:"top",horizontal:"center"}}>
        <MuiAlert elevation={6}   severity={severity} sx={{fontSize: "1.4rem",width:"100%",background:"#ffc250",fontWeight:600}}>
         {message}
       </MuiAlert>
      </Snackbar>
      <div className="allorderitems">
        <div className="allorderitems-format-main">
          <p>Product</p>
          <p>Title</p>
          <p>Order By</p>
          <p>Order Date</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Pay mode</p>
          <p>Action</p>
        </div>
        <hr />
        <div className='allorder-list-container'>
        {orders.orders.slice(start, end).map((item,i) => {
          return (
            <div  key={i}>
              <div className="allorderitems-format allorderitems-format-main">
                <img src={"http://localhost:8000/media/" + item.productImage} alt="" className='carticon-product-icon' />
                <p>{item.productName}</p>
                <p>{item.username}</p>
                <p> {item.orderDate}</p>
                <button className='allorderitems-quantity'>{item.quantity}</button>
                <p> ₹{item.totalPrice}</p>
                <p> {item.paymentMode}</p>
                <div className='allorderitems-action'>
                <img src={delete_icon} alt='alternative' onClick={()=>handleDelete(item.orderId)} className='allproduct-delete-btn'/>
                </div>
              </div>
              <hr />
            </div>
          );
        })}
        </div>
      </div>
    </>
  );
}

export default AllOrdersItem;
