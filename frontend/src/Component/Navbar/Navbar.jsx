import React, { useEffect, useState } from 'react'
import './navbar.css'
import logo from '../Assests/logo.png'
import cart_icon from '../Assests/cart_icon.png'
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ShopContext } from '../../Context/ShowContext';
import { checkAuth, clearData, getUserData } from '../../helper';
import { useQuery } from '@apollo/client';
import { GET_CART_DETAILS } from '../../query/query';
import avatar from '../Assests/avatar.png'

function Navbar({}) {
    const navigate = useNavigate()
    const {menu,setMenu} = useContext(ShopContext)
    // const [fetchData,setFetchData] = useState(false);
    const token = getUserData('token')
    function handleLogOut(){
        clearData();
        navigate('/login')
    }
    const id = getUserData('id')
    const {data} = useQuery(GET_CART_DETAILS,{
      variables:{
        userId:id
      },
    })
    function getTotalQuantity(){
      const total= data.cart.reduce((acc,cur)=>(acc+cur.quantity),0)
      return total
   }
  
    let cartValue=0
    if(data){
        cartValue=getTotalQuantity()
    }
  return (
    <div className="navbar">
        <div className="nav-logo">
            <img src={logo} alt="" />
            <p><Link onClick={()=>setMenu('shop')}>CLOTHY</Link></p>
        </div>
        <ul className="nav-menu">
            <li onClick={()=>{setMenu('shop')}}><Link style={{textDecoration:'none'}} to='/'>Shop</Link>{menu==='shop'? <hr/>:<></>} </li>
            <li onClick={()=>{setMenu('mens')}}><Link style={{textDecoration:'none'}} to='/mens'>Mens</Link>{menu==='mens' ? <hr/>:<></>}</li>
            <li onClick={()=>{setMenu('womens')}}><Link style={{textDecoration:'none'}} to='/womens'>Womens</Link>{menu==='womens' ? <hr/>:<></>}</li>
            <li onClick={()=>{setMenu('order')}}><Link style={{textDecoration:'none'}} to='/order'>My orders</Link>{menu==='order' ? <hr/>:<></>} </li>
        </ul>
        <div className="nav-login-cart">
            <Link to='/cart' onClick={()=>{setMenu('cart')}}><img src={cart_icon} alt="" /></Link>
            <div className="nav-cart-count">{cartValue}</div>
            {/* {token && <div className='avatar'><img src={avatar} alt="" className='avatar-img'/></div>} */}
            {token? <Link onClick={handleLogOut}><button>Log out</button></Link>: <Link to='/login'><button>Login</button></Link>}
        </div>
    </div>
  )
}

export default Navbar