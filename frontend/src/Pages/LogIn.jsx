import React from 'react'
import './CSS/loginsignup.css'
import { Link, useNavigate } from 'react-router-dom';
import { Toaster,toast } from 'react-hot-toast';
import { useMutation } from '@apollo/client';
import { USER_LOGIN } from '../query/query';
import { storeData } from '../helper';
import back_icon from '../Component/Assests/back.png'


export const Login = () => {
  const navigate = useNavigate()
  const [mutationFun] = useMutation(USER_LOGIN,{
    onCompleted(data){
      toast('Log in successfull',{icon:"😊",duration:1000})
      storeData(data.login)
      setTimeout(()=>{
        navigate('/')
      },1000)
    },
    onError(){
      toast.error('Someting went wrong...!',{duration:1000})
    }
  })
  function handleSubmit(event){
    event.preventDefault()
    const formData = new FormData(event.target)
    
      const identifier = formData.get("identifier")
      const password = formData.get("password")
    
    if((identifier&&identifier.trim().length !==0) && (password && password.trim().length !==0)){
      mutationFun({variables:{
        identifier,
        password
      }})
    }else if(identifier.includes('.com') || password.trim().length<6){
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
          <input type="text" placeholder='Your Name or email' name='identifier' />
         
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