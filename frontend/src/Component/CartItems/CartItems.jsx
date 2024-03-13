import React, { useContext } from 'react'
import './cartitems.css'
import { ShopContext } from '../../Context/ShowContext'
import remove_icon from '../Assests/cart_cross_icon.png'
import { useMutation } from '@apollo/client'
const CartItems = ({products}) => {
    const {getTotalCartAmount,all_product,cartItems,removeFromCart} = useContext(ShopContext)
    // const [mutationFun] = useMutation()
    return (
    <div className="cartitems">
        <div className="cartitems-format-main">
            <p>Product</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr />
        {products.map((item)=>{
                return <div key={item.id}>
                            <div className="cartitems-format cartitems-format-main">
                                <img src={"http://localhost:1337"+item.attributes.image.data.attributes.url} alt="" className='carticon-product-icon' />
                                <p>{item.attributes.name}</p>
                                <p> ₹{item.attributes.new_price}</p>
                                <button className='cartitems-quantity'>{cartItems[item.attributes.id]}</button>
                                <p> ₹{item.attributes.new_price * cartItems[item.attributes.id]}</p>
                                <img src={remove_icon} onClick={()=>{removeFromCart(item.id)}} alt="" />
                            </div>
                            <hr />
                        </div>
            return null;
        })}
        <div className="cartitems-down">
            <div className="cartitems-total">
                <h1>Cart Totals</h1>
                <div>
                    <div className="cartitems-total-item">
                        <p>Subtotal</p>
                        <p> ₹{getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <p>Shipping Fee</p>
                        <p>Free</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <h3>Total</h3>
                        <h3> ₹{getTotalCartAmount()}</h3>
                    </div>
                </div>
                <button>PROCEED TO CHECKOUT</button>
            </div>
            <div className="cartitems-promocode">
                <p>If you have promocode, Enter here</p>
                <div className="cartitems-promobox">
                    <input type="text" placeholder='Promocode' />
                    <button type='submit'>Apply</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CartItems