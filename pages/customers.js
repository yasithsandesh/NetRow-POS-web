"use client";
import React, { useDeferredValue, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import AllCustomers from "@/components/customers/AllCustomers";
import AddCustomers from "@/components/customers/AddCustomers";
import Sort from "@/components/customers/Sort";

const customers = () => {
  const [select, setSelect] = React.useState("");

  const [searchTxt, setSearchTxt] = useState("07");
  const searchMobile = useDeferredValue(searchTxt);

  const [open, setOpen] = React.useState(false);
  const [refersh, setRefersh] = useState();

  const [TABLE_ROWS, SETTABLE_ROWS] = useState([
    {
      mobile: "Yasith",
      fname: "Yasith",
      lname: "Sandesh",
      email: "yaithsandesh@gmail.com",
      points: "0",
    },
  ]);

  const sort = () => {
    switch (select) {
      case 1:
        TABLE_ROWS.sort((a,b)=>a.points-b.points)
        break;

      case 2:
        TABLE_ROWS.sort((a,b)=>b.points-a.points)
        break;

      default:
        break;
    }
  };

  useMemo(()=>{sort},[select])

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
            <AddCustomers
              setOpen={setOpen}
              open={open}
              setRefersh={setRefersh}
            />
          </div>
          <div className="tableView">
            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
              <div className="searchInputDiv">
                <PersonSearchIcon />
                <input
                  className="searchInput"
                  placeholder="Search Customers "
                  onChange={(e) => {
                    e.preventDefault, setSearchTxt(e.target.value);
                  }}
                />
              </div>
              <Sort select={select} setSelect={setSelect} />
            </div>

            <AllCustomers
              refersh={refersh}
              setRefersh={setRefersh}
              searchMobile={searchMobile}
              TABLE_ROWS={TABLE_ROWS}
              SETTABLE_ROWS={SETTABLE_ROWS}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default customers;
