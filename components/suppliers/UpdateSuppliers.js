import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

export default function UpdateSuppliers({ setOpen, open,updateData ,setRefersh}) {
  const [mobile, setMobile] = React.useState();
  const [fname, setFname] = React.useState();
  const [lname, setLname] = React.useState();
  const [email, setEmail] = React.useState();

  const handleClose = () => {
    setOpen(false);
  };

  const update = async ()=>{
    const obj = {
      fname:fname,
      lname:lname,
      email:email,
    }

    await axios.put(`http://localhost:8000/api/update-supplier/${updateData.upMobile}`,obj)
    .then((res)=>{setRefersh(res.data.message)
      setOpen(false);
    })
    .catch((err)=>console.log(err))
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update {updateData?.sname} Customer</DialogTitle>
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
            value={updateData?.upMobile}
          />

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="First Name"
            type="First Name"
            fullWidth
            variant="standard"
          />

          <TextField
            autoFocus
            margin="dense"
            id="Last Name"
            label="Last Name"
            type="Last Name"
            fullWidth
            variant="standard"
          />

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />

     

          <div className=" flex flex-row justify-start items-center gap-3 mt-4"></div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={update}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
