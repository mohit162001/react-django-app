import React from 'react'
import './relatedproduct.css'
// import data_product from '../Assests/data'
import Item from '../Item/Item'
import { useQuery } from '@apollo/client'
import { GET_PRODUCTS_BY_CATEGORY } from '../../query/query'
const RelatedProduct = ({category}) => {
  const {data} = useQuery(GET_PRODUCTS_BY_CATEGORY,{variables:{
    category_Name:category
  }})
  return (
    <div className="relatedproduct">
        <h1>Related Products</h1>
        <hr />
        {data && 
        <div className="relatedproduct-item">
            {data.products.edges.slice(1, 4).map((item, i) => {
              return (
                <Item
                key={i}
                id={item.node.id}
                name={item.node.name}
                image={item.node.image}
                new_price={item.node.price}
                old_price={0}
                />
              );
          })}
        </div>}
    </div>
  )
}

export default RelatedProduct