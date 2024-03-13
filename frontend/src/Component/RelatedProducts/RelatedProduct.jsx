import React from 'react'
import './relatedproduct.css'
// import data_product from '../Assests/data'
import Item from '../Item/Item'
import { useQuery } from '@apollo/client'
import { GET_PRODUCTS_BY_CATEGORY } from '../../query/query'
const RelatedProduct = ({category}) => {
  const {data} = useQuery(GET_PRODUCTS_BY_CATEGORY,{variables:{
    category_name:category
  }})
  return (
    <div className="relatedproduct">
        <h1>Related Products</h1>
        <hr />
        {data && 
        <div className="relatedproduct-item">
            {data.products.data.slice(0, 4).map((item, i) => {
              return (
                <Item
                  key={i}
                  id={item.id}
                  name={item.attributes.name}
                  image={item.attributes.image.data.attributes.url}
                  new_price={item.attributes.new_price}
                  old_price={item.attributes.old_price}
                />
              );
          })}
        </div>}
    </div>
  )
}

export default RelatedProduct