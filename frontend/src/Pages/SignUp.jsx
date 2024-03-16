import React from 'react'
import './CSS/signup.css'
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { storeData } from '../helper';
import { USER_REGISTRATION } from '../query/query';
import { useMutation } from '@apollo/client';
import back_icon from '../Component/Assests/back.png'

export const SignUp = () => {
  // const navigate = useNavigate()
  // const [mutationFun] = useMutation(USER_REGISTRATION,{
  //   onCompleted(data){
  //     toast('Sign Up successfull',{icon:"😊",duration:1000})
  //     storeData(data.register)
  //     setTimeout(()=>{
  //       navigate('/')
  //     },1000)
  //   },
  //   onError(){
  //     toast.error('Someting went wrong...!',{duration:1000})
  //   }
  // })
  // function handleSubmit(event){
  //   event.preventDefault()
  //   const formData = new FormData(event.target)
    
  //     const username = formData.get("username")
  //     const email = formData.get("email")
  //     const password = formData.get("password")
    
  //   if((username&&username.trim().length !==0) && (password && password.trim().length !==0) && (email&&email.trim().length !==0)){
  //     mutationFun({variables:{
  //       username,
  //       password,
  //       email
  //     }})
  //   }else if(email.includes('.com') || password.trim().length<6 || username.trim().length !==0){
  //     toast(' Enter valid input!',{icon:"⚠️",duration:1000})
  //   }
  // }
  return (
    <>
    <Toaster/>
    <div className="signup">
    <Link to='/'><button className='back-btn'><img src={back_icon} alt="" />Back</button></Link>
      <div className="signup-container">
        <h1>Sign Up</h1>
        <form action="" onSubmit={"handleSubmit"} >
        <div className="signup-fields">
          <input type="text" placeholder='Your Name' name='username' required />
          <input type="email" placeholder='Email Adress' name='email' required />
          <input type="password" placeholder='Password' name='password' required />
        </div>
        <div className="signup-agree">
          <input type="checkbox" name='' id='' />
          <p>By continuing I agree to the terms and conditions</p>
        </div>
        <button type='submit'>Continue</button>
        </form>
        <p className='signup-login'>Already have an account? <span><Link to='/login'>Login</Link></span></p>
       
      </div>
    </div>
    </>
  )
}
export default SignUp;