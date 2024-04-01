import React, { useContext } from "react";
import { NavLink, useParams } from "react-router-dom";
import "./sidebar.css";
import { ShopContext } from "../../Context/ShowContext";
// import { TextContext } from "../Context/NoteBookContext";

function SideBar() {
  const { productId } = useParams();
  // const {textState,handleTextChange} = useContext(TextContext)
  const {setMenu} = useContext(ShopContext)

  return (
    <aside className="sidebar-container">
      <nav className="sidebar">
        <p className="sidebar-title">Admin Panel</p>
        <ul className="sidebar-ul">
        <li className="sidebar-list-item">
            <NavLink
              onClick={()=>setMenu('statistics')}
              className={({ isActive }) => (isActive ? "active" : "inactive")}
              to="statistics"
            >
              Statistics
            </NavLink>
          </li>
        <li className="sidebar-list-item">
            <NavLink
              onClick={()=>setMenu('allproduct')}
              className={({ isActive }) => (isActive ? "active" : "inactive")}
              to="allproducts"
            >
              All Products
            </NavLink>
          </li>
          <li className="sidebar-list-item">
            <NavLink
             onClick={()=>setMenu('allorders')}
              className={({ isActive }) => (isActive ? "active" : "inactive")}
              to="allorders"
            >
              All Orders
            </NavLink>
          </li>
          <li className="sidebar-list-item">
            <NavLink
             onClick={()=>setMenu('allusers')}
              className={({ isActive }) => (isActive ? "active" : "inactive")}
              to="allusers"
            >
              All Users
            </NavLink>
          </li>
          {productId ? (
            <li className="sidebar-list-item">
              <NavLink
                onClick={() => setMenu('addproduct')}
                className={({ isActive }) => (isActive ? "active" : "inactive")}
                to={`/admin/addproduct/${productId}`}
              >
                Update Product
              </NavLink>
            </li>
          ) : (
            <li className="sidebar-list-item">
              <NavLink
                onClick={() => setMenu('addproduct')}
                className={({ isActive }) => (isActive ? "active" : "inactive")}
                to="addproduct"
              >
                Add Product
              </NavLink> 
            </li>
          )}
          <li className="sidebar-list-item">
            <NavLink
              onClick={() => setMenu('addcategory')}
              className={({ isActive }) => (isActive ? "active" : "inactive")}
              to="addcategory"
            >
              Add Category
            </NavLink>
          </li>
          
          
          
        </ul>
      </nav>
    </aside>
  );
}

export default SideBar;
