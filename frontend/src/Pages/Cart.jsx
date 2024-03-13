import React from 'react'
import CartItems from '../Component/CartItems/CartItems';
import { useQuery } from '@apollo/client';
import { GET_CART_DETAILS } from '../query/query';
import { getUserData } from '../helper';

export const Cart = () => {
  const id = getUserData('id')
  const {data} = useQuery(GET_CART_DETAILS,{
    variables:{
      id:id
    }
  })
  return (
  <>
    {data && <CartItems products = {data?.carts.data[0].attributes.products.data}/>}
   </>
  )
}
export default Cart;