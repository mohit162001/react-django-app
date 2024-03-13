import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShowContext';
import { useParams } from 'react-router-dom';
import ProductDisplay from '../Component/ProductDisplay/ProductDisplay';
import RelatedProduct from '../Component/RelatedProducts/RelatedProduct';
import { useQuery } from '@apollo/client';
import { GET_PRODUCT_BY_ID } from '../query/query';
import './CSS/product.css'
export const Product = () => {

  const {productId} = useParams();
  const {data,error,loading} = useQuery(GET_PRODUCT_BY_ID,{
    variables:{
      id: productId
    },
  })

  return (
    <div>
      {error && <p className='product-fallback'>Something went wrong...!</p>}
      {loading && !error && <p className='product-fallback'>Loading product details...</p>}
      {data && !error && <>
        <ProductDisplay product={data.product.data.attributes} id={productId}/>
        <RelatedProduct category={data.product.data.attributes.category.data.attributes.category_name}/>
      </>}
    </div>
  )
}
export default Product;