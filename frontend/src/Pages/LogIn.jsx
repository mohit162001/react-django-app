import React from 'react'
import './CSS/loginsignup.css'
import { Link, useNavigate } from 'react-router-dom';
import { Toaster,toast } from 'react-hot-toast';
import { useMutation } from '@apollo/client';
import { USER_LOGIN } from '../query/query';
import { isAdmin, isAdminUser, storeData } from '../helper';
import back_icon from '../Component/Assests/back.png'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


export const Login = () => {
  // const navigate = useNavigate()
  const history = useHistory()
  const [mutationFun] = useMutation(USER_LOGIN,{
    onCompleted(data){
      // toast('Log in successfull',{icon:"😊",duration:1000})
      storeData(data.userLogin)
      setTimeout(()=>{
        if(isAdmin()){
          console.log('admin')
          history.push('/admin')
        }else{
          console.log('user')
          history.push('/')
          
        }
      },1000)
    },
    onError(error){
      if(error.message.includes("Invalid")){
      toast.error('Invalid username or password',{duration:1000})

      }else{
      toast.error('Someting went wrong...!',{duration:1000})
      }}
  })
  function handleSubmit(event){
    event.preventDefault()
    const formData = new FormData(event.target)
    
      const username = formData.get("username")
      const password = formData.get("password")
    
    if((username&&username.trim().length !==0) && (password && password.trim().length !==0)){
      mutationFun({variables:{
        username,
        password
      }})
    }else if(!username || password.trim().length<6){
      toast(' Enter valid input!',{icon:"⚠️",duration:1000})
    }
  }
  return (
    <>
    <Toaster />
    <div className="loginsignup">
      <Link to='/'><button className='back-btn'><img src={back_icon} alt="" />Back</button></Link>
      <div className="loginsignup-container">
        <h1>Log In</h1>
        <form action="" onSubmit={handleSubmit}>
        <div className="loginsignup-fields">
          <input type="text" placeholder='Your Name or email' name='username' />
         
          <input type="password" placeholder='Password' name='password'  />
        </div>
        <button type='submit'>Continue</button>
        </form>
        <p className='loginsignup-login'>Don't have an account? <span><Link to='/signup'>Sign Up</Link></span></p>
  
      </div>
    </div>
    </>
  )
}
export default Login;