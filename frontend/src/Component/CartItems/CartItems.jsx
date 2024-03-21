import React, { useEffect } from 'react'
import './cartitems.css'
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// import remove_icon from '../Assests/cart_cross_icon.png'
import delete_icon from '../Assests/delete.png'
import { useMutation, useQuery } from '@apollo/client'
import { CART_REMOVE_ALL, CREATE_USER_ORDER, GET_CART_DETAILS, GET_ORDERS_DETAILS, GET_PAYMENT_MODES, REMOVE_CART_ITEM } from '../../query/query'
import { checkAuth } from '../../helper'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const CartItems = ({products,refetch,userId}) => {
    const navigate = useNavigate()
    useEffect(()=>{
        refetch()
     })

    const {data} = useQuery(GET_PAYMENT_MODES)
    const [mutationRemoveAll] = useMutation(CART_REMOVE_ALL,{
        refetchQueries: [{ query: GET_CART_DETAILS, variables:{userId:userId} }]
    })

    const [mutaionCreateOrderFun] = useMutation(CREATE_USER_ORDER,{
        onCompleted(data){
            toast("Order placed",{icon:"🤩",duration:1000})
            console.log(data)
            setTimeout(()=>{
                navigate('/order')
                mutationRemoveAll({variables:{
                userId:userId
            }})
            },1000)   
        },
        onError(error){
            toast.error("Something went wrong")
        },refetchQueries: [{ query: GET_ORDERS_DETAILS, variables:{userId:userId} }]
    })
    const [mutationRemoveItemFun] = useMutation(REMOVE_CART_ITEM,{
        onCompleted(){
            refetch()
        },
        onError(error){
            console.log(error)
        }
    })
    
    function getTotalAmount(){
        const total= products.userCart.reduce((acc,cur)=>(acc+cur.totalPrice),0)
        return total
     }
     function removeItem(id) {
        if (checkAuth() === true) {
            mutationRemoveItemFun({
            variables: {
              userId: userId,
              productId: id,
            },  
          });
        }

     }

     function handleOrders(event){
        event.preventDefault()
        const formData = new FormData(event.target)
        const paymentMode = formData.get('paymentmode')
        console.log(paymentMode)
        mutaionCreateOrderFun({
            variables:{
                userId:userId,
                paymentMode:paymentMode
            }
        })
     }
    return (
    <>
    <Toaster/>
    <div className="cartitems">
        <div className="cartitems-format-main">
            <p>Product</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr />
        {products && products.userCart.map((item)=>{
                return <div key={item.id}>
                            <div className="cartitems-format cartitems-format-main">
                                <img src={"http://localhost:8000/media/"+item.productImage} alt="" className='carticon-product-icon' />
                                <p>{item.productName}</p>
                                <p> ₹{item.productPrice}</p>
                                <button className='cartitems-quantity'>{item.quantity}</button>
                                <p> ₹{item.totalPrice}</p>
                                <img src={delete_icon} onClick={()=>{removeItem(item.productId)}} className='delete-icon' alt="" />
                                {/* <DeleteOutlineIcon onClick={()=>{removeItem(item.productId)}}/> */}
                            </div>
                            <hr />
                        </div>

        })}
        <div className="cartitems-down">
            <div className="cartitems-total">
                <h1>Cart Totals</h1>
                <div className='cartitem-total-container'>
                    <div className="cartitems-total-item">
                        <p>Subtotal</p>
                        <p> ₹{getTotalAmount()}</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <p>Shipping Fee</p>
                        <p>Free</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <h3>Total</h3>
                        <h3> ₹{getTotalAmount()}</h3>
                    </div>
                </div>
                <form className='orderform' onSubmit={handleOrders}>
                    <select className='orderform-select' name="paymentmode" id="paymentmode">
                    {data && data.paymentMode.map((item)=>(<option key={item.id} value={item.paymentMode}>{item.paymentMode}</option>))}
                    </select>
                    <button disabled type='submit'>PROCEED TO ORDER</button>
                </form>
                
            </div>
        </div>
    </div>
    </>
  )
}

export default CartItems