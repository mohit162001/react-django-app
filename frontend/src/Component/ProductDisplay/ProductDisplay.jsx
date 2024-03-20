import React, { useContext } from "react";
import "./productdisplay.css";
import star_icon from "../Assests/star_icon.png";
import star_dull_icon from "../Assests/star_dull_icon.png";
import { ShopContext } from "../../Context/ShowContext";
import { checkAuth, getUserData } from "../../helper";
import toast, { Toaster } from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { ADD_ITEM_TO_CART, GET_CART_DETAILS } from "../../query/query";
// import { useNavigate } from 'react-router-dom'
const ProductDisplay = ({ product, id }) => {
  const { addToCart } = useContext(ShopContext);
  const userId = getUserData("id");
  const [mutationFun] = useMutation(ADD_ITEM_TO_CART, {
    onCompleted(data){
        console.log(data)
        console.log(data.message)
    },
    onError(error){
        toast.error('Someting went wrong...!',{duration:1000})
    },
    refetchQueries: [{ query: GET_CART_DETAILS, variables:{userId:userId} }],
  });
  function addIfLogedIn(id) {
    if (checkAuth() === true) {
      mutationFun({
        variables: {
          userId: userId,
          productId: id,
        },  
      });
    } else {
      toast("Please login first", {
        className: "custom-toast",
        duration: 1000,
        style: {
          backgroundColor: "white",
          color: "black",
          borderRadius: "8px",
          padding: "16px",
          fontSize: "1rem",
        },
        icon: "😉",
      });
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
              ${product.productPrice}
            </div>
          </div>
          <div className="productdisplay-right-description">
            <p>{product.productDesc}</p>
          </div>
          <div className="productdisplay-right-size">
            <h1>Select Size</h1>
            <div className="productdisplay-right-sizes">
              <div>S</div>
              <div>M</div>
              <div>L</div>
              <div>XL</div>
              <div>XXL</div>
            </div>
          </div>
          <button
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
