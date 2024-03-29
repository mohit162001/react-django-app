import React from 'react';
import './newcollection.css';
// import new_collections from '../Assests/new_collections'
import Item from '../Item/Item';
import { useQuery } from '@apollo/client';
import { GET_NEW_COLLECTION } from '../../query/query';
const NewCollections = () => {
  const {data,error,loading} = useQuery(GET_NEW_COLLECTION)
  return (
    <section id='newcollection' className="new-collection">
        <h1>NEW COLLECTIONS</h1>
        <hr />
        {error && <p>Something went wrong</p>}
        {loading && !error && <p>Loading New Collections...</p>}
        {data && !loading && <div className="collections">
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
    </section>
  )
}

export default NewCollections