import React, { useState } from 'react'
import './CSS/signup.css'
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { storeData } from '../helper';
import { ALL_USERS_DETAILS, USER_SIGNUP } from '../query/query';
import { useMutation } from '@apollo/client';
import back_icon from '../Component/Assests/back.png'
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export const SignUp = () => {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("info");
  const [mutationCreateUser] = useMutation(USER_SIGNUP,{
    onCompleted(data){
      handleSnackbarOpen("", "Signup successfully");
      storeData(data.createUser)
      // console.log("new user----",data)
      setTimeout(()=>{ 
        navigate('/')
      },1000)
    },
    onError(error){
      if(error.message.includes('duplicate key value')){
      handleSnackbarOpen('error',"Username already exist");
      // toast.error('Username already exist',{duration:1000})
      }else{
      toast.error('Someting went wrong...!',{duration:1000})
      }
    },
    refetchQueries: [{ query: ALL_USERS_DETAILS }]
  })
  function handleSubmit(event){
    // const [warn,setWarn]
    event.preventDefault()
    const formData = new FormData(event.target)
    
      const username = formData.get("username")
      const email = formData.get("email")
      const password = formData.get("password")
    if((username&&username.trim().length !==0) && (password.trim().length !==0 && password.length>=8) && (email&&email.trim().length !==0)){
      let regex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@.#$!%*?&]{8,15}$/; 
      if(regex.test(password)){
        mutationCreateUser({variables:{
          username,
          password,
          email
        }})
      }else{
        toast(
          "Please enter strong password\n\nPassword must include [a-Z],[0-9]",{
            duration: 3000,
            position:"bottom-right",
            style:{background:"orange",fontSize:"1.1rem",fontWeight:"400"}
          }
        );
      }   
    }
    else if(email.includes('.com') || (password.length<8 && !password) || username.trim().length !==0){
      toast(
        "Please enter valid input\n\nPassword must contain 8 characters",{
          duration: 4000,
          position:"top-right",
          style:{background:"orange",fontSize:"1.1rem",fontWeight:"400"}
        }
      );
    }
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
    <Toaster/>
    <Snackbar open={open} autoHideDuration={1000} onClose={handleSnackbarClose} anchorOrigin={{vertical:"top",horizontal:"center"}}>
        <MuiAlert elevation={6}   severity={severity} sx={{fontSize: "1.4rem",width:"100%",background:"#ffc250",fontWeight:600}}>
         {message}
       </MuiAlert>
      </Snackbar>
    <div className="signup">
    <Link to='/'><button className='back-btn'><img src={back_icon} alt="" />Back</button></Link>
      <div className="signup-container">
        <h1>Sign Up</h1>
        <form action="" onSubmit={handleSubmit} >
        <div className="signup-fields">
          <input type="text" placeholder='Your Name' name='username'  />
          <input type="email" placeholder='Email Adress' name='email'  />
          <div className="showpassword">
          <input type={isVisible ? "text" : "password"} placeholder='Password' name='password'  />
          <span onClick={() => setIsVisible((prev) => !prev)} className="password-eye"><i className="far fa-eye"></i></span>
          </div>
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