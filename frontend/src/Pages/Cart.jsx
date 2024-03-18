import React, { useEffect, useState } from 'react'
import CartItems from '../Component/CartItems/CartItems';
import { useQuery } from '@apollo/client';
import { GET_CART_DETAILS } from '../query/query';
import { checkAuth, getUserData } from '../helper';
import FallBack from '../Component/FallBack/FallBack';
import empty_cart from '../Component/Assests/empty-cart.png'
export const Cart = () => {
  const userId = getUserData('id')

  const {data,loading,error,refetch} = useQuery(GET_CART_DETAILS,{
    variables:{
      userId:userId
    }
  })

  return (
  <>
  {error && <p className='product-fallback'>Something went wrong...!</p>}
  {loading && !error && <p className='product-fallback'>Loading cart details...</p>}
  {!error && data && data.cart.length>0 && <CartItems products={data} refetch={refetch} userId={userId}/>}
  {!error && data && data.cart.length===0 && <FallBack image={empty_cart} heading={"No item found"} btn_lable={"Add item"} setMenuValue={'mens'} link={'/mens'}/>} 
  </>
  )
}
export default Cart;