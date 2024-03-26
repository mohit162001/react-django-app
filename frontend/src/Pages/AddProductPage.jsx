import React from 'react'
import AddProductForm from '../Component/AddProduct/AddProductForm.jsx'
import { useParams } from 'react-router-dom'
import { GET_PRODUCT_BY_ID } from '../query/query.js';
import { useQuery } from '@apollo/client';
function AddProductPage() {
  const {productId} = useParams();
  const {data} = useQuery(GET_PRODUCT_BY_ID,{
    variables:{
      productId: productId
    },
    skip:productId?false:true
  })
  return (
    <>
    <AddProductForm productData ={data && data.product} productId={productId}/>
    </>
  )
}

export default AddProductPage