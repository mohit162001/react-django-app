import React, { useState } from "react";
import "./userformmodel.css";
import { useMutation } from "@apollo/client";
import { GET_USER_DETAILS, UPDATE_USER_DETAILS } from "../../query/query";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { storeData } from "../../helper";

function UserFormModel({ username, email, address, handleClose, userId }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("info");
  const [mutationFun] = useMutation(UPDATE_USER_DETAILS, {
    onCompleted(data) {
      storeData(data.userUpate)
      handleSnackbarOpen('',"Profile Updated Successfully")
      setTimeout(() => {
        handleClose();
      }, 1000);
    },
    onError() {
      handleSnackbarOpen('error',"Someting went wrong")
    },
    refetchQueries: [
      { query: GET_USER_DETAILS, variables: { userId: userId } },
    ],
  });

  function handleFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("username");
    const email = formData.get("email");
    const address = formData.get("address");
    const imageFile = event.target.image.files[0];

    if (name && name.length !== 0 && email && email.includes("@")) {
      if (imageFile) {
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);

        reader.onloadend = () => {
          const imageBase64 = reader.result;
          mutationFun({
            variables: {
              userId: userId,
              username: name,
              email: email,
              address: address,
              image: imageBase64,
            },
          });
        };
      } else {
        mutationFun({
          variables: {
            userId: userId,
            username: name,
            email: email,
            address: address,
            image:null
          },
        });
      }
    } else {
      handleSnackbarOpen('error',"Enter valid Username and Email")
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

      <div className="modal-overlay">
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <h2>Profile Update</h2>
          <form className="userupdate-form" onSubmit={handleFormSubmit}>
            <div className="User-form-group">
              <label htmlFor="name">Username:</label>
              <input
                className="userform-input"
                type="text"
                id="name"
                name="username"
                defaultValue={username}
              />
            </div>
            <div className="User-form-group">
              <label htmlFor="email">Email:</label>
              <input
                className="userform-input"
                type="email"
                id="email"
                name="email"
                defaultValue={email}
              />
            </div>
            <div className="User-form-group">
              <label htmlFor="address">Address:</label>
              <input
                className="userform-input"
                type="text"
                id="address"
                name="address"
                defaultValue={address}
              />
            </div>
            <div className="User-form-group">
              <label htmlFor="address">Porfile picture:</label>
              <input
                className="userform-input"
                type="file"
                id="image"
                name="image"
                accept="image/*"
              />
            </div>
            <div className="userprofileupdate-action">
              <button
                className="userprofileUpdate-action-button-cancle"
                type="button"
                onClick={handleClose}
              >
                cancle
              </button>
              <button className="userprofileUpdate-action-button" type="submit">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UserFormModel;
