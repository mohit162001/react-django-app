import React, { useState } from "react";
import "./CSS/loginsignup.css";
import { Link, useNavigate } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { ALL_USERS_DETAILS, USER_LOGIN } from "../query/query";
import { isAdminUser, storeData } from "../helper";
import back_icon from "../Component/Assests/back.png";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export const Login = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("info");
  const [mutationFun] = useMutation(USER_LOGIN, {
    onCompleted(data) {
      handleSnackbarOpen("", "Log in successfully");
      storeData(data.userLogin);
      setTimeout(() => {
        if (isAdminUser()) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }, 1000);
    },
    onError(error) {
      if (error.message.includes("Invalid")) {
        handleSnackbarOpen("error", "Invalid username or password");
      } else {
        handleSnackbarOpen("error", "Something went wrong");
      }
    },
    refetchQueries: [{ query: ALL_USERS_DETAILS }]
  });
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const username = formData.get("username");
    const password = formData.get("password");

    if (
      username &&
      username.trim().length !== 0 &&
      password &&
      password.trim().length !== 0
    ) {
      mutationFun({
        variables: {
          username,
          password,
        },
      });
    } else if (!username || password.trim().length < 6) {
      handleSnackbarOpen("error", "Invalid input");

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
      <Snackbar open={open} autoHideDuration={1500} onClose={handleSnackbarClose} anchorOrigin={{vertical:"top",horizontal:"center"}}>
        <MuiAlert elevation={6}   severity={severity} sx={{fontSize: "1.4rem",width:"100%",background:"#ffc250",fontWeight:600}}>
         {message}
       </MuiAlert>
      </Snackbar>
      <div className="loginsignup">
        <Link to="/">
          <button className="back-btn">
            <img src={back_icon} alt="" />
            Back
          </button>
        </Link>
        <div className="loginsignup-container">
          <h1>Log In</h1>
          <form action="" onSubmit={handleSubmit}>
            <div className="loginsignup-fields">
              <input
                type="text"
                placeholder="Your Name or email"
                name="username"
              />

        <div className="showpassword">
          <input type={isVisible ? "text" : "password"} placeholder='Password' name='password'  />
          <span onClick={() => setIsVisible((prev) => !prev)} className="password-eye"><i className="far fa-eye"></i></span>
        </div>
            </div>
            <button type="submit">Continue</button>
          </form>
          <p className="loginsignup-login">
            Don't have an account?{" "}
            <span>
              <Link to="/signup">Sign Up</Link>
            </span>
          </p>
        </div>
      </div>
    </>
  );
};
export default Login;
