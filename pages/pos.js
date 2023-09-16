"use client";

import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import InvoiceItems from "@/components/pos/InvoiceItems";
import StockCart from "@/components/pos/StockCart";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PaymentsIcon from "@mui/icons-material/Payments";
import axios from "axios";
import { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";

const printInvoice = async (
  employee,
  coustomer,
  invoiceNumber,
  discount,
  total,
  invoiceItems,
  mothod
) => {
  let mid;
  {
    mothod == "cash" ? (mid = 1) : (mid = 2);
  }

  await axios
    .put(
      `http://localhost:8000/api/save-invoice/${invoiceNumber}/${employee}/${coustomer}/${total}/${discount}/${mid}`,
      invoiceItems
    )
    .then((res) => {
      console.log(res.data.msg)
    })
    .catch((err) => {
      console.log(err);
    });
};

const pos = () => {
  const [methodUI, setMethodUI] = useState("cash");

  console.log(methodUI);

  const [employee, setEmployee] = useState("yasithsandeshvit@gmail.com");
  const [coustomer, setCoustomer] = useState();
  const [invoiceNumber, setInvoiceNumber] = useState();
  const [discount, setDiscount] = useState();

  const [total, setTotal] = useState(0);

  const [balance, setBalance] = useState(0);

  const [invoiceItems, setInvoiceItems] = useState([]);

  const [stockData, SetStockData] = useState([
    {
      id: "1",
      qty: "10",
      product_name: "Chokalet",
      brand_name: "Maliban",
      selling_price: "2000",
    },

    {
      id: "2",
      qty: "20",
      product_name: "Chokalet",
      brand_name: "Manchi",
      selling_price: "400",
    },
  ]);

  console.log(invoiceItems);

  useEffect(() => {
    for (const obj of invoiceItems) {
      setTotal(parseFloat(total) + parseFloat(obj.price));
    }
  }, [invoiceItems]);

  const stockDataLoad = async () => {
    await axios
      .get("http://localhost:8000/api/all-stock")
      .then((res) => {
        console.log(res.data.stockData);
        SetStockData(res.data.stockData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
   stockDataLoad()
  }, []);



  return (
    <main className="min-h-screen ">
      <Header />

      <div className="flex flex-row min-h-screen ">
        <div className="w-1/6 md:w-25 ">
          <SideBar />
        </div>

        <div className=" w-5/6 md:w-50 flex flex-col mainPosBox  md:flex-row ">
          <div className="w-full md:w-3/4 stockCartView grid grid-cols-3 gap-3">
            {stockData.map((data, index) => (
              <StockCart
                data={data}
                key={index}
                setInvoiceItems={setInvoiceItems}
                invoiceItems={invoiceItems}
              />
            ))}
          </div>

          <div className=" w-full md:w-1/4 flex flex-col gap-4 ">
            <div className="self-center">
              <input
                placeholder="Customer mobile..."
                className="cusMobileInput"
                onChange={(e) => {
                  e.preventDefault, setCoustomer(e.target.value);
                }}
              />
            </div>

            <div className="self-center">
              <input
                placeholder="Invoice Number..."
                className="cusMobileInput"
                onChange={(e) => {
                  e.preventDefault, setInvoiceNumber(e.target.value);
                }}
              />
            </div>
            <div className="invoiceItemsView">
              {invoiceItems &&
                invoiceItems.map((data, index) => (
                  <InvoiceItems key={index} data={data} />
                ))}
            </div>
            <div className="PayView">
              <div className="totalPay">
                <span className="totalPriceText">Total</span>
                <span className="totalPriceText">Rs. {total}</span>
              </div>

              <div className="inputmethodView">
                <div
                  className="method"
                  onClick={() => {
                    setMethodUI("cash");
                  }}
                >
                  <div>
                    <MonetizationOnIcon />
                  </div>
                  <span>Cash</span>
                </div>

                <div
                  className="method"
                  onClick={() => {
                    setMethodUI("Card");
                  }}
                >
                  <div>
                    <PaymentsIcon />
                  </div>
                  <span>Card</span>
                </div>
              </div>

              <div className="inputPayView">
                <span>Discount</span>
                <input
                  className="inputv"
                  placeholder="Enter Discount"
                  onChange={(e) => {
                    e.preventDefault,
                      setTotal(parseFloat(total) - parseFloat(e.target.value));
                    setDiscount(e.target.value);
                  }}
                />
              </div>

              {methodUI == "cash" ? (
                <div className="inputPayView">
                  <span>Payment</span>
                  <input
                    className="inputv"
                    placeholder="Enter Payment"
                    onChange={(e) => {
                      e.preventDefault,
                        setBalance(
                          parseFloat(total) - parseFloat(e.target.value)
                        );
                    }}
                  />
                </div>
              ) : null}

              <div className="inputPayView">
                <label>Withdrawal Points</label>
                <input
                  type="checkbox"
                  className="inputv"
                  placeholder="Enter Payment"
                />
              </div>

              <div className="inputPayView">
                <span>Balance</span>
                <input className="inputv" value={balance} />
              </div>

              <div className="inputPayView">
                <button
                  className="printBtn"
                  onClick={()=>{

                    printInvoice(
                      employee,
                      coustomer,
                      invoiceNumber,
                      discount,
                      total,
                      invoiceItems,
                      methodUI
                    );
                  }}
                >
                  Print Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default pos;
