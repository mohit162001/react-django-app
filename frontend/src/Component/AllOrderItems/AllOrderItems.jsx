import React, { useContext, useState } from 'react';
import './allorderitems.css';
import delete_icon from '../Assests/delete-icon.png'
import { useMutation } from '@apollo/client';
import {DELETE_ORDER, GET_ALL_ORDERS} from '../../query/query'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Model from '../Model/Model';
import { ShopContext } from '../../Context/ShowContext';
function AllOrdersItem({ orders, currPage, itemsperPage }) {

  const start = (currPage - 1) * itemsperPage;
  const end = start + itemsperPage;
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("info");
  const [model,setModel] = useState(false)
  const [orderId,setOrderId] = useState()
  const {theme} = useContext(ShopContext)
  const [mutationOrderDelete] = useMutation(DELETE_ORDER,{
    onCompleted(){
      handleSnackbarOpen('',"Order delete successfully")
      setTimeout(()=>{
        setModel(false)
      },1000)
    },
    onError(){
      handleSnackbarOpen('error',"Something went wrong")
    },
    refetchQueries: [{ query: GET_ALL_ORDERS }]
  })
  function handleDelete(){
    mutationOrderDelete({variables:{
      orderId:orderId
    }})

  }
  function handleModel(orderId){
    setOrderId(orderId)
    setModel((prev)=>!prev)
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
      {model&&<Model handleModel={handleModel} handleDelete={handleDelete} heading={'Do you want to delete this Order?'} />}

      <div className={theme==='dark-theme'?"allorderitems dark":"allorderitems"}>
        <div className={theme==='dark-theme'?"allorderitems-format-main dark":"allorderitems-format-main"}>
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
        {orders.slice(start, end).map((item,i) => {
          return (
            <div  key={i}>
              <div className={theme==='dark-theme'?"allorderitems-format allorderitems-format-main dark":"allorderitems-format allorderitems-format-main"}>
                <img src={"http://localhost:8000/media/" + item.productImage} alt="" className='carticon-product-icon' />
                <p>{item.productName}</p>
                <p>{item.username}</p>
                <p> {item.orderDate}</p>
                <button className='allorderitems-quantity'>{item.quantity}</button>
                <p> ₹{item.totalPrice}</p>
                <p> {item.paymentMode}</p>
                <div className='allorderitems-action'>
                <img src={delete_icon} alt='alternative' onClick={()=>handleModel(item.orderId)} className={theme==='dark-theme'?'allorderitems-action-btn-dark':'allproduct-delete-btn'}/>
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
