import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

export default function CompanyRegistration({setCOpen,openC,setNewCompanyRe}) {

  const[name,setName] = React.useState();
  const [hotline,setHotline] = React.useState();


  const handleClose = () => {
    setCOpen(false);
  };

  const addCompany = async ()=>{
    const obj = {
      name:name,
      hotline:hotline,
    }

    axios.post('http://localhost:8000/api/company-add',obj).then((res)=>{setNewCompanyRe(res.data.newCompany); setCOpen(false)}).catch((err)=>{console.log(err)});
  }

  return (
    <div>
      <Dialog open={openC} onClose={handleClose}>
        <DialogTitle>Company Registration</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e)=>{e.preventDefault,setName(e.target.value)}}
          />

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Hotline"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e)=>{e.preventDefault,setHotline(e.target.value)}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addCompany}>Register</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
