"use client";
import React, { useDeferredValue, useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import Sort from "@/components/customers/Sort";
import AddSuppliers from "@/components/suppliers/AddSuppliers";
import AllSuppliers from "@/components/suppliers/AllSuppliers";
import CompanyRegistration from "@/components/suppliers/CompanyRegistration";

const suppliers = () => {
  const [open, setOpen] = React.useState(false);
  const [openC, setCOpen] = React.useState(false);

  const[newCompanyRe,setNewCompanyRe] = React.useState();
  const [refersh,setRefersh] = useState();


  const [searchTxt,setSearchTxt] = useState('07')
  const supplierM = useDeferredValue(searchTxt);

  return (
    <main className="min-h-screen ">
      <Header />

      <div className="flex flex-row min-h-screen ">
        <div className="w-1/6 md:w-25 ">
          <SideBar />
        </div>

        <div className="w-5/6 md:w-50 mainBox flex-col  gap-4">
          <div>
            <button
              className="addNew-btn"
              onClick={() => {
                setOpen(true);
              }}
            >
              ADD NEW
            </button>

            <AddSuppliers setOpen={setOpen} open={open} newCompanyRe={newCompanyRe} setRefersh={setRefersh}/>
            <CompanyRegistration setCOpen={setCOpen}  openC={openC} setNewCompanyRe={setNewCompanyRe}/>
          </div>
          <div className="tableView">
            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
              <div className="searchInputDiv">
                <PersonSearchIcon />
                <input
                  className="searchInput"
                  placeholder="Search Suppliers "
                  onChange={(e)=>{e.preventDefault,setSearchTxt(e.target.value)}}
                />
              </div>
            </div>

            <AllSuppliers setRefersh={setRefersh} refersh={refersh} supplierM={supplierM}/>
          </div>

          <div className="flex flex-row justify-center items-center">
            <button
              className="addCompany-btn"
              onClick={() => {
                setCOpen(true);
              }}
            >
              Company Registration
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default suppliers;
