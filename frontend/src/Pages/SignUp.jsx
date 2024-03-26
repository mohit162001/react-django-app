import React from 'react'
import './CSS/signup.css'
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { storeData } from '../helper';
import { USER_SIGNUP } from '../query/query';
import { useMutation } from '@apollo/client';
import back_icon from '../Component/Assests/back.png'

export const SignUp = () => {
  const navigate = useNavigate()
  const [mutationCreateUser] = useMutation(USER_SIGNUP,{
    onCompleted(data){
      toast('Sign Up successfull',{icon:"😊",duration:1000})
      storeData(data.createUser)
      console.log("new user----",data)
      setTimeout(()=>{ 
        navigate('/')
      },1000)
    },
    onError(error){
      if(error.message.includes('duplicate key value')){
      toast.error('Username already exist',{duration:1000})
      }else{
      toast.error('Someting went wrong...!',{duration:1000})
      }
    }
  })
  function handleSubmit(event){
    event.preventDefault()
    const formData = new FormData(event.target)
    
      const username = formData.get("username")
      const email = formData.get("email")
      const password = formData.get("password")
    if((username&&username.trim().length !==0) && (password.trim().length !==0 && password.length>=6) && (email&&email.trim().length !==0)){
      console.log(username,email,password.length)
      
      mutationCreateUser({variables:{
        username,
        password,
        email
      }})
    }
    else if(email.includes('.com') || password.trim().length<=6 || username.trim().length !==0){
      toast(' Enter valid input!',{icon:"⚠️",duration:1000})
    }
  }
  return (
    <>
    <Toaster/>
    <div className="signup">
    <Link to='/'><button className='back-btn'><img src={back_icon} alt="" />Back</button></Link>
      <div className="signup-container">
        <h1>Sign Up</h1>
        <form action="" onSubmit={handleSubmit} >
        <div className="signup-fields">
          <input type="text" placeholder='Your Name' name='username'  />
          <input type="email" placeholder='Email Adress' name='email'  />
          <input type="password" placeholder='Password' name='password'  />
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