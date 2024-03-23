import React from 'react'
import './navbar.css'
import logo from '../Assests/logo.png'
import cart_icon from '../Assests/cart_icon.png'
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ShopContext } from '../../Context/ShowContext';
import {  clearData, getUserData, isAdminUser } from '../../helper';
import { useQuery } from '@apollo/client';
import { GET_CART_DETAILS } from '../../query/query';
import avatar from '../Assests/avatar.png'
import admin_image1 from '../Assests/admin_img1.jpg'

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
      const total= data.userCart.reduce((acc,cur)=>(acc+cur.quantity),0)
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
            {!isAdminUser() && <>
              <li onClick={()=>{setMenu('shop')}}><Link style={{textDecoration:'none'}} to='/'>Shop</Link>{menu==='shop'? <hr/>:<></>} </li>
            <li onClick={()=>{setMenu('mens')}}><Link style={{textDecoration:'none'}} to='/mens'>Mens</Link>{menu==='mens' ? <hr/>:<></>}</li>
            <li onClick={()=>{setMenu('womens')}}><Link style={{textDecoration:'none'}} to='/womens'>Womens</Link>{menu==='womens' ? <hr/>:<></>}</li>
            <li onClick={()=>{setMenu('order')}}><Link style={{textDecoration:'none'}} to='/order'>My orders</Link>{menu==='order' ? <hr/>:<></>} </li>
            </>}
            {isAdminUser() && <>
            <li onClick={()=>{setMenu('shop')}}><Link style={{textDecoration:'none'}} to='/'>Shop</Link>{menu==='shop'? <hr/>:<></>} </li>
            <li onClick={()=>{setMenu('allproduct')}}><Link style={{textDecoration:'none'}} to='/admin/allproducts'>All products</Link>{menu==='allproduct' ? <hr/>:<></>}</li>
            <li onClick={()=>{setMenu('allorders')}}><Link style={{textDecoration:'none'}} to='/admin/allorders'>All Orders</Link>{menu==='allorders' ? <hr/>:<></>}</li>
            <li onClick={()=>{setMenu('addproduct')}}><Link style={{textDecoration:'none'}} to='/admin/addproduct'>Add Product</Link>{menu==='addproduct' ? <hr/>:<></>} </li>
            <li onClick={()=>{setMenu('addcategory')}}><Link style={{textDecoration:'none'}} to='/admin/addcategory'>Add Category</Link>{menu==='addcategory' ? <hr/>:<></>} </li>
            </>}
        </ul>
        <div className="nav-login-cart">
            {!isAdminUser() &&<>
            <Link to='/cart' onClick={()=>{setMenu('cart')}}><img src={cart_icon} alt="" /></Link>
            <div className="nav-cart-count">{cartValue}</div>
            </>}
            {token && <div className='nav-avatar'><Link to='user'><img onClick={()=>{setMenu('')}} className='nav-avatar-img' src={isAdminUser()?admin_image1:avatar} alt="" /></Link></div>}
            {token? <Link onClick={handleLogOut}><button>Log out</button></Link>: <Link to='/login'><button>Login</button></Link>}
        </div>
    </div>
  )
}

export default Navbar