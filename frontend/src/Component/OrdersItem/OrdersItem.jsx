import React from 'react'
import './ordersitem.css'
function OrdersItem({orders}) {
  
    return (
      <>
      
      <div className="orderitems">
          <div className="orderitems-format-main">
              <p>Product</p>
              <p>Title</p>
              <p>Order Date</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Pay mode</p>
  
          </div>
          <hr />
          {orders && orders.orderByUser.map((item)=>{
                  return <div key={item.id}>
                              <div className="orderitems-format orderitems-format-main">
                                  <img src={"http://localhost:8000/media/"+item.product.image} alt="" className='carticon-product-icon' />
                                  <p>{item.product.name}</p>
                                  <p> {item.orderDate}</p>
                                  <button className='orderitems-quantity'>{item.quantity}</button>
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

export default OrdersItem