import React from 'react'
import './loader.css'
function Loader() {
  return (
    <div className='loader-overlay'>
        <div className="order-placing">
            <div className='loader'></div>
            <h2 className="order-placing-h2">
                placing order
            </h2>
        </div>
    </div>
  )
}

export default Loader