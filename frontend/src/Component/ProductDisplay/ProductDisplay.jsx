import React, { useContext } from 'react'
import './productdisplay.css'
import star_icon from '../Assests/star_icon.png'
import star_dull_icon from '../Assests/star_dull_icon.png'
import { ShopContext } from '../../Context/ShowContext'
import { checkAuth } from '../../helper'
import toast, { Toaster } from 'react-hot-toast'
// import { useNavigate } from 'react-router-dom'
const ProductDisplay = ({product,id}) => {
    const {addToCart} = useContext(ShopContext);
    function addIfLogedIn(id){
        if(checkAuth()===true){
            addToCart(id)
        }
        else{
            toast("Please login first", {
                className: 'custom-toast',
                duration:1000,
                style: {
                  backgroundColor: '#5e5e5e',
                  color: '#fff',
                  borderRadius: '8px',
                  padding: '16px',
                  fontSize:'1rem'
                },
                icon: "😉"
              });
        }
    }
  return (
    <>
    <Toaster/>
    <div className='productdisplay'>
        <div className="productdisplay-left">
            <div className="productdisplay-imglist">
                <img src={"http://localhost:1337"+product.image.data.attributes.url} alt={product.name} />
                <img src={"http://localhost:1337"+product.image.data.attributes.url} alt={product.name} />
                <img src={"http://localhost:1337"+product.image.data.attributes.url} alt={product.name} />
                <img src={"http://localhost:1337"+product.image.data.attributes.url} alt={product.name} />
            </div>
            <div className="productdisplay-img">
                <img className='productdisplay-main-img' src={"http://localhost:1337"+product.image.data.attributes.url} alt="" />
            </div>
        </div>
        <div className="productdisplay-right">
            <h1>{product.name}</h1>
            <div className="productdisplay-right-stars">
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_dull_icon} alt="" />
                
            </div>
            <div className="productdisplay-right-prices">
                <div className="productdisplay-right-price-old">${product.old_price}</div>
                <div className="productdisplay-right-price-new">${product.new_price}</div>
            </div>
            <div className="productdisplay-right-description">
                <p>{product.description}</p>
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
            <button onClick={()=>{addIfLogedIn(id)}}>ADD TO CART</button>
            
        </div>
    </div>
    </>
  )
}

export default ProductDisplay