import React, { useContext, useState } from "react";
import "./addproductform.css";
import { useNavigate, Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import {  CREATE_PRODUCT,  GET_CATEGORIRS,  UPDATE_PRODUCT_DETAILS,  GET_ALL_PRODUCTS,  GET_PRODUCT_BY_ID,  GET_NEW_COLLECTION, GET_ALL_ORDERS,} from "../../query/query";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Model from '../Model/Model'
import { ShopContext } from "../../Context/ShowContext";
function AddProductForm({ productData, productId }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [model,setModel] = useState(false)

  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("info");
  const {setMenu,theme} = useContext(ShopContext)
  const { data } = useQuery(GET_CATEGORIRS);
  const [mutationProductUpdate] = useMutation(UPDATE_PRODUCT_DETAILS, {
    onCompleted() {
      handleSnackbarOpen('',"Item Updated Successfully")
      setTimeout(() => {
        navigate("/admin/allproducts");
      }, 1000);
    },
    onError() {
      handleSnackbarOpen('error',"Something went wrong")
    },
    refetchQueries: [{ query: GET_ALL_PRODUCTS },{query:GET_PRODUCT_BY_ID, variables:{productId:productId} },{ query: GET_ALL_ORDERS }]
  });

  const [muationCreateProduct] = useMutation(CREATE_PRODUCT, {
    onCompleted(data) {
      handleSnackbarOpen('',"Item Created Successfully")
      setTimeout(() => {
        navigate("/admin/allproducts");
      }, 1000);
    },
    onError(error) {
      handleSnackbarOpen('error',"Something went wrong")
    },
    refetchQueries: [{ query: GET_ALL_PRODUCTS,variables:{searchInput:'',category:'',startDate:null,endDate:null} },{query:GET_NEW_COLLECTION}],
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const desc = event.target.desc.value;
    const price = parseFloat(event.target.price.value);
    const category = event.target.category.value;
    const imageFile = event.target.image.files[0];

    if (name.trim() !== "" && desc && price > 0 && category) {
      if (productData) {
        if (imageFile) {
          const reader = new FileReader();
          reader.readAsDataURL(imageFile);

          reader.onloadend = () => {
            const imageBase64 = reader.result;
            // console.log(imageBase64);
            mutationProductUpdate({
              variables: {
                productId: productId,
                name: name,
                price: price,
                desc: desc,
                categoryName: category,
                image: imageBase64,
              },
            });
          };
        }else{
          mutationProductUpdate({
            variables: {
              productId:productId,
              name: name,
              price: price,
              desc: desc,
              categoryName: category,
              image: null,
            },
          });
        }
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);

        reader.onloadend = () => {
          const imageBase64 = reader.result;
          // console.log(imageBase64);
          muationCreateProduct({
            variables: {
              name: name,
              price: price,
              desc: desc,
              categoryName: category,
              image: imageBase64,
            },
          });
        };
      }
    } else {
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
  function handleModel(){
    setModel((prev)=>!prev)
  }
  return (
    <>
      <Snackbar open={open} autoHideDuration={1500} onClose={handleSnackbarClose} anchorOrigin={{vertical:"top",horizontal:"center"}}>
        <MuiAlert elevation={6}   severity={severity} sx={{fontSize: "1.4rem",width:"100%",background:"#ffc250",fontWeight:600}}>
         {message}
       </MuiAlert>
      </Snackbar>
      {model&&<Model handleModel={handleModel} img={productData&&productData.productImage}/>}
      <div className="adminproduct-container">
        <div>
          <h2 className={theme==='dark-theme'?"adminproduct-heading dark":"adminproduct-heading"}>Add Product</h2>
          <form className={theme==='dark-theme'?"adminproduct-form adminproduct-form-dark":"adminproduct-form"} onSubmit={handleSubmit}>
            <div className={theme==='dark-theme'?"adminproduct-form-group dark":"adminproduct-form-group"}>
              <label htmlFor="name">Product Name:</label>
              <input
                className="adminproduct-input"
                type="text"
                id="name"
                name="name"
                defaultValue={productData && productData.productName}
              />
            </div>
            <div className={theme==='dark-theme'?"adminproduct-form-group dark":"adminproduct-form-group"}>
              <label htmlFor="desc">Description:</label>
              <textarea
                className="adminproduct-input"
                rows={4}
                type="text"
                id="desc"
                name="desc"
                defaultValue={productData && productData.productDesc}
              />
            </div>
            <div className={theme==='dark-theme'?"adminproduct-form-group dark":"adminproduct-form-group"}>
              <label htmlFor="price">Price:</label>
              <input
                className="adminproduct-input"
                type="number"
                id="price"
                name="price"
                defaultValue={productData && productData.productPrice}
              />
            </div>
            <div className={theme==='dark-theme'?"adminproduct-form-group dark":"adminproduct-form-group"}>
              <label htmlFor="category">Category:</label>
              <select 
                className="adminproduct-select"
                name="category"
                id="category"
              >
                {productData && (
                  <>
                  <option value={productData.productCategory}>
                    {productData.productCategory}
                  </option>
                  {data &&
                    data.categories.edges.map((item, i) => {
                      return (
                        <option key={i} value={item.node.name}>
                          {item.node.name}
                        </option>
                      );
                    })}
                    </>
                )}
                {data && !productData&&
                    data.categories.edges.map((item, i) => {
                      return (
                        <option key={i} value={item.node.name}>
                          {item.node.name}
                        </option>
                      );
                    })}
                
              </select>
            </div>
            <div className={theme==='dark-theme'?"adminproduct-form-img dark":"adminproduct-form-img"}>
              <label htmlFor="address">Image:</label>
              <input
                className="adminproduct-input-img"
                type="file"
                id="image"
                name="image"
                accept="image/*"
              
              />
              
             {productData &&  <img onClick={handleModel} className="product-img-view" src={"http://localhost:8000/media/"+productData.productImage} alt="" />}
            </div>
            <div className="adminproduct-action">
              <Link to="/admin/allproducts">
                <button
                  onClick={()=>setMenu('allproduct')}
                  className="adminproduct-action-button-cancle"
                  type="button"
                >
                  cancle
                </button>
              </Link>
              <button
                className={theme==='dark-theme'?"adminproduct-action-button-dark":"adminproduct-action-button"}
                disabled={false}
                type="submit"
              >
                {productData ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddProductForm;
