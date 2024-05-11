import React, { useEffect } from 'react'
import './navbar.css'
import logo from '../Assests/logo.png'
import cart_icon from '../Assests/cart_icon.png'
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ShopContext } from '../../Context/ShowContext';
import {  clearData, getUserData, isAdminUser } from '../../helper';
import { useQuery } from '@apollo/client';
import { GET_CART_DETAILS, GET_USER_DETAILS } from '../../query/query';
import avatar from '../Assests/avatar.png'
import admin_image1 from '../Assests/admin_img1.jpg'
import ToggleTheme from '../ThemeToggle/ThemeToggle'

function Navbar() {
    const navigate = useNavigate()
    const {menu,setMenu,toggleTheme,theme,setTheme} = useContext(ShopContext)
    useEffect(()=>{
      document.body.className = theme==="dark-theme"?'dark-theme':'light-theme'
    },[theme])
    useEffect(() => {
      const storedTheme = localStorage.getItem('theme');
      setTheme(storedTheme || 'light-theme'); 
    }, []);
    const token = getUserData('token')
    function handleLogOut(){
        clearData();
        navigate('/login')
    }
    const userId = getUserData('id')
    const {data:userData} = useQuery(GET_USER_DETAILS,{
      variables:{
        userId:userId
      },
      skip:userId?false:true
  
    })
    const {data} = useQuery(GET_CART_DETAILS,{
      variables:{
        userId:userId
      },
      skip:userId?false:true
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
    <div className={theme==='dark-theme'?'navbar-dark-theme':'navbar-light-theme'}>
        <div className={theme==="dark-theme"?"nav-logo-dark":"nav-logo"}>
            <img src={logo} alt="" />
            <p><Link onClick={()=>setMenu('shop')}>CLOTHY</Link></p>
        </div>
        <ul className={theme==="dark-theme"?"nav-menu-dark":"nav-menu"}>
            {!isAdminUser() && <>
              <li onClick={()=>{setMenu('shop')}}><Link style={{textDecoration:'none'}} to='/'>Shop</Link>{menu==='shop'? <hr/>:<></>} </li>
            <li onClick={()=>{setMenu('mens')}}><Link style={{textDecoration:'none'}} to='/mens'>Mens</Link>{menu==='mens' ? <hr/>:<></>}</li>
            <li onClick={()=>{setMenu('womens')}}><Link style={{textDecoration:'none'}} to='/womens'>Womens</Link>{menu==='womens' ? <hr/>:<></>}</li>
            <li onClick={()=>{setMenu('order')}}><Link style={{textDecoration:'none'}} to='/order'>My orders</Link>{menu==='order' ? <hr/>:<></>} </li>
            </>}
            {isAdminUser() && <>
            <li onClick={()=>{setMenu('shop')}}><Link style={{textDecoration:'none'}} to='/'>Shop</Link>{menu==='shop'? <hr/>:<></>} </li>
            <li onClick={()=>{setMenu('statistics')}}><Link style={{textDecoration:'none'}} to='/admin/statistics'>Statistics</Link>{menu==='statistics' ? <hr/>:<></>} </li>
            <li onClick={()=>{setMenu('allproduct')}}><Link style={{textDecoration:'none'}} to='/admin/allproducts'>All products</Link>{menu==='allproduct' ? <hr/>:<></>}</li>
            <li onClick={()=>{setMenu('allorders')}}><Link style={{textDecoration:'none'}} to='/admin/allorders'>All Orders</Link>{menu==='allorders' ? <hr/>:<></>}</li>
            <li onClick={()=>{setMenu('allusers')}}><Link style={{textDecoration:'none'}} to='/admin/allusers'>All Users</Link>{menu==='allusers' ? <hr/>:<></>} </li>
            <li onClick={()=>{setMenu('addproduct')}}><Link style={{textDecoration:'none'}} to='/admin/addproduct'>Add Product</Link>{menu==='addproduct' ? <hr/>:<></>} </li>
            <li onClick={()=>{setMenu('addcategory')}}><Link style={{textDecoration:'none'}} to='/admin/addcategory'>Add Category</Link>{menu==='addcategory' ? <hr/>:<></>} </li>
            </>}
        </ul>
        <div className="nav-login-cart">
            {!isAdminUser() &&<>
            <Link to='/cart' onClick={()=>{setMenu('cart')}}><img className={menu==='cart'?'cart-icon':theme==="dark-theme"?'cart-icon-dark':''} src={cart_icon} alt="" /></Link>
            <div className={menu==='cart'?"nav-cart-count-active":"nav-cart-count"}>{cartValue}</div>
            </>}
            <div className='nav-theme-toggle'>
            <ToggleTheme toggleTheme={toggleTheme}/>
            </div>
            {token && 
            <div className='nav-avatar'>
              <Link to='user'>
                <img onClick={()=>{setMenu('user')}} className={menu==='user'?'nav-avatar-img-active':'nav-avatar-img'} src={isAdminUser()?admin_image1:
                  (userData && userData.userDetails.image?`http://localhost:8000/media/${userData.userDetails.image}`
                  :avatar )} alt="alternative" />
              </Link>
              
            </div>}
            
            {token? <Link onClick={handleLogOut}><button>Log out</button></Link>: <Link to='/login'><button>Login</button></Link>}
        </div>
    </div>
  )
}

export default Navbar