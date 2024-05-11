import React, { useEffect, useState } from 'react'
import AllOrdersItem from '../Component/AllOrderItems/AllOrderItems';
import FallBack from '../Component/FallBack/FallBack';
import { useQuery } from '@apollo/client';
import { GET_ALL_ORDERS } from '../query/query';
import empty_order from '../Component/Assests/empty-order.png';
import right_arrow from '../Component/Assests/breadcrum_arrow.png'
import FilterBar from '../Component/FilterBar/FilterBar';
import './CSS/allorderspage.css'

function AllOrdersPage() {
  const [inputValue,setInputValue] = useState({
    searchInput:'',
    startDate:null,
    endDate:null
    })
    const {data,loading,error} = useQuery(GET_ALL_ORDERS)
    const [fetchedData,setFetchedData]  =useState([])
    const [filteredData,setFilteredData] = useState()
    const [currPage, setCurrPage] = useState(1);
    const totalPages = Math.ceil((data && data.orders.length)/4)
    const filteredDataPage = Math.ceil((filteredData&&filteredData.length)/4)
    useEffect(() => {
      if (data && data.orders) {
        setFetchedData(data.orders);
      }
    }, [data]);
    

    const nextPage = () => {
      setCurrPage((prevPage) => prevPage + 1);
    };
  
    const prevPage = () => {
      setCurrPage((prevPage) => prevPage - 1);
    };
    
    function getFilterData(filterInput){
      setInputValue(filterInput)
      if(filterInput.searchInput && filterInput.searchInput2){
        const filteredArray = fetchedData.filter((item)=>
        (item.username.toLowerCase().includes(filterInput.searchInput.toLowerCase())&&
        item.productName.toLowerCase().includes(filterInput.searchInput2.toLowerCase())))
        setFilteredData([...filteredArray])
      }else if(filterInput.searchInput){
        const filteredArray = fetchedData.filter((item)=>item.username.toLowerCase().includes(filterInput.searchInput.toLowerCase()))
        setFilteredData([...filteredArray])
      }else if(filterInput.searchInput2){
        const filteredArray = fetchedData.filter((item)=>item.productName.toLowerCase().includes(filterInput.searchInput2.toLowerCase()))
        setFilteredData([...filteredArray])
      }else if(filterInput.startDate&&filterInput.endDate){
        const filteredArray = fetchedData.filter((item)=>{ return item.orderDate>=filterInput.startDate&&item.orderDate<=filterInput.endDate})
        setFilteredData([...filteredArray])
      }else if(filterInput.startDate){
        const today =new Date().toISOString().slice(0, 10)
        const filteredArray = fetchedData.filter((item)=>{ return item.orderDate>=filterInput.startDate&&item.orderDate<=today})
        setFilteredData([...filteredArray])
      }else if(filterInput.endDate){
        const filteredArray = fetchedData.filter((item)=>{ return item.orderDate<=filterInput.endDate})
        setFilteredData([...filteredArray])
      } 
      else{
        setFilteredData(undefined)
      }
    }
    if(filteredData){
    console.log("filtered data length---",filteredData.length)

    }
    return (
        <>
          <div className="allorders-page">
            <FilterBar getFilterData={getFilterData} setCurrPage={setCurrPage} placeholder={'search order by user..'} forOrder={true} />
            {error && <p className='product-fallback'>Something went wrong...!</p>}
            {loading && !error && <p className='product-fallback'>Loading orders details...</p>}
            {!error && (filteredData&&filteredData.length === 0) && (<FallBack image={empty_order} heading={"No order found"} btn_lable={"Order now"} setMenuValue={'shop'} link={'/'}/>
            )}
            {!error &&  ((filteredData?filteredData:data) && (filteredData?filteredData:data.orders).length > 0) && 
            <>
                <div>
                <AllOrdersItem orders={filteredData?filteredData:data.orders} currPage={currPage} itemsperPage={4} />
                <div className="pagination">
                  <button className={currPage===1?'order-disable-btn':'pagination-btn'} disabled={currPage===1?true:false} onClick={prevPage} >  <img className='left-arrow' src={right_arrow} alt="" />Previous</button>
                  <button className={(currPage===totalPages|| currPage===filteredDataPage)?'order-disable-btn':'pagination-btn'} disabled={(currPage===totalPages|| currPage===filteredDataPage)?true:false} onClick={nextPage} >Next <img className='rigth-arrow' src={right_arrow} alt="" /> </button>
                </div>
                </div>
            </>
            }
          </div>
        </>
      );
}

export default AllOrdersPage