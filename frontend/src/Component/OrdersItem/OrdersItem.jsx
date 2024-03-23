import React from 'react';
import './ordersitem.css';
import { DELETE_ORDER, GET_ORDERS_DETAILS } from '../../query/query';
import { useMutation } from '@apollo/client';
import toast, { Toaster } from 'react-hot-toast';
import delete_icon from '../Assests/delete-icon.png'


function OrdersItem({ orders, currPage, itemsperPage,userId }) {

  const start = (currPage - 1) * itemsperPage;
  const end = start + itemsperPage;

  const [mutationOrderDelete] = useMutation(DELETE_ORDER,{
    onCompleted(data){
      toast.success("Order delete successfully",{duration:1000})
    },
    onError(error){
      toast.error("Something went wrong",{duration:1000})
    },
    refetchQueries: [{ query: GET_ORDERS_DETAILS,variables:{userId:userId} }]
  })
  function handleDelete(orderId){
    console.log(orderId)
    mutationOrderDelete({variables:{
      orderId:orderId
    }})

  }


  return (
    <>
    <Toaster/>
      <div className="orderitems">
        <div className="orderitems-format-main">
          <p>Product</p>
          <p>Title</p>
          <p>Order Date</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Pay mode</p>
          <p>Action</p>
        </div>
        <hr />
        <div className='order-list-container'>
        {orders.userOrders.slice(start, end).map((item,i) => {
          return (
            <div  key={i}>
              <div className="orderitems-format orderitems-format-main">
                <img src={"http://localhost:8000/media/" + item.productImage} alt="" className='carticon-product-icon' />
                <p>{item.productName}</p>
                <p> {item.orderDate}</p>
                <button className='orderitems-quantity'>{item.quantity}</button>
                <p> ₹{item.totalPrice}</p>
                <p> {item.paymentMode}</p>
                <div className='orderitems-action'>
                <img src={delete_icon} onClick={()=>handleDelete(item.orderId)} className='orderitems-action-btn'/>
                </div>
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

export default OrdersItem;
