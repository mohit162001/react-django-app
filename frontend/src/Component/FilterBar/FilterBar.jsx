import React, { useState } from "react";
import "./filterbar.css";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
const FilterBar = ({getFilterData,setCurrPage,placeholder,exrtaSearch}) => {
    const today =new Date().toISOString().slice(0, 10)
    const [inputData,setInputData] = useState({
      searchInput:'',
      searchInput2:'',
      startDate:null,
      endDate:null
    })

    function handleSearchInput(event){
      setInputData((prev)=>({
        ...prev,
        searchInput:event.target.value
      }))
      getFilterData({...inputData, searchInput: event.target.value});
      setCurrPage(1)
    }
    function handleSearchInput2(event){
      setInputData((prev)=>({
        ...prev,
        searchInput2:event.target.value
      }))
      getFilterData({...inputData, searchInput2: event.target.value});
      setCurrPage(1)
    }
    function handleStartDate(event){
      setInputData((prev)=>({
        ...prev,
        startDate:event.target.value
      }))
    }
    function handleEndDate(event){
      setInputData((prev)=>({
        ...prev,
        endDate:event.target.value
      }))
    }
    function resetFilter(){
      console.log('reset')
      setInputData({
        searchInput:'',
        searchInput2:'',
        startDate:null,
        endDate:null
      })
      getFilterData({
      searchInput:'',
      searchInput2:'',
      startDate:null,
      endDate:null
      })
    }

    function sendData(){
      getFilterData(inputData)
      setCurrPage(1)
    }
  return (
    <div className="filter-bar">
      <div className="search-bar-container">
      <div className="search-bar">
        <input className="search-input" type="text" placeholder={placeholder} onChange={handleSearchInput} value={inputData.searchInput}/>
          <SearchIcon onClick={sendData} fontSize="medium" className="search-text-icon"/>
      </div>
      {exrtaSearch&&<div className="search-bar">
        <input className="search-input2" type="text" placeholder={'search by product'} onChange={handleSearchInput2} value={inputData.searchInput2}/>
          <SearchIcon onClick={sendData} fontSize="medium" className="search-text-icon"/>
      </div>}
      </div>
      <div className="date-filter">
        <label className="filter-bar-lable">Start:</label>
        <input type="date" placeholder="Start Date" value={inputData.startDate===null?'':inputData.startDate} onChange={handleStartDate} />
        <label className="filter-bar-lable">End:</label>
        <input type="date" placeholder="End Date" value={inputData.endDate===null?'':inputData.endDate}  onChange={handleEndDate} />
        <SearchIcon onClick={sendData} fontSize="medium" className="search-date-icon"/>
      </div>
      <div onClick={resetFilter} className="filter-reset">
      <button onClick={resetFilter} className="filter-reseticon"><span className="filter-bar-span">Reset</span><RestartAltOutlinedIcon fontSize="large" className="filter-reseticon"/></button>
      </div>
    </div>
  );
};

export default FilterBar;
