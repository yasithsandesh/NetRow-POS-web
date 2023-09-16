import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

const CartGrnAdd = ({data}) => {
  return (
    <div className="flex flex-row justify-center items-center gap-2 cartGRN">
      <div className="flex flex-col items-center justify-center ">
        <ShoppingBasketIcon style={{fontSize:60}}/>
        <div className="qtyGRN">
        <span>{data.qty}</span>
        </div>
       
      </div>
      <div className="flex flex-col grn2Col">
        <span className="productNameGRN">{data.brand}</span>
        <span className="brandNameGRN">{data.name}</span>
        <div className="cartItemPrice">
          <span>Buying Price:</span>
          <span>Rs.{data.buying_price}</span>
        </div>

        <div className="cartItemPrice">
          <span>Selling Price:</span>
          <span>Rs.{data.selling_Price}</span>
        </div>
      </div>
    </div>
  );
};

export default CartGrnAdd;
