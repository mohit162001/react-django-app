import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { GET_ORDERS_DETAILS } from '../query/query';
import { getUserData } from '../helper';
import FallBack from '../Component/FallBack/FallBack';
import OrdersItem from '../Component/OrdersItem/OrdersItem';
import empty_order from '../Component/Assests/empty-order.png';
import right_arrow from '../Component/Assests/breadcrum_arrow.png'
import '../Component/OrdersItem/ordersitem.css'
function Orders() {
  const userId = getUserData('id');
  const { data, loading, error } = useQuery(GET_ORDERS_DETAILS, {
    variables: {
      userId: userId
    }
  });

  const [currPage, setCurrPage] = useState(1);
  const totalPages = Math.ceil((data && data.userOrders.length)/4)
  const nextPage = () => {
    setCurrPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrPage((prevPage) => prevPage - 1);
  };

  return (
    <>
      {error && <p className='product-fallback'>Something went wrong...!</p>}
      {loading && !error && <p className='product-fallback'>Loading orders details...</p>}
      {!error && data && data.userOrders.length > 0 && <>
          <OrdersItem orders={data} currPage={currPage} userId={userId} itemsperPage={4} />
          {data.userOrders.length>4&& <div className="pagination">
            <button className={currPage===1?'order-disable-btn':'pagination-btn'} disabled={currPage===1?true:false} onClick={prevPage} >  <img className='left-arrow' src={right_arrow} alt="" />Previous</button>
            <button className={currPage===totalPages?'order-disable-btn':'pagination-btn'} disabled={currPage===totalPages?true:false} onClick={nextPage} >Next <img className='rigth-arrow' src={right_arrow} alt="" /> </button>
          </div>}
        </>
      }
      {!error && data && data.userOrders.length === 0 && (<FallBack image={empty_order} heading={"No order found"} btn_lable={"Order now"} setMenuValue={'shop'} link={'/'}/>
      )}
    </>
  );
}

export default Orders;
