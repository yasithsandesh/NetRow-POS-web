import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CompanySelecter from "./CompanySelecter";
import axios from "axios";

export default function AddSuppliers({ setOpen, open ,newCompanyRe,setRefersh}) {
  const [mobile, setMobile] = React.useState();
  const [fname, setFname] = React.useState();
  const [lname, setLname] = React.useState();
  const [email, setEmail] = React.useState();
  const [company, setComany] = React.useState();

  const handleClose = () => {
    setOpen(false);
  };

  const addSuppliers = async ()=>{

    const obj = {
      mobile:mobile,
      fname:fname,
      lname:lname,
      email:email,
      company_id:1,
    }

    await axios.post('http://localhost:8000/api/add-supplier',obj)
    .then((res)=>{
      setRefersh(res.data.newSuppliers)
      setOpen(false)
    }).catch((err)=>{console.log(err)})
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Suppliers</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Mobile"
            type="Mobile"
            fullWidth
            variant="standard"
            onChange={(e) => {
              e.preventDefault, setMobile(e.target.value);
            }}
          />

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="First Name"
            type="First Name"
            fullWidth
            variant="standard"
            onChange={(e) => {
              e.preventDefault, setFname(e.target.value);
            }}
          />

          <TextField
            autoFocus
            margin="dense"
            id="Last Name"
            label="Last Name"
            type="Last Name"
            fullWidth
            variant="standard"
            onChange={(e) => {
              e.preventDefault, setLname(e.target.value);
            }}
          />

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => {
              e.preventDefault, setEmail(e.target.value);
            }}
          />

          <div className=" flex flex-row justify-start items-center gap-3 mt-4">
            <CompanySelecter newCompanyRe={newCompanyRe} />
          </div>

          <div className=" flex flex-row justify-start items-center gap-3 mt-4"></div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addSuppliers}>ADD</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
