import React from 'react'

function Table({data,lable1,lable2,lable3,lable4,lable5,lable6,lable7}) {
    return (
        <>
          <div className="allorderitems">
            <div className="allorderitems-format-main">
              <p>{lable1}</p>
              <p>{lable2}</p>
              <p>{lable3}</p>
              <p>{lable4}</p>
              <p>{lable5}</p>
              <p>{lable6}</p>
              <p>{lable7}</p>
            </div>
            <hr />
            <div className='allorder-list-container'>
            {data.map((item,i) => {
              return (
                <div  key={i}>
                  <div className="allorderitems-format allorderitems-format-main">
                    <img src={"http://localhost:8000/media/" + item} alt="" className='carticon-product-icon' />
                    <p>{item}</p>
                    <p>{item}</p>
                    <p> {item}</p>
                    <button className='allorderitems-quantity'>{item}</button>
                    <p> ₹{item}</p>
                    <p> {item}</p>
                  </div>
                  <hr />
                </div>
              );
            })}
            </div>
          </div>
        </>
      );
}

export default Table