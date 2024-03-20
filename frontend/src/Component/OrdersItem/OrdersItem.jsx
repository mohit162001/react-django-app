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
          {orders && orders.userOrders.map((item)=>{
                  return <div key={item.id}>
                              <div className="orderitems-format orderitems-format-main">
                                  <img src={"http://localhost:8000/media/"+item.productImage} alt="" className='carticon-product-icon' />
                                  <p>{item.productName}</p>
                                  <p> {item.orderDate}</p>
                                  <button className='orderitems-quantity'>{item.quantity}</button>
                                  <p> ₹{item.totalPrice}</p>
                                  <p> {item.paymentMode}</p>
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