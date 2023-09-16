import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import AddCircleIcon from '@mui/icons-material/AddCircle';
const ProductCart = ({product}) => {
  return (
    <div className="flex flex-row justify-center items-center gap-2 productCart">
      <div className="flex flex-col  justify-center items-center gap-3">

       <AddCircleIcon className="addProductIcon"/>

        <ShoppingBasketIcon style={{ fontSize: 60,color:"#FFFDFA", }} />

        <span className="productName">{product.product_name}</span>

        <span className="brandName">{product.brand_name}</span>

        <div className="cartProctId">
          <span style={{color:"#FFFDFA"}}>Product ID: </span>
          <span style={{color:"#FFFDFA"}}>{product.id}</span>
        </div>

        <div className="cartBrandId">
          <span style={{color:"#FFFDFA"}}>Brand ID: </span>
          <span style={{color:"#FFFDFA"}}>{product.brand_id}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
