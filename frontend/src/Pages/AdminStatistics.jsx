import React from 'react'
import ChartBar from '../Component/Chart/ChartBar'
import { useQuery } from '@apollo/client';
import { GET_ALL_ORDERS } from '../query/query';
import './CSS/adminstatistics.css'
function AdminStatistics() {
    const {data,loading,error} = useQuery(GET_ALL_ORDERS)
  const OrderCountArr = [];

  if(data){
    console.log(data)
    const productQuantitySum = {};
    data.orders.forEach(order => {
      const productId = order.productId;
      const quantity = order.quantity;
      const orderDate = order.orderDate;
      const productName = order.productName
      console.log(order)
      if (productQuantitySum[productId]) {
        productQuantitySum[productId].totalOrderCount += quantity; 
    } else {
        productQuantitySum[productId] = {
            totalOrderCount: quantity, 
            productName: productName,
            orderDate: orderDate
        };
    }
    });
    console.log("product sum",productQuantitySum)
    for (const productId in productQuantitySum) {
        const { totalOrderCount, productName, orderDate } = productQuantitySum[productId];
        OrderCountArr.push({ productId, totalOrderCount, productName, orderDate });
    }
  
  console.log("order arr",OrderCountArr);
  }
  return (
    <>
    <div className='adminstatistics-page'>
        <div className='chart'><ChartBar orderData = {OrderCountArr}/></div>

    </div>
    </>
  )
}

export default AdminStatistics