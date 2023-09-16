"use client";
import Image from "next/image";
import stocksIcon from "@/public/stockIcon.png";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import DashBoardBarChart from "@/components/ui/DashBoardBarChart";
import DashboardMainBox from "@/components/ui/DashboardMainBox";
import DashboardPersionUi from "@/components/ui/DashboardPersionUi";
import {
  RevenueTotalOders,
  EmployeeCustomerSupplierDetails,
} from "@/utils/dashbordvalues";
import { data } from "autoprefixer";
import { useEffect, useState } from "react";
import axios from "axios";

export default function dashboard() {


  const [stockCount,setStockCount] = useState()
  const[productCount,setProductCount] = useState()


  useEffect(() => {
  
      const data = window.localStorage.getItem('employeeData')
      console.log(data)
      fetchStock()
      fetchProduct()

  }, []);


  console.log( new Date().getMonth())

 const fetchStock =async ()=>{
 await axios.get('http://localhost:8000/api/all-stock').then((res)=>{setStockCount(res.data.stockData.length)}).catch((err)=>{console.log(err)})
 }

 const fetchProduct =async ()=>{
  await axios.get('http://localhost:8000/api/all-product').then((res)=>{setProductCount(res.data.products.length)}).catch((err)=>{console.log(err)})
  }


  const values = RevenueTotalOders();
  const EmployeeCustomerSupplierDetailsData = EmployeeCustomerSupplierDetails();

  return (
    <main className="min-h-screen ">
      <Header />

      <div className="flex flex-row min-h-screen ">
        <div className="w-1/6 md:w-25 ">
          <SideBar />
        </div>

        <div className="w-5/6 md:w-50 mainBox-dashbord flex-col  gap-4  p-4 overflow-scroll">
          <div className="flex flex-row gap-2">
            {values.map((data, index) => (
              <DashboardMainBox
                title={data.title}
                price={data.price}
                icon={data.icon}
              />
            ))}
          </div>

          <div className="flex flex-row gap-2">
            <div className=" flex flex-col gap-2">
              <div className="flex flex-row gap-2">
                {EmployeeCustomerSupplierDetailsData.map((data, index) => (
                  <DashboardPersionUi
                    iconPath={data.iconPath}
                    title={data.title}
                    count={data.count}
                  />
                ))}
              </div>

              <div className="flex flex-row items-center relative">
                <Image src={stocksIcon} width={220} />
                <div className=" absolute  flex flex-col items-center shape-stock-product">
                  <span>Stock: {stockCount}</span>
                  <span>Product: {productCount}</span>
                </div>
              </div>
            </div>

            <div className="barChartMainView">
              <DashBoardBarChart />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
