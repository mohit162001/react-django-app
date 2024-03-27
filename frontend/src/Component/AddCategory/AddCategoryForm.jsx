import React, { useContext } from 'react'
import './addcategoryform.css'
import { useMutation } from '@apollo/client'
import { CREATE_CATEGORY, GET_CATEGORIRS } from '../../query/query'
import toast, { Toaster } from 'react-hot-toast'
import {Link} from 'react-router-dom'
import { ShopContext } from '../../Context/ShowContext'
function AddCategoryForm() {
  const {setMenu} = useContext(ShopContext)
  const [muationCreateCategory] = useMutation(CREATE_CATEGORY,{
    onCompleted(data){
      // console.log("message",data)
      toast.success("Category Created Successfully",{duration:1500,style: {
        backgroundColor: "orange",
        color: "black",
        borderRadius: "8px",
        padding: "16px 40px 16px 40px",
        fontSize: "1.2rem",
        fontWeight:400
      },})
    },
    onError(error){
        toast.error("Something went wrong",{duration:1500,style: {
          backgroundColor: "orange",
          color: "black",
          borderRadius: "8px",
          padding: "16px 40px 16px 40px",
          fontSize: "1.2rem",
          fontWeight:400
        },})
    },
    refetchQueries: [{ query: GET_CATEGORIRS }], 
  })
  function handleSubmit(event){
    event.preventDefault();
    const categoryName = event.target.categoryname.value;
    // console.log(categoryName)

    if(categoryName.trim() !==''){
      muationCreateCategory({ 
        variables: { 
          name:categoryName,
        } 
      });
    }else{
        toast.error("Enter Valid Inputs",{duration:1500})
    }      
};


  return (
    <>
    <Toaster/>
    <div className='admincategory-container' >
      <div onClick={(e) => e.stopPropagation()}>
        <h2 className='admincategory-heading'>Add Category</h2>
        <form className='admincategory-form' onSubmit={handleSubmit} >
          <div className="admincategory-form-group">
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
          <button className='admincategory-action-button' disabled={true} type="submit">Add</button>

          </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default AddCategoryForm