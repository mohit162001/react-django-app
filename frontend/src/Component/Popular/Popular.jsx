import React from 'react'
import './popular.css'
// import data_product from '../Assests/data';
import Item from '../Item/Item';
import { useQuery } from '@apollo/client';
import {  GET_PRODUCTS_BY_CATEGORY } from '../../query/query';
const Popular = () => {
  const {data,error,loading} = useQuery(GET_PRODUCTS_BY_CATEGORY,{
    variables: { category_Name: 'womens' }
  })
  return (
    <div className='popular'>
        <h1>POPULAR IN WOMEN</h1>
        <hr />

        {error && <p>Something went wrong</p>}
        {loading && !error && <p>Loading Popular Products...</p>}
        {data && !loading && <div className="popular-item">
            {data.products.edges.map((item,i)=>{
                return <Item
                key={i}
                id={item.node.id}
                name={item.node.name}
                image={item.node.image}
                new_price={item.node.price}
                old_price={0}
              />
            })}
        </div>}
    </div>
  )
}

export default Popular