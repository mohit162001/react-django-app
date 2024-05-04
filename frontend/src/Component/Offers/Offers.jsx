import React, { useContext } from 'react'
import './offers.css';
import exclusive_image from '../Assests/exclusive_image.png';
import { ShopContext } from '../../Context/ShowContext';

const Offers = () => {
  const {theme} = useContext(ShopContext)
  return (
    <div className={theme==='dark-theme'?"offers-dark":"offers"}>
        <div className="offers-left">
            <h1>Exclusive</h1>
            <h1>Offers For You</h1>
            <p>ONLY ON BEST SELLERS PRODUCTS</p>
            <button>Check Now</button>
        </div>
        <div className="offers-right"> 
            <img src={exclusive_image} alt="alternative" />
        </div>
    </div>
  )
}

export default Offers;