import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import './fallback.css'

import { ShopContext } from '../../Context/ShowContext';
import { isAdminUser } from '../../helper';
function FallBack({image,heading,btn_lable,setMenuValue,link,admin}) {
    const {setMenu} = useContext(ShopContext)
    return (
        <div className="fallback-container">
          <div className="fallbackimage">
          <img className='fallback-img' src={image} alt="alternate" />
          </div>
          <div className="fallback-info">
          <h2 id="fallback-h2">{heading}</h2>
          {!isAdminUser()&&<p id="default-p2">
              <Link onClick={()=>setMenu(setMenuValue)} to={link}><button className="create-btn">{btn_lable}</button></Link>
          </p>}
          {admin&&<Link onClick={()=>setMenu(setMenuValue)} to={link}><button className="create-btn">{btn_lable}</button></Link>}
          </div>
        </div>
      );
  
    }

export default FallBack;