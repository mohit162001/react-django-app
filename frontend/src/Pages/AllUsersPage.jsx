import React, { useEffect, useState } from 'react'
import AllUsers from '../Component/AllUsers/AllUsers'
import { useQuery } from '@apollo/client'
import FilterBar from '../Component/FilterBar/FilterBar'
import { ALL_USERS_DETAILS } from '../query/query'
import no_item from '../Component/Assests/empty-order.png'
import right_arrow from '../Component/Assests/breadcrum_arrow.png'
import FallBack from '../Component/FallBack/FallBack'

function AllUsersPage() {
    const {data,loading,error} = useQuery(ALL_USERS_DETAILS)
      // console.log(data?.users.length);
      // console.log(data?.users);

      const [currPage, setCurrPage] = useState(1);
      var totalPages=0;

      if(data?.users.length===5){
        if(data?.users[4].role.role==="admin"){
          const pages = Math.ceil((data && data.users.length)/4)
          totalPages = pages -1
        }else{
          totalPages = Math.ceil((data && data.users.length)/4)
        }
      }
      console.log("totalPages",totalPages)

      const nextPage = () => {
        setCurrPage((prevPage) => prevPage + 1);
      };
    
      const prevPage = () => {
        setCurrPage((prevPage) => prevPage - 1);
      };
  return (
    <>
        <div className="allproducts-page">
          
          {error && <p className='product-fallback'>Something went wrong...!</p>}
          {loading && !error && <p className='product-fallback'>Loading users details...</p>}
          {!error && data && data.users.length > 0 && <>
              <div>
              <AllUsers users={data.users} currPage={currPage} itemsperPage={4} />
              <div className="pagination">
                <button className={currPage===1?'order-disable-btn':'pagination-btn'} disabled={currPage===1?true:false} onClick={prevPage} >  <img className='left-arrow' src={right_arrow} alt="" />Previous</button>
                <button className={currPage===totalPages?'order-disable-btn':'pagination-btn'} disabled={currPage===totalPages?true:false} onClick={nextPage} >Next <img className='rigth-arrow' src={right_arrow} alt="" /> </button>
              </div>
              </div>
            </>
          }
          {!error && data && data.users.length === 0 && (<FallBack image={no_item} heading={"No Product found"} btn_lable={"Order now"} setMenuValue={'shop'} link={'/'}/>
          )}
        </div>
        </>
  )
}

export default AllUsersPage