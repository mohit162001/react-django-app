import React from "react";
import "./addproductform.css";
import { useNavigate, Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_PRODUCT,
  GET_CATEGORIRS,
  UPDATE_PRODUCT_DETAILS,
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_ID,
} from "../../query/query";
import toast, { Toaster } from "react-hot-toast";
function AddProductForm({ productData, productId }) {
  const navigate = useNavigate();
  const { data } = useQuery(GET_CATEGORIRS);
  const [mutationProductUpdate] = useMutation(UPDATE_PRODUCT_DETAILS, {
    onCompleted(data) {
      toast.success("Item Updated Successfully", { duration: 1000 });
      setTimeout(() => {
        navigate("/admin/allproducts");
      }, 1000);
    },
    onError(error) {
      toast.error("Something went wrong", { duration: 1500 });
    },
    refetchQueries: [{ query: GET_ALL_PRODUCTS },{query:GET_PRODUCT_BY_ID, variables:{productId:productId} }]
  });

  const [muationCreateProduct] = useMutation(CREATE_PRODUCT, {
    onCompleted(data) {
      console.log("message", data);
      toast.success("Item Created Successfully", { duration: 1000 });
      setTimeout(() => {
        navigate("/admin/allproducts");
      }, 1000);
    },
    onError(error) {
      toast.error("Something went wrong", { duration: 1500 });
    },
    refetchQueries: [{ query: GET_ALL_PRODUCTS }],
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
            console.log(imageBase64);
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
          console.log(imageBase64);
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
      toast.error("Enter Valid Inputs", { duration: 1500 });
    }
  };

  return (
    <>
      <Toaster />
      <div className="adminproduct-container">
        <div>
          <h2 className="adminproduct-heading">Add Product</h2>
          <form className="adminproduct-form" onSubmit={handleSubmit}>
            <div className="User-form-group">
              <label htmlFor="name">Product Name:</label>
              <input
                className="adminproduct-input"
                type="text"
                id="name"
                name="name"
                defaultValue={productData && productData.productName}
              />
            </div>
            <div className="adminproduct-form-group">
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
            <div className="adminproduct-form-group">
              <label htmlFor="price">Price:</label>
              <input
                className="adminproduct-input"
                type="number"
                id="price"
                name="price"
                defaultValue={productData && productData.productPrice}
              />
            </div>
            <div className="adminproduct-form-group">
              <label htmlFor="category">Category:</label>
              <select
                className="adminproduct-select"
                name="category"
                id="category"
              >
                {productData && (
                  <option value={productData.productCategory}>
                    {productData.productCategory}
                  </option>
                )}
                {data &&
                  data.categories.edges.map((item, i) => {
                    return (
                      <option key={i} value={item.node.name}>
                        {item.node.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="adminproduct-form-img">
              <label htmlFor="address">Image:</label>
              <input
                className="adminproduct-input-img"
                type="file"
                id="image"
                name="image"
                accept="image/*"
              />
            </div>
            <div className="adminproduct-action">
              <Link to="/admin/allproducts">
                <button
                  className="adminproduct-action-button-cancle"
                  type="button"
                >
                  cancle
                </button>
              </Link>
              <button
                className="adminproduct-action-button"
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