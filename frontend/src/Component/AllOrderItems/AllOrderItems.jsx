import React from 'react';
import './allorderitems.css';

function AllOrdersItem({ orders, currPage, itemsperPage }) {

  const start = (currPage - 1) * itemsperPage;
  const end = start + itemsperPage;

  return (
    <>
      <div className="allorderitems">
        <div className="allorderitems-format-main">
          <p>Product</p>
          <p>Title</p>
          <p>Order By</p>
          <p>Order Date</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Pay mode</p>
        </div>
        <hr />
        <div className='allorder-list-container'>
        {orders.orders.slice(start, end).map((item,i) => {
          return (
            <div  key={i}>
              <div className="allorderitems-format allorderitems-format-main">
                <img src={"http://localhost:8000/media/" + item.productImage} alt="" className='carticon-product-icon' />
                <p>{item.productName}</p>
                <p>{item.username}</p>
                <p> {item.orderDate}</p>
                <button className='allorderitems-quantity'>{item.quantity}</button>
                <p> ₹{item.totalPrice}</p>
                <p> {item.paymentMode}</p>
              </div>
              <hr />
            </div>
          );
        })}
        </div>
      </div>
    </>
  );
}

export default AllOrdersItem;
