import React, { createContext, useState } from "react";
// import all_product from '../Component/Assests/all_product';
import { isAuthenticated } from "../helper";


export const ShopContext = createContext(null);
var all_product=[];
const getDefalutCart=()=>{
    let cart = {};
    for(let i = 0; i<all_product.length+1; i++){
        cart[i]=0;
    }
    return cart;
}

const ShopContextProvider = (props) => {
    const [cartItems,setCartItems] = useState(getDefalutCart());
    const [menu,setMenu] = useState('shop');
    const [theme,setTheme] = useState('light-theme')
    const addToCart = (itemId) =>{
        if(isAuthenticated()===true){
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
    }
    
    const removeFromCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }

    const getTotalCartAmount = () =>{
        let totalAmount = 0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0){
                let itemInfo = all_product.find((product)=>product.id===Number(item))
                totalAmount += itemInfo.new_price * cartItems[item];
                console.log('boi')
            }
            
        }
        return totalAmount; 
    }

    const getTotalCartItems = () =>{
        let totalItem = 0;
        for(const item in cartItems){
            if(cartItems[item]>0)
            {
                totalItem+= cartItems[item];
            }
        }
        return totalItem;
    }

    function toggleTheme(event){
        if(event.target.checked){
            setTheme('dark-theme')
        }else{
            setTheme('light-theme')

        }
    }
    const contextValue = {getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart,menu,setMenu,theme,toggleTheme};
    
    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider; 