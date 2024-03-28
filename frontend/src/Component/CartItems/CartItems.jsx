import React, { useState } from 'react'
import './cartitems.css'
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// import remove_icon from '../Assests/cart_cross_icon.png'
import delete_icon from '../Assests/delete.png'
import { useMutation, useQuery } from '@apollo/client'
import { ADD_ITEM_TO_CART, CART_REMOVE_ALL, CREATE_USER_ORDER, GET_CART_DETAILS, GET_ORDERS_DETAILS, GET_PAYMENT_MODES, REMOVE_CART_ITEM, REMOVE_ENTIRE_ITEM } from '../../query/query'

import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader'
const CartItems = ({products,refetch,userId}) => {
    const navigate = useNavigate()
    // useEffect(()=>{
    //     refetch()
    //  })
    const [quantity] = useState(1)
    const [,setDisable] = useState(false)

    const {data} = useQuery(GET_PAYMENT_MODES)
    const [mutationRemoveAll] = useMutation(CART_REMOVE_ALL,{
        refetchQueries: [{ query: GET_CART_DETAILS, variables:{userId:userId} }]
    })

    const [mutaionCreateOrderFun,{data:orderCreated,loading}] = useMutation(CREATE_USER_ORDER,{
        onCompleted(data){
            toast("Order placed",{duration:1000,style: {
                backgroundColor: "orange",
                color: "black",
                borderRadius: "8px",
                padding: "16px 40px 16px 40px",
                fontSize: "1.2rem",
                fontWeight:400
              },})
            // console.log(data)
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
    const [mutationAddItem] = useMutation(ADD_ITEM_TO_CART, {
        onCompleted(data){
          toast.success('Item added',{duration:1000})
        },
        onError(error){
            toast.error('Someting went wrong...!',{duration:1000})
        },
        refetchQueries: [{ query: GET_CART_DETAILS, variables:{userId:userId} }],
      });

    const [mutationRemoveItemFun] = useMutation(REMOVE_CART_ITEM,{
        onCompleted(){
            refetch()
        },
        onError(error){
            // console.log(error)
        },
    })
    const [mutationRemoveEntierItem] = useMutation(REMOVE_ENTIRE_ITEM,{
        onCompleted(){
            refetch()
        },
        onError(error){
            // console.log(error)
        },
    })
    function getTotalAmount(){
        const total= products.userCart.reduce((acc,cur)=>(acc+cur.totalPrice),0)
        return total
     }
     
     function removeEntierItem(id) {
        // console.log(id)
        mutationRemoveEntierItem({
            variables:{
                cartItemId:id
            }
        })
     }

     function handleIncrease(id){
        // console.log('inecrese')

        if (quantity >= 1) {
          setDisable(false); 
        }
        mutationAddItem({
            variables: {
              userId: userId,
              productId: id,
            },  
          });
      
      }
      function handleDecrease(id){
        // console.log('decrese')
        if (quantity <= 1) {
          setDisable(true); 
        } 
            mutationRemoveItemFun({
                variables: {
                  userId: userId,
                  productId: id,
                },  
              });
        
      }
     function handleOrders(event){
        event.preventDefault()
        const formData = new FormData(event.target)
        const paymentMode = formData.get('paymentmode')
        // console.log(paymentMode)
        mutaionCreateOrderFun({
            variables:{
                userId:userId,
                paymentMode:paymentMode
            }
        })
     }
    return (
    <>
    {/* {orderCreated && <Toaster/>} */}
    {loading && <Loader/>}
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
                                <div className='cartitems-quantity-container'>
                                    <span onClick={()=>{handleDecrease(item.productId)}} className='cart-quantity-minus'>-</span>
                                     <button className='cartitems-quantity'>{item.quantity}</button>
                                    <span onClick={()=>{handleIncrease(item.productId)}} className='cart-quantity-plus'>+</span>
                                </div>
                                <p> ₹{item.totalPrice}</p>
                                <img src={delete_icon} onClick={()=>{removeEntierItem(item.cartItemId)}} className='delete-icon' alt="" />
                                
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
                    {data && data.paymentMode.edges.map((item)=>(<option key={item.node.id} value={item.node.paymentMode}>{item.node.paymentMode}</option>))}
                    </select>
                    <button type='submit'>PROCEED TO ORDER</button>
                </form>
                
            </div>
        </div>
    </div>
    </>
  )
}

export default CartItems