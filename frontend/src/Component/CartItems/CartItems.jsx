import React, { useContext, useState } from 'react'
import './cartitems.css'
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// import remove_icon from '../Assests/cart_cross_icon.png'
import delete_icon from '../Assests/delete.png'
import { useMutation, useQuery } from '@apollo/client'
import { ADD_ITEM_TO_CART, CART_REMOVE_ALL, CREATE_USER_ORDER, GET_ALL_ORDERS, GET_CART_DETAILS, GET_ORDERS_DETAILS, GET_PAYMENT_MODES, REMOVE_CART_ITEM, REMOVE_ENTIRE_ITEM } from '../../query/query'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader'
import { ShopContext } from '../../Context/ShowContext'
const CartItems = ({products,refetch,userId}) => {
    const navigate = useNavigate()
    const {theme} = useContext(ShopContext)
    const [quantity] = useState(1)
    const [,setDisable] = useState(false)
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("info");
    const {data} = useQuery(GET_PAYMENT_MODES)
    const [mutationRemoveAll] = useMutation(CART_REMOVE_ALL,{
        refetchQueries: [{ query: GET_CART_DETAILS, variables:{userId:userId} }]
    })

    const [mutaionCreateOrderFun,{data:orderCreated,loading}] = useMutation(CREATE_USER_ORDER,{
        onCompleted(data){
            handleSnackbarOpen('',"Order placedy")
            setTimeout(()=>{
                navigate('/order')
                mutationRemoveAll({variables:{
                userId:userId
            }})
            },1000)   
        },
        onError(error){
            handleSnackbarOpen('error',"Something went wrongy")
        },refetchQueries: [{ query: GET_ORDERS_DETAILS, variables:{userId:userId} },{query:GET_ALL_ORDERS}]
    })
    const [mutationAddItem] = useMutation(ADD_ITEM_TO_CART, {
        onCompleted(data){
          
        },
        onError(error){
            handleSnackbarOpen('error',"Something went wrongy")
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
        window.scrollTo(0,0)
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
     const handleSnackbarOpen = (severity, message) => {
        setSeverity(severity);
        setMessage(message);
        setOpen(true);
      };
    
      const handleSnackbarClose = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
        setOpen(false);
      };
    return (
    <>
    <Snackbar open={open} autoHideDuration={1500} onClose={handleSnackbarClose} anchorOrigin={{vertical:"top",horizontal:"center"}}>
        <MuiAlert elevation={6}   severity={severity} sx={{fontSize: "1.4rem",width:"100%",background:"#ffc250",fontWeight:600}}>
         {message}
       </MuiAlert>
      </Snackbar>
    {loading && <Loader/>}
    <div className={theme==='dark-theme'?"cartitems dark":"cartitems"}>
        <div className={theme==='dark-theme'?"cartitems-format-main dark":"cartitems-format-main"}>
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
                            <div className={theme==="dark-theme"?"cartitems-format cartitems-format-main dark":"cartitems-format cartitems-format-main"}>
                                <img src={"http://localhost:8000/media/"+item.productImage} alt="" className='carticon-product-icon' />
                                <p>{item.productName}</p>
                                <p> ₹{item.productPrice}</p>
                                <div className='cartitems-quantity-container'>
                                    <span onClick={()=>{handleDecrease(item.productId)}} className={theme==='dark-theme'?'cart-quantity-minus-dark':'cart-quantity-minus'}>-</span>
                                     <button className='cartitems-quantity'>{item.quantity}</button>
                                    <span onClick={()=>{handleIncrease(item.productId)}} className={theme==='dark-theme'?'cart-quantity-plus-dark':'cart-quantity-plus'}>+</span>
                                </div>
                                <p> ₹{item.totalPrice}</p>
                                <img src={delete_icon} onClick={()=>{removeEntierItem(item.cartItemId)}} className={theme==="dark-theme"?'delete-icon-dark':'delete-icon'} alt="" />
                                
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