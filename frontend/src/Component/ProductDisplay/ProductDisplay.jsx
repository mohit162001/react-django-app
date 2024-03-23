import React, {  useState } from "react";
import "./productdisplay.css";
import star_icon from "../Assests/star_icon.png";
import star_dull_icon from "../Assests/star_dull_icon.png";
// import { ShopContext } from "../../Context/ShowContext";
import {  getUserData, isAuthenticated } from "../../helper";
import toast, { Toaster } from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { ADD_ITEM_TO_CART, GET_CART_DETAILS } from "../../query/query";

const ProductDisplay = ({ product, id }) => {
  // const { addToCart } = useContext(ShopContext);
  const [quantity,setQuantity] = useState(1)
  const [disable,setDisable] = useState(false)
  const userId = getUserData("id");
  const [mutationAddItem] = useMutation(ADD_ITEM_TO_CART, {
    onCompleted(data){
      toast.success('Item added',{duration:1000})
    },
    onError(error){
        toast.error('Someting went wrong...!',{duration:1000})
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
      toast("Please login first", {
        // className: "custom-toast",
        duration: 1600,
        style: {
          backgroundColor: "white",
          color: "black",
          borderRadius: "8px",
          padding: "16px",
          fontSize: "1rem",
          fontWeight:400
        },
        icon: "😉"
      });
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
  return (
    <>
      <Toaster />
      <div className="productdisplay">
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
          <h1>{product.productName}</h1>
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
          
          <div className="productdisplay-right-description">
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
          <h3 className="quantity-heading">Item Quantity :</h3>
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
        </div>
      </div>
    </>
  );
};

export default ProductDisplay;
