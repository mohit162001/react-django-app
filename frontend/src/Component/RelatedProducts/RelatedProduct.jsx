import React from 'react'
import './relatedproduct.css'
// import data_product from '../Assests/data'
import Item from '../Item/Item'
import { useQuery } from '@apollo/client'
import { GET_PRODUCTS_BY_CATEGORY } from '../../query/query'
const RelatedProduct = ({category}) => {
  const {data} = useQuery(GET_PRODUCTS_BY_CATEGORY,{variables:{
    categoryId:category
  }})
  return (
    <div className="relatedproduct">
        <h1>Related Products</h1>
        <hr />
        {data && 
        <div className="relatedproduct-item">
            {data.productByCategory.slice(1, 4).map((item, i) => {
              return (
                <Item
                  key={i}
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  new_price={item.price}
                  // old_price={item.attributes.old_price}
                />
              );
          })}
        </div>}
    </div>
  )
}

export default RelatedProduct