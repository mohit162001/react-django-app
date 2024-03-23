import React from 'react';
import './allorderitems.css';
import delete_icon from '../Assests/delete-icon.png'
import { useMutation } from '@apollo/client';
import {DELETE_ORDER, GET_ALL_ORDERS} from '../../query/query'
import toast, { Toaster } from 'react-hot-toast';

function AllOrdersItem({ orders, currPage, itemsperPage }) {

  const start = (currPage - 1) * itemsperPage;
  const end = start + itemsperPage;

  const [mutationOrderDelete] = useMutation(DELETE_ORDER,{
    onCompleted(data){
      toast.success("Order delete successfully")
    },
    onError(error){
      toast.error("Something went wrong")
    },
    refetchQueries: [{ query: GET_ALL_ORDERS }]
  })
  function handleDelete(orderId){
    mutationOrderDelete({variables:{
      orderId:orderId
    }})

  }
  return (
    <>
    <Toaster/>
      <div className="allorderitems">
        <div className="allorderitems-format-main">
          <p>Product</p>
          <p>Title</p>
          <p>Order By</p>
          <p>Order Date</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Pay mode</p>
          <p>Action</p>
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
                <div className='allorderitems-action'>
                <img src={delete_icon} onClick={()=>handleDelete(item.orderId)} className='allproduct-action-btn'/>
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

export default AllOrdersItem;
