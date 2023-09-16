import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import InventoryIcon from "@mui/icons-material/Inventory";

import EmployeeIcon from "@/public/employeeIcon.png";
import SupplierIcon from "@/public/supliersIcon.png";
import CoustomerIcon from "@/public/customerIcon.png";
import axios from "axios";
import { useEffect, useState } from "react";

const RevenueTotalOders = () => {

  const [grnCount, setGrnCount] = useState();
  const [invoiceCount, setInvoiceCount] = useState();
  const [totalRevenue, setTotalRevenue] = useState();
  const [getTotalProfit, setTotalProfit] = useState();
  const [getTodayRevenue, setTodayRevenue] = useState();

  

  const grnfetch = async()=>{
    await axios.get(`http://localhost:8000/api/all-grn/07/0`).then((res)=>{
        setGrnCount(res.data.grnData.length)
    })
    .catch((err)=>{console.log(err)})
  }

  const invoiceFetch = async()=>{
    await axios.get(`http://localhost:8000/api/all-invoice/0/0`).then((res)=>{
        setInvoiceCount(res.data.invoiceData.length)
    })
    .catch((err)=>{console.log(err)})
  }


  const totalRevenueFetch = async()=>{
    await axios.get(`http://localhost:8000/api/total-revenue`).then((res)=>{
        setTotalRevenue(res.data.totalRevenue)
    })
    .catch((err)=>{console.log(err)})
  }


  useEffect(()=>{
    grnfetch()
    invoiceFetch()
    totalRevenueFetch()
   
  },[])

  const dashboardD = [
    {
      icon: <MonetizationOnIcon />,
      title: "Total Revenue",
      price: `Rs.${totalRevenue}`,
    },

    {
      icon: <PriceCheckIcon />,
      title: "Total Profit",
      price: "Rs.2000",
    },

    {
      icon: <InventoryIcon />,
      title: "Total Orders",
      price: invoiceCount,
    },

    {
      icon: <PriceCheckIcon />,
      title: "Today Revenue",
      price: "Rs.2000",
    },

    {
      icon: <InventoryIcon />,
      title: "Total GRN",
      price: grnCount,
    },
  ];

  return dashboardD;
};

const EmployeeCustomerSupplierDetails = () => {
  const [employeeCount, setEmployeeCount] = useState();
  const [suppliersCount, setSuppliersCount] = useState();
  const [customersCount, setCustomersCount] = useState();
  useEffect(() => {
    employeeFetch();
    supplierFetch();
    customerFetch();
  }, []);

  const employeeFetch = async () => {
    await axios
      .get(`http://localhost:8000/api/all-employee/${"07"}`)
      .then((res) => {
        setEmployeeCount(res.data.allEmployee.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const supplierFetch = async () => {
    await axios
      .get(`http://localhost:8000/api/all-suppliers/07`)
      .then((res) => {
        setSuppliersCount(res.data.all.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const customerFetch = async () => {
    await axios
      .get(`http://localhost:8000/api/all-customers/07`)
      .then((res) => {
        setCustomersCount(res.data.all.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const detailsData = [
    {
      iconPath: EmployeeIcon,
      title: "Employees",
      count: employeeCount,
    },

    {
      iconPath: SupplierIcon,
      title: "Suppliers",
      count: suppliersCount,
    },

    {
      iconPath: CoustomerIcon,
      title: "Customers",
      count: customersCount,
    },
  ];

  return detailsData;
};

export { RevenueTotalOders, EmployeeCustomerSupplierDetails };
