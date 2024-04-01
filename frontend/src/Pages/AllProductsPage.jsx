import React, { useState } from 'react'
import FallBack from '../Component/FallBack/FallBack';
import { useQuery } from '@apollo/client';
import {  GET_ALL_PRODUCTS } from '../query/query';
import no_item from '../Component/Assests/empty-order.png'
import right_arrow from '../Component/Assests/breadcrum_arrow.png'
import AllProducts from '../Component/AllProducts/AllProducts';
import FilterBar from '../Component/FilterBar/FilterBar';
import './CSS/allproductspage.css'


function AllProductsPage() {
    const [inputValue,setInputValue] = useState({
      searchInput:'',
      selected:'',
      startDate:null,
      endDate:null
    })
    const {data,loading,error,refetch} = useQuery(GET_ALL_PRODUCTS,{
      variables:{
        searchInput:(inputValue.searchInput),
        category:inputValue.selected,
        startDate:inputValue.startDate,
        endDate:inputValue.endDate
      }
    })
    const [currPage, setCurrPage] = useState(1);
    const totalPages = Math.ceil((data && data.products.edges.length)/4)

    const nextPage = () => {
      setCurrPage((prevPage) => prevPage + 1);
    };
  
    const prevPage = () => {
      setCurrPage((prevPage) => prevPage - 1);
    };

    function getFilterData(data){
      setInputValue(data)
      console.log(data)
      refetch()
    }
    return (
        <>
        <div className="allproducts-page">
          <FilterBar getFilterData={getFilterData} setCurrPage={setCurrPage} placeholder={'search product..'} forProduct={true}/>
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
          {!error && data && data.products.edges.length === 0 && (<FallBack image={no_item} heading={"No Product found"} btn_lable={"Order now"} setMenuValue={'shop'} link={'/'}/>
          )}
        </div>
        </>
      );
}

export default AllProductsPage