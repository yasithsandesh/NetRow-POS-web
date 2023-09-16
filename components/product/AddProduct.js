import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ProductCart from "./ProductCart";
import BrandSelect from "./BrandSelect";
import axios from "axios";

const addProduct = async (productObj) => {
  await axios
    .post("http://localhost:8000/api/add-product", productObj)
    .then((res) => {
      console.log(res.data);
    })
    .catch();
};

const addBrand = async (brand) => {
  await axios
    .post("http://localhost:8000/api/add-brand", { brand_name: brand })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default function AddProduct({ setOpen, open, product }) {
  const handleClose = () => {
    setOpen(false);
  };

 

  const [brand, setBrand] = React.useState();

  const [productId, setProductId] = React.useState();
  const [productName, setProductName] = React.useState();

  const handleAddProduct = ()=>{
    const obj = {
        product_id:productId,
        product_name:productName,
        brand_id:1,
    }

     addProduct(obj)
  }




  return (
    <div>
      <Dialog open={open} onClose={handleClose} className="dialog-dark">
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Product ID"
            type="product id"
            fullWidth
            variant="standard"
            onChange={(e) => {
              e.preventDefault, setProductId(e.target.value);
            }}
          />

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Product Name"
            type="product name"
            fullWidth
            variant="standard"
            onChange={(e) => {
              e.preventDefault, setProductName(e.target.value);
            }}
          />

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Brand Name"
            type="product name"
            fullWidth
            variant="standard"
            onChange={(e) => {
              e.preventDefault, setBrand(e.target.value);
            }}
          />

          <button
            className="addBarndBtn"
            onClick={() => {
              addBrand(brand);
            }}
          >
            Add New Brand
          </button>

          <BrandSelect />

          <button className="addProductBtn" onClick={handleAddProduct}>Add Product</button>

          <div className=" flex flex-row justify-start items-center gap-3 mt-4 sco">
            {product.map((data, index) => (
              <ProductCart key={data.productId} product={data}/>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>

        </DialogActions>
      </Dialog>
    </div>
  );
}
