import React, { useState } from "react";
import "./filterbar.css";
import SearchIcon from "@mui/icons-material/Search";
const FilterBar = () => {
  return (
    <div className="filter-bar">
      <div className="search-bar">
        <input className="search-input" type="text" placeholder="Search..." />
          <SearchIcon className="search-icon"/>
      </div>
      <div className="date-filter">
        <input type="date" placeholder="Start Date" />
        <input type="date" placeholder="End Date" />
      </div>
    </div>
  );
};

export default FilterBar;
