import { useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { GET_ORDERS_DETAILS } from '../query/query'
import { getUserData } from '../helper'
import FallBack from '../Component/FallBack/FallBack'
import OrdersItem from '../Component/OrdersItem/OrdersItem'
import empty_order from '../Component/Assests/empty-order.png'
function Orders() {
  const userId = getUserData('id')
  const {data,loading,error,refetch} = useQuery(GET_ORDERS_DETAILS,{
    variables:{
      userId:userId
    }
  })

  return(
    <>
    {error && <p className='product-fallback'>Something went wrong...!</p>}
    {loading && !error && <p className='product-fallback'>Loading orders details...</p>}
    {!error && data && data.userOrders.length>0 && <OrdersItem orders={data}/>}
    {!error && data && data.userOrders.length===0 && <FallBack image={empty_order} heading={"No order found"} btn_lable={"Order now"} setMenuValue={'shop'} link={'/'}/>} 
    </>
  )
}

export default Orders