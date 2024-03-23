import React from 'react'
import './addproductform.css'
import { useMutation, useQuery } from '@apollo/client'
import { CREATE_PRODUCT, GET_CATEGORIRS } from '../../query/query'
import toast, { Toaster } from 'react-hot-toast'
function AddProductForm({handleClose}) {

    const {data} = useQuery(GET_CATEGORIRS)

    const [muationCreateProduct] = useMutation(CREATE_PRODUCT,{
        onCompleted(data){
          console.log("message",data)
          toast.success("Item Created Successfully",{duration:1500})
        },
        onError(error){
            toast.error("Something went wrong",{duration:1500})
        } 
      })
      const handleSubmit = async (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const desc = event.target.desc.value;
        const price = parseFloat(event.target.price.value);
        const category = event.target.category.value;
        const imageFile = event.target.image.files[0];
        // console.log(name)
        // console.log(price)
        // console.log(desc)
        // console.log(imageFile)
        // console.log(category)
        
        if(name.trim() !=='' && desc && price>0 && category && imageFile){
            const reader = new FileReader();
        reader.readAsDataURL(imageFile);
      
        reader.onloadend = () => {
          const imageBase64 = reader.result;
          console.log(imageBase64)
          muationCreateProduct({ 
            variables: { 
              name:name, 
              price:price,
              desc:desc,
              categoryName:category, 
              image: imageBase64 
            } 
          });
        };
        }else{
            toast.error("Enter Valid Inputs",{duration:1500})
        }      
    };

  return (
    <>
    <Toaster/>
    <div className='adminproduct-container' >
      <div>
        <h2 className='adminproduct-heading'>Add Product</h2>
        <form className='adminproduct-form' onSubmit={handleSubmit} >
          <div className="User-form-group">
            <label htmlFor="name">Product Name:</label>
            <input className='adminproduct-input' type="text" id="name" name="name" defaultValue={''} />
          </div>
          <div className="adminproduct-form-group">
            <label htmlFor="desc">Description:</label>
            <textarea className='adminproduct-input' rows={4} type="text" id="desc" name="desc" defaultValue={''} />
          </div>
          <div className="adminproduct-form-group">
            <label htmlFor="price">Price:</label>
            <input  className='adminproduct-input' type="number" id="price" name="price" defaultValue={''}/>
          </div>
          <div className="adminproduct-form-group">
            <label htmlFor="category">Category:</label>
            <select className='adminproduct-select' name="category" id="category">
                {data && data.categories.edges.map((item,i)=>{
                    return <option key={i} value={item.node.name}>{item.node.name}</option>
                })}
            </select>
          </div>
          <div className="adminproduct-form-img">
            <label htmlFor="address">Image:</label>
            <input  className='adminproduct-input-img' type="file" id="image" name="image" defaultValue={''} accept="image/*"/>
          </div>
          <div className="adminproduct-action">
          <button className='adminproduct-action-button-cancle' type="button" onClick={handleClose}>cancle</button>
          <button className='adminproduct-action-button' disabled={false} type="submit">Add</button>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default AddProductForm