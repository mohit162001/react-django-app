import React, { useContext } from "react";
import { NavLink, useParams } from "react-router-dom";
import "./sidebar.css";
// import { TextContext } from "../Context/NoteBookContext";

function SideBar() {
  const { id } = useParams();
  // const {textState,handleTextChange} = useContext(TextContext)
  const textState = ''
  function handleTextChange(){

  }
  console.log(textState)
  return (
    <aside className="sidebar-container">
      <nav className="sidebar">
        <p className="sidebar-title">Admin Panel</p>
        <ul className="sidebar-ul">
          {id ? (
            <li className="sidebar-list-item">
              <NavLink
                onClick={() => handleTextChange(true)}
                className={({ isActive }) => (isActive ? "active" : "inactive")}
                to={`${id}`}
              >
                Update Note
              </NavLink>
            </li>
          ) : (
            <li className="sidebar-list-item">
              <NavLink
                onClick={() => handleTextChange(true)}
                className={({ isActive }) => (isActive ? "active" : "inactive")}
                to="addproduct"
              >
                {textState ? "New Note" : "Add Product"}
              </NavLink>
            </li>
          )}
          <li className="sidebar-list-item">
            <NavLink
              onClick={() => handleTextChange(false)}
              className={({ isActive }) => (isActive ? "active" : "inactive")}
              to="addcategory"
            >
              Add Category
            </NavLink>
          </li>
          <li className="sidebar-list-item">
            <NavLink
              onClick={() => handleTextChange(false)}
              className={({ isActive }) => (isActive ? "active" : "inactive")}
              to="allorders"
            >
              All Orders
            </NavLink>
          </li>
          
        </ul>
      </nav>
    </aside>
  );
}

export default SideBar;
