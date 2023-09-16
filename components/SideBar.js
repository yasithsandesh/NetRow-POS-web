import React, { useEffect } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonPinCircleIcon from "@mui/icons-material/PersonPinCircle";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import ReceiptIcon from "@mui/icons-material/Receipt";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

// import {} from "";

const SideBar = () => {

  const router = useRouter()

  const [data, setData] = useState({});

  useEffect(() => {
    const data = window.localStorage.getItem("employeeData");
    setData(JSON.parse(data));
  }, []);

  const handelLogout =()=>{
    window.localStorage.removeItem("employeeData")
    router.push("http://localhost:3000")
  }

  return (
    <div className="mode-dark p-1 md:p-8  flex-col  min-h-screen md:fixed ">
      {data.employee_type == 1 ? (
        <Link href={"./dashboard"}>
          <div className="flex flex-row   items-center p-3 sideBar-item-box ">
            <DashboardIcon className="md:mr-3" />
            <span className="invisible md:visible">Dashboard</span>
          </div>
        </Link>
      ) : null}

      <Link href={"./pos"}>
        <div className="flex flex-row  items-center p-3 sideBar-item-box">
          <HomeIcon className="md:mr-3 " />
          <span className="invisible md:visible">POS</span>
        </div>
      </Link>

      <Link href={"./grnView"}>
        <div className="flex flex-row  items-center p-3 sideBar-item-box">
          <ReceiptIcon className="md:mr-3" />
          <span className="invisible md:visible">GRN</span>
        </div>
      </Link>

      {data.employee_type == 1 ? (
        <Link href="./employees">
          <div className={"flex flex-row  items-center p-3 sideBar-item-box"}>
            <PersonPinCircleIcon className="md:mr-3" />
            <span className="invisible md:visible">Employees</span>
          </div>
        </Link>
      ) : null}

      <Link href={"./suppliers"}>
        <div className="flex flex-row   items-center p-3 sideBar-item-box">
          <PersonPinCircleIcon className="md:mr-3" />
          <span className="invisible md:visible">Suppliers</span>
        </div>
      </Link>

      <Link href={"./customers"}>
        <div className="flex flex-row   items-center p-3 sideBar-item-box">
          <PersonIcon className="md:mr-3" />
          <span className="invisible md:visible">Customers</span>
        </div>
      </Link>

      {data.employee_type == 1 ? (
        <>
          <Link href={"./stocks"}>
            <div className="flex flex-row   items-center p-3 sideBar-item-box">
              <WarehouseIcon className="md:mr-3" />
              <span className="invisible md:visible">Stocks</span>
            </div>
          </Link>
          <Link href={"./invoices"}>
            <div className="flex flex-row  items-center p-3 sideBar-item-box">
              <ReceiptIcon className="md:mr-3" />
              <span className="invisible md:visible">Invoices</span>
            </div>
          </Link>

          <Link href={"./grnHistory"}>
            <div className="flex flex-row  items-center p-3 sideBar-item-box">
            <ReceiptIcon className="md:mr-3" />
              <span className="invisible md:visible">GRN History</span>
            </div>
          </Link>
        </>
      ) : null}

      
        <div className="flex flex-row items-center p-3 sideBar-item-box" onClick={handelLogout}>
          <LogoutIcon className="md:mr-3" />
          <span className="invisible md:visible">Logout</span>
        </div>
      
    </div>
  );
};

export default SideBar;
