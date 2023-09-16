"use client";
import React, { useDeferredValue, useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import AllCustomers from "@/components/customers/AllCustomers";
import Sort from "@/components/customers/Sort";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AllInvoice from "@/components/invoice/AllInvoice";
import InvoiceSort from "@/components/invoice/InvoiceSort";
import axios from "axios";
import AllGrn from "@/components/GRN/AllGrn";

const grnHistory = () => {

  const [minPrice,setMinPrice] = useState(null);
  const [maxPrice,setMaxPrice] = useState(null);

  const [start,setStart] = useState(null);
  const [end,setEnd] = useState(null);

  const [TABLE_ROWS,setTableRows] = useState([

  ])

  const [mobile,setMobile] =  useState('07')
  const [grnNumber,setGrnNumber] = useState('0')


  const allGrnFetch = async ()=>{
  await axios.get(`http://localhost:8000/api/all-grn/${mobile}/${grnNumber}`).then((res)=>{
    setTableRows(res.data.grnData)
  }).catch((err)=>{

  })
  }

  useEffect(()=>{
    allGrnFetch()
  },[mobile,grnNumber])

  return (
    <main className="min-h-screen ">
      <Header />

      <div className="flex flex-row min-h-screen ">
        <div className="w-1/6 md:w-25 ">
          <SideBar />
        </div>

        <div className="w-5/6 md:w-50 mainBox flex-col  gap-4">
          <div className="tableView">
            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
         
              <div className="searchInputDiv">
                <PersonSearchIcon />
                <input
                  className="searchInput"
                  placeholder="Search Supplier"
                  onChange={(e)=>{e.preventDefault, setMobile(e.target.value)}}
                />
              </div>
         
            </div>

            <AllGrn TABLE_ROWS={TABLE_ROWS} />
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-2">

          <div className="searchInputDiv">
                <PersonSearchIcon />
                <input
                  className="searchInput"
                  placeholder="Search GRN"
                  onChange={(e)=>{e.preventDefault,setGrnNumber(e.target.value)}}
                />
              </div>
            <div className="grnInputView">
              <input
                className="grnInput"
                type="date"
                placeholder="MFG"
                onChange={(e) => {
                  e.preventDefault;
                  const mfdDate = new Date(e.target.value);
                  const fomatDate = mfdDate.toISOString().split("T")[0];
                  setStart(fomatDate);
                }}
              />
            </div>

            <div className="grnInputView">
              <input
                className="grnInput"
                type="date"
                placeholder="MFG"
                onChange={(e) => {
                  e.preventDefault;
                  const mfdDate = new Date(e.target.value);
                  const fomatDate = mfdDate.toISOString().split("T")[0];
                  setEnd(fomatDate);
                }}
              />
            </div>

            <button className="find-btn">Find</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default grnHistory;