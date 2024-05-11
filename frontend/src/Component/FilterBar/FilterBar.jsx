import React, { useContext, useState } from "react";
import "./filterbar.css";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import { useQuery } from "@apollo/client";
import { GET_CATEGORIRS } from "../../query/query";
import { ShopContext } from "../../Context/ShowContext";



const FilterBar = ({getFilterData,setCurrPage,placeholder,forOrder,forProduct}) => {
    const {theme} = useContext(ShopContext)
    const today =new Date().toISOString().slice(0, 10)
    const [inputData,setInputData] = useState({
      searchInput:'',
      searchInput2:'',
      selected:'',
      startDate:null,
      endDate:null
    })
    const {data} = useQuery(GET_CATEGORIRS) 

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
    function handleSelect(event){
      setInputData((prev)=>({
        ...prev,
        selected:event.target.value
      }))
      getFilterData({...inputData, selected: event.target.value});

    }
    function resetFilter(){
      console.log('reset')
      setInputData({
        searchInput:'',
        searchInput2:'',
        selected:'',
        startDate:null,
        endDate:null
      })
      getFilterData({
      searchInput:'',
      searchInput2:'',
      selected:'',
      startDate:null,
      endDate:null
      })
      setCurrPage(1)

    }

    function sendData(){
      getFilterData(inputData)
      setCurrPage(1)
    }
  return (
    <div className={theme==='dark-theme'?"filter-bar filter-dark":"filter-bar"}>
      <div className="search-bar-container">
      <div className="search-bar">
        <input className="search-input" type="text" placeholder={placeholder} onChange={handleSearchInput} value={inputData.searchInput}/>
          <SearchIcon onClick={sendData} fontSize="medium" className="search-text-icon"/>
      </div>
      {forOrder&&<div className="search-bar">
        <input className="search-input2" type="text" placeholder={'search by product'} onChange={handleSearchInput2} value={inputData.searchInput2}/>
          <SearchIcon onClick={sendData} fontSize="medium" className="search-text-icon"/>
      </div>}
      </div>
      {forProduct&&<div>
        <select className="selecte-category" name="category" id="category" onChange={handleSelect} value={inputData.selected} >
          <option value="">by category</option>
          {data&&data.categories.edges.map((item)=>(<option value={item.node.name}>{item.node.name}</option>))}
          {/* <option value="mens">mens</option>
          <option value="womens">womens</option> */}
        </select>
      </div>}
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
