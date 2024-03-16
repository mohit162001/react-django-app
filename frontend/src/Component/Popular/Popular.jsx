import React from 'react'
import './popular.css'
// import data_product from '../Assests/data';
import Item from '../Item/Item';
import { useQuery } from '@apollo/client';
import { GET_POPULAR_PRODUCT, GET_PRODUCTS_BY_CATEGORY } from '../../query/query';
const Popular = () => {
  const {data,error,loading} = useQuery(GET_PRODUCTS_BY_CATEGORY,{
    variables: { categoryId: '2' }
  })
  return (
    <div className='popular'>
        <h1>POPULAR IN WOMEN</h1>
        <hr />

        {error && <p>Something went wrong</p>}
        {loading && !error && <p>Loading Popular Products...</p>}
        {data && !loading && <div className="popular-item">
            {data.productByCategory.map((item,i)=>{
                return <Item
                key={i}
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.price}
                old_price={0}
              />
            })}
        </div>}
    </div>
  )
}

export default Popular