import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import './fallback.css'

import { ShopContext } from '../../Context/ShowContext';
function FallBack({image,heading,btn_lable,setMenuValue,link}) {
    const {setMenu} = useContext(ShopContext)
    return (
        <div className="fallback-container">
          <img src={image} alt="alternate" />
          <div className="fallback-info">
          <h2 id="fallback-h2">{heading}</h2>
          <p id="default-p2">
              <Link onClick={()=>setMenu(setMenuValue)} to={link}><button className="create-btn">{btn_lable}</button></Link>
          </p>
          </div>
        </div>
      );
  
    }

export default FallBack;