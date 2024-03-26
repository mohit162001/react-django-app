import React, { useState } from 'react'
import FallBack from '../Component/FallBack/FallBack';
import { useQuery } from '@apollo/client';
import {  GET_ALL_PRODUCTS } from '../query/query';
import empty_order from '../Component/Assests/empty-order.png';
import right_arrow from '../Component/Assests/breadcrum_arrow.png'
import AllProducts from '../Component/AllProducts/AllProducts';
function AllProductsPage() {
    const {data,loading,error} = useQuery(GET_ALL_PRODUCTS)
    const [currPage, setCurrPage] = useState(1);
    // console.log(data)
    const totalPages = Math.ceil((data && data.products.edges.length)/4)
    // console.log("total item",data && data.products.edges.length)
    // console.log("total pages",totalPages)
    // console.log("curr page",currPage)
    const nextPage = () => {
      setCurrPage((prevPage) => prevPage + 1);
    };
  
    const prevPage = () => {
      setCurrPage((prevPage) => prevPage - 1);
    };
    return (
        <>
          {error && <p className='product-fallback'>Something went wrong...!</p>}
          {loading && !error && <p className='product-fallback'>Loading products details...</p>}
          {!error && data && data.products.edges.length > 0 && <>
              <div>
              <AllProducts products={data.products.edges} currPage={currPage} itemsperPage={4} />
              <div className="pagination">
                <button className={currPage===1?'order-disable-btn':'pagination-btn'} disabled={currPage===1?true:false} onClick={prevPage} >  <img className='left-arrow' src={right_arrow} alt="" />Previous</button>
                <button className={currPage===totalPages?'order-disable-btn':'pagination-btn'} disabled={currPage===totalPages?true:false} onClick={nextPage} >Next <img className='rigth-arrow' src={right_arrow} alt="" /> </button>
              </div>
              </div>
            </>
          }
          {!error && data && data.products.edges.length === 0 && (<FallBack image={empty_order} heading={"No order found"} btn_lable={"Order now"} setMenuValue={'shop'} link={'/'}/>
          )}
        </>
      );
}

export default AllProductsPage