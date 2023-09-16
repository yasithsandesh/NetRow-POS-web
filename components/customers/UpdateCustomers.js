import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";



export default function UpdateCustomers({ setOpen, open ,data,setRefersh}) {
  const [fname, setFname] = React.useState();
  const [lname, setLname] = React.useState();
  const [email, setEmail] = React.useState();

  const handleClose = ({data}) => {
    setOpen(false);
  };


  const updateFetch = async ()=>{
    const obj = {
      fname:fname,
      lname:lname,
      email:email
    }
   

   await axios.put(`http://localhost:8000/api/update-customer/${data.updateMobile}`,obj)
    .then((res)=>{
      setRefersh(res.data.updateCustomer);
      setOpen(false);
    })
    .catch((err)=>{
      console.log(err);
    })
    
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update {data?.name} Customer 

        </DialogTitle>
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
            value={data?.updateMobile}
          />

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="First Name"
            type="First Name"
            fullWidth
            variant="standard"
            onChange={(e)=>{e.preventDefault, setFname(e.target.value)}}
          />

          <TextField
            autoFocus
            margin="dense"
            id="Last Name"
            label="Last Name"
            type="Last Name"
            fullWidth
            variant="standard"
            onChange={(e)=>{e.preventDefault, setLname(e.target.value)}}
          />

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e)=>{e.preventDefault, setEmail(e.target.value)}}
          />

          <div className=" flex flex-row justify-start items-center gap-3 mt-4"></div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={updateFetch}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
