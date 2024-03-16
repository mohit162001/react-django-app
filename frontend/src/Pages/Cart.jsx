import React, { useEffect, useState } from 'react'
import CartItems from '../Component/CartItems/CartItems';
import { useQuery } from '@apollo/client';
import { GET_CART_DETAILS } from '../query/query';
import { checkAuth, getUserData } from '../helper';

export const Cart = () => {
  const id = getUserData('id')

  const {data,refetch} = useQuery(GET_CART_DETAILS,{
    variables:{
      userId:id
    }
  })
  useEffect(()=>{
    refetch()
  })
  return (
  <>
    {data && <CartItems products = {data} refetch={refetch}/>}
   </>
  )
}
export default Cart;