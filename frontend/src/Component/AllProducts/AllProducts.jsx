import React, { useState } from 'react';
import './allproducts.css';
import { useMutation } from '@apollo/client';
import { DELETE_PRODUCT, GET_ALL_PRODUCTS } from '../../query/query';
import toast, { Toaster } from 'react-hot-toast';
import delete_icon from '../Assests/delete-icon.png'
import edit_icon from '../Assests/edit-icon.png'
import { Link } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
function AllProducts({ products, currPage, itemsperPage }) {

  const start = (currPage - 1) * itemsperPage;
  const end = start + itemsperPage;
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("info");
  const [mutationProductDelete] = useMutation(DELETE_PRODUCT,{
    onCompleted(){
        handleSnackbarOpen('',"Product deleted successfully")
    },
    onError(){
        handleSnackbarOpen('error',"Can not delete ")
    },
    refetchQueries: [{ query: GET_ALL_PRODUCTS }]
  })

  function handleDelete(productId){
    // console.log(productId)
    // mutationProductDelete({
    //     variables:{
    //         productId:productId
    //     }
    // })
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
      <div className="allproduct">
        <div className="allproduct-format-main">
          <p>Product</p>
          <p>Title</p>
          <p>Price</p>
          {/* <p>Descrtiption</p> */}
          <p>Created at</p>
          <p>Category</p>
          <p>Action</p>
        </div>
        <hr className='allproduct-hr'/>
        <div className='allproduct-list-container'>
        {products.slice(start, end).map((item,i) => {
          return (
            <div  key={i}>
              <div className="allproduct-format allproduct-format-main">
                <Link to={'/product/'+item.node.id}><img src={"http://localhost:8000/media/" + item.node.image} alt="alternative" className='carticon-product-icon' /></Link>
                <p className='allproduct-p'>{item.node.name}</p>
                <p className='allproduct-p'>₹{item.node.price}</p>
                {/* <p> {item.node.desc}</p> */}
                <p > {item.node.insertedDate}</p>
                <p className='allproduct-p'> {item.node.category.name}</p>
                <div className='allproduct-action'>
                <Link to={'/admin/addproduct/'+item.node.id}><img src={edit_icon} alt='alternative' className='allproduct-edit-btn'/></Link>
                <img src={delete_icon} alt='alternative' onClick={()=>handleDelete(item.node.id)} className='allproduct-delete-btn'/>
                </div>
              </div>
              <hr className='allproduct-hr'/>
            </div>
          );
        })}
        </div>
      </div>
    </>
  );
}

export default AllProducts;
