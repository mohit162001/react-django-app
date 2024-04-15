import React, { useContext } from 'react'
import './popular.css'
// import data_product from '../Assests/data';
import Item from '../Item/Item';
import { useQuery } from '@apollo/client';
import {  GET_POPULAR_PRODUCT } from '../../query/query';
import { ShopContext } from '../../Context/ShowContext';
const Popular = ({heading,query_variable}) => {
  
  const {theme} = useContext(ShopContext)
  const {data,error,loading} = useQuery(GET_POPULAR_PRODUCT,{
    variables: { category_Name: query_variable }
  })
  return (
    <div className='popular'>
        <h1 className={theme==="dark-theme"?'popular-heading dark':'popular-heading'}>{heading}</h1>
        <hr className={theme==="dark-theme"?'popular-hr-dark':'popular-hr'} />

        {error && <p>Something went wrong</p>}
        {loading && !error && <p>Loading Popular Products...</p>}
        {data && !loading && <div className="popular-item">
            {data.popularProduct.edges.slice(0,4).map((item,i)=>{
                return <Item
                key={i}
                id={item.node.id}
                name={item.node.name}
                image={item.node.image}
                new_price={item.node.price}
                old_price={0}
                category={query_variable}
              />
            })}
        </div>} 
    </div>
  )
}

export default Popular