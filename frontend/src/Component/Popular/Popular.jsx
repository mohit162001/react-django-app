import React from 'react'
import './popular.css'
// import data_product from '../Assests/data';
import Item from '../Item/Item';
import { useQuery } from '@apollo/client';
import { GET_POPULAR_PRODUCT } from '../../query/query';
const Popular = () => {
  const {data,error,loading} = useQuery(GET_POPULAR_PRODUCT)
  return (
    <div className='popular'>
        <h1>POPULAR IN WOMEN</h1>
        <hr />

        {error && <p>Something went wrong</p>}
        {loading && !error && <p>Loading Popular Products...</p>}
        {data && !loading && <div className="popular-item">
            {data.products.data.map((item,i)=>{
                return <Item
                key={i}
                id={item.id}
                name={item.attributes.name}
                image={item.attributes.image.data.attributes.url}
                new_price={item.attributes.new_price}
                old_price={item.attributes.old_price}
              />
            })}
        </div>}
    </div>
  )
}

export default Popular