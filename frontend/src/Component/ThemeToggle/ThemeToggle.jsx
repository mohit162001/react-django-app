import React, { useContext, useEffect, useState } from "react";
import "./themetoggle.css";
import { ShopContext } from "../../Context/ShowContext";
function ThemeToggle({toggleTheme}) {
  const {theme} = useContext(ShopContext)
  return (
    <div>
      <input hidden type="checkbox" id="toggle" onChange={toggleTheme} />
      <label for="toggle">
        <i className="fa-solid fa-sun sun"></i>
        <i className="fa-solid fa-moon moon"></i>
      </label>
      {/* <div class="background"></div> */}
    </div>
  );
}

export default ThemeToggle;
