"use client";
import React, { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import AllCustomers from "@/components/customers/AllCustomers";
import Sort from "@/components/customers/Sort";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AllInvoice from "@/components/invoice/AllInvoice";
import InvoiceSort from "@/components/invoice/InvoiceSort";
import axios from "axios";

const invoices = () => {

  const [minPrice,setMinPrice] = useState(null);
  const [maxPrice,setMaxPrice] = useState(null);

  const [start,setStart] = useState(null);
  const [end,setEnd] = useState(null);

  const [refersh, setRefersh] = useState();

  const [select, setSelect] = useState("");

  const [TABLE_ROWS, SETTABLE_ROWS] = useState([
    // {
    //   invoice_id: "1",
    //   customer_mobile: "2",
    //   employee_email: "CCC",
    //   created_at: "Yuu",
    //   paid_amount: "120",
    //   discount: "30",
    //   name: "2002",
    //   stock_stock_id: "2023",
    //   brand_name: "30",
    //   product_name: "2002",
    //   qty: "2023",
    // },
  ]);

  const [mobile,setMobile] = useState('07')
  const [invoice,setInvoice] = useState('0')

  const useInvoice = async () => {
    await axios
      .get(`http://localhost:8000/api/all-invoice/${mobile}/${invoice}`)
      .then((res) => {
        SETTABLE_ROWS(res.data.invoiceData);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    useInvoice();
  }, [mobile,invoice]);

  const sort = () => {
    switch (select) {
      case 1:
        TABLE_ROWS.sort((a, b) => a.invoice_id - b.invoice_id);
        console.log(TABLE_ROWS);
        break;

      case 2:
        TABLE_ROWS.sort((a, b) => b.invoice_id - a.invoice_id);
        console.log(TABLE_ROWS);
        break;

      case 3:
        TABLE_ROWS.sort((a,b)=>a.paid_amount - b.paid_amount);
        break;

      case 4:
        TABLE_ROWS.sort((a,b)=>b.paid_amount - a.paid_amount);
        break;

      case 3:
        TABLE_ROWS.sort((a,b)=>a.qty - b.qty);
        break;

      case 4:
        TABLE_ROWS.sort((a,b)=>b.qty - a.qty);
        break;

      default:
        break;
    }
  };

  useMemo(() => {
    sort();
  }, [select]);




  const findPrice = ()=>{
   
    if(minPrice == null & maxPrice !== null){
      const returnData = TABLE_ROWS.filter(({paid_amount})=>paid_amount<maxPrice)
      SETTABLE_ROWS(returnData)
      console.log(returnData)
    }else if(minPrice !== null & maxPrice == null){
      const returnData = TABLE_ROWS.filter(({paid_amount})=>paid_amount > minPrice)
      SETTABLE_ROWS(returnData)
    }else if(minPrice < maxPrice){
      const returnData = TABLE_ROWS.filter(({paid_amount})=> minPrice<paid_amount & paid_amount <maxPrice )
      SETTABLE_ROWS(returnData)
      console.log(returnData)
    }else if(minPrice > maxPrice){
      console.log("err")
    }else if (minPrice == null & maxPrice == null){
      console.log("err")
    }
  }


  const findDate = ()=>{
    if(start == null & end !== null){
      const returnData = TABLE_ROWS.filter(({created_at})=>created_at < end)
      SETTABLE_ROWS(returnData)
    }else if(start !== null & end == null){
      const returnData = TABLE_ROWS.filter(({created_at})=>start<created_at)
      SETTABLE_ROWS(returnData)
    }else if(start<end){
      const returnData = TABLE_ROWS.filter(({created_at})=>start<created_at & created_at<end)
      SETTABLE_ROWS(returnData)
    }else if(start>end){
      console.log("err")
    }
  }

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
                  placeholder="Search Customers "
                  onChange={(e)=>{e.preventDefault, setMobile(e.target.value)}}
                />
              </div>
              <InvoiceSort select={select} setSelect={setSelect} />

              <div className="flex flex-col md:flex-row justify-center items-center gap-2">
                <div className="priceInputDiv">
                  <MonetizationOnIcon />
                  <input className="priceInput" placeholder="Paid Amount"  onChange={(e)=>{e.preventDefault, setMinPrice(e.target.value)}}/>
                  
                </div>

                <span>To</span>

                <div className="priceInputDiv">
                  <MonetizationOnIcon />
                  <input className="priceInput" placeholder="Paid Amount"  onChange={(e)=>{e.preventDefault, setMaxPrice(e.target.value)}}/>
                </div>

                <button className="find-btn" onClick={findPrice}>Find</button>
              </div>
            </div>

            <AllInvoice TABLE_ROWS={TABLE_ROWS} />
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-2">

          <div className="searchInputDiv">
                <PersonSearchIcon />
                <input
                  className="searchInput"
                  placeholder="Search Invoice "
                  onChange={(e)=>{e.preventDefault,setInvoice(e.target.value)}}
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

            <button className="find-btn" onClick={findDate}>Find</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default invoices;
