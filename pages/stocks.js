"use client";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import Sort from "@/components/customers/Sort";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AllStock from "@/components/stocks/AllStock";
import axios from "axios";
import StockSort from "@/components/stocks/StockSort";

const stocks = () => {

  const [minPrice,setMinPrice] = useState(null);
  const [maxPrice,setMaxPrice] = useState(null);

  const [start,setStart] = useState(null);
  const [end,setEnd] = useState(null);

  const [select, setSelect] = useState("");

  const [refersh, setRefersh] = useState();

  const [TABLE_ROWS, SETTABLE_ROWS] = useState([
    // {
    //   id: "1",
    //   product_id: "2",
    //   brand_name: "CCC",
    //   product_name: "Yuu",
    //   selling_price: "100",
    //   qty: "30",
    //   mfd: "2002",
    //   exp: "2023",
    // },

    // {
    //   id: "2",
    //   product_id: "4",
    //   brand_name: "bbdgdh",
    //   product_name: "Yuu",
    //   selling_price: "190",
    //   qty: "30",
    //   mfd: "2002",
    //   exp: "2023",
    // },

    // {
    //   id: "3",
    //   product_id: "5",
    //   brand_name: "nike",
    //   product_name: "ngjiisl",
    //   selling_price: "220",
    //   qty: "30",
    //   mfd: "2002",
    //   exp: "2023",
    // },

    // {
    //   id: "4",
    //   product_id: "4",
    //   brand_name: "bbdgdh",
    //   product_name: "Yuu",
    //   selling_price: "620",
    //   qty: "30",
    //   mfd: "2002",
    //   exp: "2023",
    // },

    // {
    //   id: "5",
    //   product_id: "5",
    //   brand_name: "nike",
    //   product_name: "ngjiisl",
    //   selling_price: "720",
    //   qty: "90",
    //   mfd: "2002",
    //   exp: "2023",
    // },
  ]);

  const stockDataFetch = async ()=>{
    await axios.get("http://localhost:8000/api/all-stock").then((res)=>{
      SETTABLE_ROWS(res.data.stockData)
    }).catch((err)=>{
      console.log(err)
    })
  }

  useEffect(()=>{
    stockDataFetch()
  },[])

  const sortMath = () => {
    switch (select) {
      case 1:
        TABLE_ROWS.sort((a, b) => a.id - b.id);
        console.log(TABLE_ROWS);
        break;

      case 2:
        TABLE_ROWS.sort((a, b) => b.id - a.id);
        console.log(TABLE_ROWS);
        break;

      case 3:
        TABLE_ROWS.sort((a, b) => {
          const aN = a.brand_name.toLowerCase();
          const bN = b.brand_name.toLowerCase();

          if (aN > bN) {
            return -1;
          }

          return 0;
        });
        console.log(TABLE_ROWS);
        break;

      case 4:
        TABLE_ROWS.sort((a, b) => {
          const aN = a.brand_name.toLowerCase();
          const bN = b.brand_name.toLowerCase();

          if (aN < bN) {
            return -1;
          }

          return 0;
        });
        console.log(TABLE_ROWS);
        break;

      case 5:
        TABLE_ROWS.sort((a, b) => {
          const aN = a.product_name.toLowerCase();
          const bN = b.product_name.toLowerCase();

          if (aN > bN) {
            return -1;
          }

          return 0;
        });
        break;

      case 6:
        TABLE_ROWS.sort((a, b) => {
          const aN = a.product_name.toLowerCase();
          const bN = b.product_name.toLowerCase();

          if (aN < bN) {
            return -1;
          }

          return 0;
        });
        break;

      case 7:
        TABLE_ROWS.sort((a, b) => a.selling_price - b.selling_price);
        console.log(TABLE_ROWS);
        break;

      case 8:
        TABLE_ROWS.sort((a, b) => b.selling_price - a.selling_price);
        console.log(TABLE_ROWS);
        break;


        case 9:
          TABLE_ROWS.sort((a, b) => a.qty - b.qty);
          console.log(TABLE_ROWS);
          break;
  
        case 10:
          TABLE_ROWS.sort((a, b) => b.qty - a.qty);
          console.log(TABLE_ROWS);
          break;

      default:
        break;
    }
  };

  useMemo(() => {
    sortMath();
  }, [select]);


  const findPrice = ()=>{
    if(minPrice == null & maxPrice !== null){
      const returnData = TABLE_ROWS.filter(({selling_price})=>selling_price<maxPrice)
      SETTABLE_ROWS(returnData)
    }else if(minPrice !== null & maxPrice == null){
      const returnData = TABLE_ROWS.filter(({selling_price})=>selling_price > minPrice)
      SETTABLE_ROWS(returnData)
    }else if(minPrice < maxPrice){
      const returnData = TABLE_ROWS.filter(({selling_price})=> minPrice<selling_price & selling_price <maxPrice )
      SETTABLE_ROWS(returnData)
    }else if(minPrice > maxPrice){
      console.log("err")
    }else if (minPrice == null & maxPrice == null){
      stockDataFetch();
    }
  }


  const findDate = ()=>{
    if(start == null & end !== null){
      const returnData = TABLE_ROWS.filter(({exp})=>exp < end)
      SETTABLE_ROWS(returnData)
    }else if(start !== null & end == null){
      const returnData = TABLE_ROWS.filter(({exp})=>start<exp)
      SETTABLE_ROWS(returnData)
    }else if(start<end){
      const returnData = TABLE_ROWS.filter(({exp})=>start<exp & exp<end)
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
              <StockSort select={select} setSelect={setSelect} />

              <div className="flex flex-col md:flex-row justify-center items-center gap-2">
                <div className="priceInputDiv">
                  <MonetizationOnIcon />
                  <input className="priceInput" placeholder="Selling Price" onChange={(e)=>{e.preventDefault, setMinPrice(e.target.value)}} />
                </div>

                <span>To</span>

                <div className="priceInputDiv">
                  <MonetizationOnIcon />
                  <input className="priceInput" placeholder="Selling Price" onChange={(e)=>{e.preventDefault, setMaxPrice(e.target.value)}}/>
                </div>

                <button className="find-btn" onClick={findPrice}>Find</button>
              </div>
            </div>

            <AllStock TABLE_ROWS={TABLE_ROWS} />
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-2">
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

export default stocks;
