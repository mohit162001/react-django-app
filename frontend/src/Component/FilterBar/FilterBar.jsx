import React, { useState } from "react";
import "./filterbar.css";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
const FilterBar = ({getFilterData}) => {
    const today =new Date().toISOString().slice(0, 10)
    const [inputData,setInputData] = useState({
      searchInput:'',
      startDate:null,
      endDate:null
    })

    function handleSearchInput(event){
      setInputData((prev)=>({
        ...prev,
        searchInput:event.target.value
      }))
      // getFilterData({...inputData, searchInput: event.target.value});
    }
    function handleStartDate(event){
      setInputData((prev)=>({
        ...prev,
        startDate:event.target.value
      }))
      // getFilterData({...inputData, startDate: event.target.value});
    }
    function handleEndDate(event){
      setInputData((prev)=>({
        ...prev,
        endDate:event.target.value
      }))
      // getFilterData({...inputData, endDate: event.target.value});
    }
    function resetFilter(){
      setInputData({
        searchInput:'',
        startDate:null,
        endDate:null
      })
    }

    function sendData(){
      getFilterData(inputData)
    }
  return (
    <div className="filter-bar">
      <div className="search-bar">
        <input className="search-input" type="text" placeholder="Search..." onChange={handleSearchInput} value={inputData.searchInput}/>
          <SearchIcon onClick={sendData} fontSize="medium" className="search-text-icon"/>
      </div>
      <div className="date-filter">
        <label className="filter-bar-lable">Start:</label>
        <input type="date" placeholder="Start Date" value={inputData.startDate} onChange={handleStartDate} />
        <label className="filter-bar-lable">End:</label>
        <input type="date" placeholder="End Date" value={inputData.endDate} onChange={handleEndDate} />
        <SearchIcon onClick={sendData} fontSize="medium" className="search-date-icon"/>
      </div>
      <div onClick={resetFilter} className="filter-reset">
      <button onClick={resetFilter} className="filter-reseticon"><span className="filter-bar-span">Reset</span><RestartAltOutlinedIcon fontSize="large" className="filter-reseticon"/></button>
      </div>
    </div>
  );
};

export default FilterBar;
