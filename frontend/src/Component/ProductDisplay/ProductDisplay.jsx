import React, {  useContext, useState } from "react";
import "./productdisplay.css";
import star_icon from "../Assests/star_icon.png";
import star_dull_icon from "../Assests/star_dull_icon.png";
import { ShopContext } from "../../Context/ShowContext";
import {  getUserData, isAdminUser, isAuthenticated } from "../../helper";
import toast, { Toaster } from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { ADD_ITEM_TO_CART, GET_CART_DETAILS } from "../../query/query";
import { Link, useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import back_icon from '../Assests/back.png'

const ProductDisplay = ({ product, id }) => { 
  const { setMenu,theme } = useContext(ShopContext);
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("info");
  const [quantity,setQuantity] = useState(1)
  const [disable,setDisable] = useState(false)
  const userId = getUserData("id");
  const [mutationAddItem] = useMutation(ADD_ITEM_TO_CART, {
    onCompleted(){
      handleSnackbarOpen('',"Item added")

      setTimeout(()=>{
        navigate('/cart')
        setMenu('')
      },1000)
    },
    onError(){
      handleSnackbarOpen('error',"Something went wrong")
    },
    refetchQueries: [{ query: GET_CART_DETAILS, variables:{userId:userId} }],
  });
  function addIfLogedIn(id) {
    if (isAuthenticated() === true) {
      mutationAddItem({
        variables: {
          userId: userId,
          productId: id,
          quantity:quantity
        },  
      });
    } else {
      handleSnackbarOpen('',"Please login first")
    }
  }

  function handleIncrease(){
    if (quantity >= 1) {
      setDisable(false); 
    }
      setQuantity((prev) => prev + 1);
  
  }
  function handleDecrease(){
    if (quantity <= 1) {
      setDisable(true); 
    } else {
      setQuantity((prev) => prev - 1);
    }
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

      <div className="productdisplay">
    <Link to={isAdminUser()?'/admin/allproducts':`/${product.productCategory}`}><button className='product-display-back-btn'><img src={back_icon} alt="" />Back</button></Link>

        <div className="productdisplay-left">
          <div className="productdisplay-imglist">
            <img
              src={"http://localhost:8000/media/" + product.productImage}
              alt={product.name}
            />
            <img
              src={"http://localhost:8000/media/" + product.productImage}
              alt={product.name}
            />
            <img
              src={"http://localhost:8000/media/" + product.productImage}
              alt={product.name}
            />
            <img
              src={"http://localhost:8000/media/" + product.productImage}
              alt={product.name}
            />
          </div>
          <div className="productdisplay-img">
            <img
              className="productdisplay-main-img"
              src={"http://localhost:8000/media/" + product.productImage}
              alt=""
            />
          </div>
        </div>
        <div className="productdisplay-right">
          <h1 className={theme==="dark-theme"?"product-name dark":"product-name"}>{product.productName}</h1>
          <div className="productdisplay-right-stars">
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_dull_icon} alt="" />
          </div>
          <div className="productdisplay-right-prices">
            {/* <div className="productdisplay-right-price-old">${0}</div> */}
            <div className="productdisplay-right-price-new">
            ₹{product.productPrice}
            </div>
          </div>
          
          <div className={theme==="dark-theme"?"productdisplay-right-description dark":"productdisplay-right-description"}>
            <p>{product.productDesc}</p>
          </div>
          {/* <div className="productdisplay-right-size">
            <h1>Select Size</h1>
            <div className="productdisplay-right-sizes">
              <div>S</div>
              <div>M</div>
              <div>L</div>
              <div>XL</div>
              <div>XXL</div>
            </div>
          </div> */}
          {!isAdminUser() && <>
          <h3 className={theme==='dark-theme'?"quantity-heading dark":"quantity-heading"}>Item Quantity :</h3>
          <div className="number">
	          <button disabled={disable} onClick={handleDecrease}  className="minus">-</button>
	            <input className="quantity-input" type="text" value={quantity} readOnly/>
	          <button onClick={handleIncrease} className="plus">+</button>
          </div>
          <button className="addtocart-button"
            onClick={() => {
              addIfLogedIn(id);
            }}
          >
            ADD TO CART
          </button>
          </>}
        </div>
      </div>
    </>
  );
};

export default ProductDisplay;
