import React from "react";
import "./userformmodel.css";
import { useMutation } from "@apollo/client";
import { GET_USER_DETAILS, UPDATE_USER_DETAILS } from "../../query/query";
import toast, { Toaster } from "react-hot-toast";
function UserFormModel({ username, email, address, handleClose, userId }) {
  const [mutationFun] = useMutation(UPDATE_USER_DETAILS, {
    onCompleted() {
      // console.log(data)
      toast.success("Profile Updated Successfully", { duration: 1000,style: {
        backgroundColor: "orange",
        color: "black",
        borderRadius: "8px",
        padding: "16px 40px 16px 40px",
        fontSize: "1.2rem",
        fontWeight:400
      }, });
      setTimeout(() => {
        handleClose();
      }, 1000);
    },
    onError() {
      toast.error("Someting went wrong...!", { duration: 1000,style: {
        backgroundColor: "orange",
        color: "black",
        borderRadius: "8px",
        padding: "16px 40px 16px 40px",
        fontSize: "1.2rem",
        fontWeight:400
      }, });
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
      toast.error("Enter valid Username and Email", { duration: 1000 });
    }
  }

  return (
    <>
      <Toaster />
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
