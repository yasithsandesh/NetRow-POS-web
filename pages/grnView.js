"use client";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import { useEffect, useState } from "react";
import Link from "next/link";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CartGrnAdd from "@/components/GRN/CartGrnAdd";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SaveIcon from "@mui/icons-material/Save";
import AddProduct from "@/components/product/AddProduct";
import axios from "axios";
import ProductCart from "@/components/product/ProductCart";

const grnView = () => {
  const [grnItem, setGrnItem] = useState([]);

  const [grnNumber, setGrnNumber] = useState();
  const [supplier, setSupplier] = useState();

  const [productId, setProductId] = useState();
  const [brand, setBrand] = useState();
  const [productName, setProductName] = useState();
  const [qty, setQty] = useState();
  const [bPrice, setBprice] = useState();
  const [sPrice, setPrice] = useState();
  const [mfg, setMfg] = useState();
  const [exp, setExp] = useState();

  const[total,setTotal] = useState(0);
  const [payment,setPayment] = useState(0);
  const [balance,setBalance] = useState(0);

  const [openProductView, setOpenProductView] = useState(false);

  const [open, setOpen] = useState(false);

  const handleAddGrn = () => {
    const newItem = {
      productId: productId,
      brand: brand,
      name: productName,
      qty: qty,
      selling_Price: sPrice,
      buying_price: bPrice,
      mfd: mfg,
      exp: exp,
    };
    setGrnItem([...grnItem, newItem]);
  };

  console.log(grnItem);

  const saveGrn = async () => {
    await axios
      .put(
        `http://localhost:8000/api/save-grn/${grnNumber}/${"yasithsandeshvit@gmail.com"}/${supplier}/${payment}`,
        grnItem
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  
  
  useEffect(()=>{
    for ( var i = 0;i<grnItem.length; i++){
      var first = total
      const item = grnItem[i];
      let buyyingPrice =  parseFloat(item.buying_price);
      let qty = parseFloat(item.qty);
      setTotal(buyyingPrice * qty + first)
    }
  },[grnItem]);


  useEffect(()=>{
  const final =  parseFloat(total) - parseFloat(payment)
  setBalance(final)
  },[payment])


  const [product, setProduct] = useState([
  ]);

  const allProduct  =async ()=>{
    await axios.get('http://localhost:8000/api/all-product').then((res)=>{
      setProduct(res.data.products)
      console.log(res.data.products)
    }).catch((err)=>{

    })
  }
  
  

  useEffect(()=>{
    allProduct()
  },[])


 

  return (
    <main className="min-h-screen ">
      <Header />

      <div className="flex flex-row min-h-screen ">
        <AddProduct setOpen={setOpen} open={open} product={product}/>
        <div className="w-1/6 md:w-25 ">
          <SideBar />
        </div>

        <div className="w-5/6 md:w-50 mainBox flex-col  gap-4">



          <div className="tableViewGRN">
            <div className="grid  grid-cols-1  md:grid-cols-4 gap-4 ">
              <div className="grnInputView">
                <input
                  className="grnInput"
                  placeholder="GRN Number"
                  onChange={(e) => {
                    e.preventDefault, setGrnNumber(e.target.value);
                  }}
                />
              </div>

              <div className="grnInputView">
                <input
                  className="grnInput"
                  placeholder="Supplier"
                  onChange={(e) => {
                    e.preventDefault, setSupplier(e.target.value);
                  }}
                />
              </div>

              <div className="grnInputView">
                <input
                  className="grnInput"
                  placeholder="Product ID"
                  onChange={(e) => {
                    e.preventDefault, setProductId(e.target.value);
                  }}
                />

                <div
                  className="grnFormAdd-btn"
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  <AddShoppingCartIcon />
                </div>
              </div>

              <div className="grnInputView">
                <input
                  className="grnInput"
                  placeholder="Brand"
                  onChange={(e) => {
                    e.preventDefault, setBrand(e.target.value);
                  }}
                />
              </div>

              <div className="grnInputView">
                <input
                  className="grnInput"
                  placeholder="Product Name"
                  onChange={(e) => {
                    e.preventDefault, setProductName(e.target.value);
                  }}
                />
              </div>

              <div className="grnInputView">
                <input
                  className="grnInput"
                  placeholder="Quantity"
                  onChange={(e) => {
                    e.preventDefault, setQty(e.target.value);
                  }}
                />
              </div>

              <div className="grnInputView">
                <input
                  className="grnInput"
                  placeholder="Buying Price"
                  onChange={(e) => {
                    e.preventDefault, setBprice(e.target.value);
                  }}
                />
              </div>

              <div className="grnInputView">
                <input
                  className="grnInput"
                  placeholder="Selling Price"
                  onChange={(e) => {
                    e.preventDefault, setPrice(e.target.value);
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
                    setMfg(fomatDate);
                    console.log(fomatDate);
                  }}
                />
              </div>

              <div className="grnInputView">
                <input
                  className="grnInput"
                  type="date"
                  placeholder="EXP"
                  onChange={(e) => {
                    e.preventDefault;
                    const expDate = new Date(e.target.value);
                    const fomatDate = expDate.toISOString().split("T")[0];
                    setExp(fomatDate);
                  }}
                />
              </div>

              <div className="addGrnBtn">
                <AddCircleIcon />
                <button onClick={handleAddGrn}>Add to GRN</button>
              </div>
            </div>
          </div>

          <div className="flex flex-row mainGrnProductCart">
            {grnItem.map((data, index) => (
              <CartGrnAdd data={data} />
            ))}
          </div>


          <div className="flex flex-col  md:flex-row-reverse justify-center items-center gap-5">

             <div className="flex flex-row  self-end main-inputs-view">
              <div className="itemView">
                <span>Total</span>
                <div className="inputDiv">
                  <input className="itemInput" value={total} />
                </div>
              </div>
              <div className="itemView">
                <span>Payment</span>
                <div className="inputDiv">
                  <input className="itemInput" onChange={(e)=>{e.preventDefault,setPayment(e.target.value)}}/>
                </div>
              </div>
              <div className="itemView">
                <span>Balance</span>
                <div className="inputDiv">
                  <input className="itemInput" value={balance}/>
                </div>
              </div>
            </div>
            <div className="saveGrnBtn">
              <SaveIcon />
              <button onClick={saveGrn}>Save GRN</button>
            </div>
          </div>
        </div>

       
        
      </div>
    </main>
  );
};

export default grnView;
