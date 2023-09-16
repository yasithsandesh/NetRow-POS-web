import AddCircleIcon from "@mui/icons-material/AddCircle";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useState } from "react";
const StockCart = ({ data,setInvoiceItems, invoiceItems}) => {

  const currentQty = data.qty;

  const [qty, setQty] = useState("0");

  const decrease = () => {
    {
      parseInt(qty) > 0 ? setQty(parseInt(qty) - 1) : setQty("0");
    }
  };

  const increase = () => {
    if (parseInt(currentQty) > parseInt(qty)) {
      setQty(parseInt(qty) + 1);
    }
  };

  let price = parseFloat(qty) * parseFloat(data.selling_price);

  const handelInvoiceItems = ()=>{
    const newInvoiceItem = {
        id: data.id,
        qty: qty,
        product_name: data.product_name,
        brand_name:  data.brand_name,
        price: price,
    }

    setInvoiceItems([...invoiceItems, newInvoiceItem]);
  };



  return (
    <div className="stockCart">
      <div className=" flex flex-row items-center gap-2">
        <span>{data.product_name}</span>
        <div className="qtyCricle">
          <span>{currentQty}</span>
        </div>
        <AssignmentTurnedInIcon onClick={handelInvoiceItems}/>
      </div>

      <span>{data.brand_name}</span>
      <div className="flex flex-row items-center gap-8">
        <span>Rs. {data.selling_price}</span>
        <div className="flex flex-row gap-1">
          <RemoveCircleIcon onClick={decrease} />
          <span>{qty}</span>
          <AddCircleIcon onClick={increase} />
        </div>
      </div>
    </div>
  );
};

export default StockCart;
