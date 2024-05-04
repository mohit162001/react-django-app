import React, { useContext } from 'react'
import './relatedproduct.css'
// import data_product from '../Assests/data'
import Item from '../Item/Item'
import { useQuery } from '@apollo/client'
import { GET_PRODUCTS_BY_CATEGORY } from '../../query/query'
import { ShopContext } from '../../Context/ShowContext'
const RelatedProduct = ({category,curr_productId}) => {
  const {theme} = useContext(ShopContext)
  const {data} = useQuery(GET_PRODUCTS_BY_CATEGORY,{variables:{
    category_Name:category
  }})

  const filtered_arr = data && data.products.edges.filter((item)=>(item.node.id !== curr_productId))
  return (
    <div className="relatedproduct">
        <h1 className={theme==='dark-theme'?'relatedproduct-heading dark':'relatedproduct-heading'}>Related Products</h1>
        <hr className={theme==='dark-theme'?'relatedproduct-hr-dark':'relatedproduct-hr'}/>
        {data && 
        <div className="relatedproduct-item">
            {filtered_arr.slice(0, 4).map((item, i) => {
              return (
                <Item
                key={i}
                id={item.node.id} 
                name={item.node.name}
                image={item.node.image}
                new_price={item.node.price}
                old_price={0}
                category={category}
                />
              );
          })}
        </div>}
    </div>
  )
}

export default RelatedProduct