import React, { useContext, useState } from 'react'
import './addcategoryform.css'
import { useMutation } from '@apollo/client'
import { CREATE_CATEGORY, GET_CATEGORIRS } from '../../query/query'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {Link, useNavigate} from 'react-router-dom'
import { ShopContext } from '../../Context/ShowContext'
function AddCategoryForm() {
  const navigate = useNavigate()
  const {setMenu,theme} = useContext(ShopContext)
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("info");
  const [muationCreateCategory] = useMutation(CREATE_CATEGORY,{
    onCompleted(data){
      handleSnackbarOpen('',"Category created Successfully")
      setTimeout(()=>{
        navigate('/admin/addproduct')
      },1000)
    },
    onError(error){
      handleSnackbarOpen('error',"Something went wrong")

    },
    refetchQueries: [{ query: GET_CATEGORIRS }], 
  })
  function handleSubmit(event){
    event.preventDefault();
    const categoryName = event.target.categoryname.value;
    console.log(categoryName)

    if(categoryName.trim() !==''){
      muationCreateCategory({ 
        variables: { 
          categoryName:categoryName,
        } 
      });
    }else{
      handleSnackbarOpen('',"Enter Valid Inputs")
    }      
};
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
    <div className='admincategory-container' >
      <div onClick={(e) => e.stopPropagation()}>
        <h2 className={theme==='dark-theme'?'admincategory-heading-dark':'admincategory-heading'}>Add Category</h2>
        <form className={theme==='dark-theme'?'admincategory-form admincategory-form-dark':'admincategory-form'} onSubmit={handleSubmit} >
          <div className={theme==='dark-theme'?"admincategory-form-group dark":"admincategory-form-group"}>
            <label htmlFor="name">Category Name:</label>
            <input className='admincategory-input' type="text" id="name" name="categoryname" defaultValue={''} />
          </div>
          <div className="admincategory-action">
          <Link to="/admin/allproducts"><button
                className="admincategory-action-button-cancle"
                type="button"
                onClick={()=>setMenu('allproduct')}
              >
                cancle
              </button></Link>
          <button className={theme==='dark-theme'?'admincategory-action-button-dark':'admincategory-action-button'} disabled={false} type="submit">Add</button>

          </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default AddCategoryForm