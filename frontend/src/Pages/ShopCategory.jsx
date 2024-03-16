import React, { useContext } from "react";
import "./CSS/showcategory.css";
import { ShopContext } from "../Context/ShowContext";
import dropdown_icon from "../Component/Assests/dropdown_icon.png";
import Item from "../Component/Item/Item";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS_BY_CATEGORY } from "../query/query";

const ShopCategory = (props) => {
  const { data, error, loading } = useQuery(GET_PRODUCTS_BY_CATEGORY, {
    variables: { categoryId: props.category },
  });

  // if (data) {
  //   console.log(data);
  // }
  return (
    <div className="shop-category-container">
      <div className="shop-category">
      <img className="shopcategory-banner" src={props.banner} alt="" />
      {error && <p>Something went wrong...!</p>}
      {loading && <p>Loading Products....</p>}
      {!error && !loading && (
        <div className="shopcategory-index">
          <p>
            <span>Showing 1-12</span>out of 36 products
          </p>
          <div className="shopcategory-sort">
            Sort by <img src={dropdown_icon} alt="" />
          </div>
        </div>
      )}
      {data && !loading && (
        <div className="shopcategory-products">
          {data.productByCategory.map((item, i) => {
              return (
                <Item
                  key={i}
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  new_price={item.price}
                  old_price={0}
                />
              );
          })}
        </div>
      )}
      <div className="shopcategory-loadmore">Explore More</div>
    </div>
    </div>
  );
};

export default ShopCategory;
