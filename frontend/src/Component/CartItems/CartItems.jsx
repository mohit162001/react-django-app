import React, { useEffect } from 'react'
import './cartitems.css'

import remove_icon from '../Assests/cart_cross_icon.png'
import { useMutation, useQuery } from '@apollo/client'
import { GET_CART_DETAILS, REMOVE_CART_ITEM } from '../../query/query'
import { checkAuth, getUserData } from '../../helper'
const CartItems = ({products,refetch,userId}) => {

  useEffect(()=>{
    refetch()
  })

    const [mutationFun] = useMutation(REMOVE_CART_ITEM,{
        onCompleted(){
            refetch()
        },
        onError(error){
            console.log(error)
        }
    })
    
    function getTotalAmount(){
        const total= products.cart.reduce((acc,cur)=>(acc+cur.price),0)
        return total
     }
     function removeItem(id) {
        if (checkAuth() === true) {
          mutationFun({
            variables: {
              userId: userId,
              productId: id,
            },  
          });
        }

     }

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
        {products && products.cart.map((item)=>{
                return <div key={item.id}>
                            <div className="cartitems-format cartitems-format-main">
                                <img src={"http://localhost:8000/media/"+item.product.image} alt="" className='carticon-product-icon' />
                                <p>{item.product.name}</p>
                                <p> ₹{item.product.price}</p>
                                <button className='cartitems-quantity'>{item.quantity}</button>
                                <p> ₹{item.price}</p>
                                <img src={remove_icon} onClick={()=>{removeItem(item.product.id)}} alt="" />
                            </div>
                            <hr />
                        </div>
            return null;
        })}
        <div className="cartitems-down">
            <div className="cartitems-total">
                <h1>Cart Totals</h1>
                <div className='cartitem-total-container'>
                    <div className="cartitems-total-item">
                        <p>Subtotal</p>
                        <p> ₹{getTotalAmount()}</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <p>Shipping Fee</p>
                        <p>Free</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <h3>Total</h3>
                        <h3> ₹{getTotalAmount()}</h3>
                    </div>
                </div>
                <button>PROCEED TO ORDER</button>
            </div>
            {/* <div className="cartitems-promocode">
                <p>If you have promocode, Enter here</p>
                <div className="cartitems-promobox">
                    <input type="text" placeholder='Promocode' />
                    <button type='submit'>Apply</button>
                </div>
            </div> */}
        </div>
    </div>
  )
}

export default CartItems