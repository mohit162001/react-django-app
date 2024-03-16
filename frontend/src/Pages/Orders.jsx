import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_ORDERS_DETAILS } from '../query/query'
import { getUserData } from '../helper'

function Orders() {
  const userId = getUserData('id')
  const {data,loading,error} = useQuery(GET_ORDERS_DETAILS,{
    variables:{
      userId:userId
    }
  })
  console.log(data)
  return (
    <>
    
    <div className="cartitems">
        <div className="cartitems-format-main">
            <p>Product</p>
            <p>Title</p>
            <p>Order Date</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Pay mode</p>

        </div>
        <hr />
        {error && <p>Something went wrong...!</p>}
        {loading && <p>Loading Products....</p>}
        {data && data.orderByUser.map((item)=>{
                return <div key={item.id}>
                            <div className="cartitems-format cartitems-format-main">
                                <img src={"http://localhost:8000/media/"+item.product.image} alt="" className='carticon-product-icon' />
                                <p>{item.product.name}</p>
                                <p> {item.orderDate}</p>
                                <button className='cartitems-quantity'>{item.quantity}</button>
                                <p> ₹{item.price}</p>
                                <p> {item.paymentMode.paymentMode}</p>
                            </div>
                            <hr />
                        </div>
            return null;
        })}
        </div>
        </>
  )
}

export default Orders