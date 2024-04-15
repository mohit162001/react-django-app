import React, { useContext } from 'react'
import './item.css'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShowContext'
const Item = (props) => {
  const {setMenu,theme} = useContext(ShopContext)
  return (
    <div className={theme==='dark-theme'?"item dark":"item"}>
        <Link onClick={()=>setMenu(props.category?props.category:'')} to={`/product/${props.id}`} ><img onClick={window.scrollTo(0,0)} src={"http://localhost:8000/media/"+props.image} alt={props.name} /></Link>
        <p>{props.name}</p>
        <div className="item-prices">
          <div className={theme==='dark-theme'?"item-price-new dark":"item-price-new"}>
          ₹{props.new_price}
          </div>
          {/* <div className="item-price-old">
          ₹{props.old_price}
          </div> */}
        </div>
    </div>
  )
}

export default Item;