'use client'
import React, { useDeferredValue, useEffect, useState, useTransition } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import AllEmployee from "@/components/AllEmployee";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import AddEmployee from "@/components/AddEmployee";
import axios from "axios";
import LoadingUI from "@/components/ui/loading";

const employees = () => {
 
  const[getNewEmployee, setNewEmployee] = useState();

  const [loading,setLoading] = useTransition();

  const [searchText,SetSearchText] = useState('07');
  const search = useDeferredValue(searchText);

  console.log(search);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const [open, setOpen] = React.useState(false);

  return (
    <main className="min-h-screen ">
      <Header />

      <div className="flex flex-row min-h-screen ">
        <div className="w-1/6 md:w-25 ">
          <SideBar />
        </div>

        <div className="w-5/6 md:w-50 mainBox flex-col  gap-4">
          <div>
            <button className="addNew-btn" onClick={handleClickOpen}>
              ADD NEW
            </button>
            <AddEmployee setOpen={setOpen} open={open} setNewEmployee={setNewEmployee}/>
          </div>
          <div className="tableView">
            <div className="searchInputDiv">
              <PersonSearchIcon />
              <input className="searchInput" placeholder="Search Employees" onChange={(e)=>{e.preventDefault,SetSearchText(e.target.value)}}/>
            </div>
            {loading?<LoadingUI/>:null}
            <AllEmployee getNewEmployee={getNewEmployee} search={search} setLoading={setLoading}/>
          </div>
        </div>
      </div>
    </main>
  );
};

export default employees;
