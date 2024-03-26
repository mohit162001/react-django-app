import React from 'react';
import './allproducts.css';
import { useMutation } from '@apollo/client';
import { DELETE_PRODUCT, GET_ALL_PRODUCTS } from '../../query/query';
import toast, { Toaster } from 'react-hot-toast';
import delete_icon from '../Assests/delete-icon.png'
import edit_icon from '../Assests/edit-icon.png'
import { Link } from 'react-router-dom';

function AllProducts({ products, currPage, itemsperPage }) {

  const start = (currPage - 1) * itemsperPage;
  const end = start + itemsperPage;

  const [mutationProductDelete,{data}] = useMutation(DELETE_PRODUCT,{
    onCompleted(){
        toast.success("Product deleted successfully",{duration:1000})
    },
    onError(){
        toast.error("Can not delete ")
    },
    refetchQueries: [{ query: GET_ALL_PRODUCTS }]
  })

  function handleDelete(productId){
    console.log(productId)
    mutationProductDelete({
        variables:{
            productId:productId
        }
    })
  }
  return (
    <>
    <Toaster/>
      <div className="allproduct">
        <div className="allproduct-format-main">
          <p>Product</p>
          <p>Title</p>
          <p>Price</p>
          {/* <p>Descrtiption</p> */}
          <p>Created at</p>
          <p>Category</p>
          <p>Action</p>
        </div>
        <hr className='allproduct-hr'/>
        <div className='allproduct-list-container'>
        {products.slice(start, end).map((item,i) => {
          return (
            <div  key={i}>
              <div className="allproduct-format allproduct-format-main">
                <Link to={'/product/'+item.node.id}><img src={"http://localhost:8000/media/" + item.node.image} alt="" className='carticon-product-icon' /></Link>
                <p className='allproduct-p'>{item.node.name}</p>
                <p className='allproduct-p'>₹{item.node.price}</p>
                {/* <p> {item.node.desc}</p> */}
                <p > {item.node.insertedDate}</p>
                <p className='allproduct-p'> {item.node.category.name}</p>
                <div className='allproduct-action'>
                <Link to={'/admin/addproduct/'+item.node.id}><img src={edit_icon} className='allproduct-action-btn'/></Link>
                <img src={delete_icon} onClick={()=>handleDelete(item.node.id)} className='allproduct-action-btn'/>
                </div>
              </div>
              <hr className='allproduct-hr'/>
            </div>
          );
        })}
        </div>
      </div>
    </>
  );
}

export default AllProducts;
