import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import GenderSelect from "./GenderSelect";
import TypeSelect from "./EmployeeTypeSelect";
import axios from "axios";

async function updateEmployee(email,fname,lname,nic,mobile){
  const data ={
    fname:fname,
    lname:lname,
    nic:nic,
    mobile:mobile,
  }

  
  try{
    const res = await axios.put(`http://localhost:8000/api/update-employee/${email}`,data)
    return res.data.employee;
  }catch(err){
    console.log(err)
  }
  
}


export default function UpdateEmployee({ setOpen, open,employee,setUpdateEmployee }) {

  const [fname,setFname] = React.useState();
  const [lname,setlname] = React.useState();
  const [nic,setNic] = React.useState();
  const [mobile,setMobile] = React.useState();


  const handleClose = () => {
    setOpen(false);
  };

  const handleUpadate = async ()=>{
    const res =   await updateEmployee(employee?.email,fname,lname,nic,mobile);
    setUpdateEmployee(res);
    console.log(res);
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Employee</DialogTitle>
        <DialogContent>
          <DialogContentText>
          
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            contentEditable={false}
            variant="standard"
            value={employee?.email}
        
          />

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="First Name"
            type="First Name"
            fullWidth
            variant="standard"
            placeholder={employee?.fname}
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
            placeholder={employee?.lname}
            onChange={(e)=>{e.preventDefault, setlname(e.target.value)}}
          />

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="NIC"
            type="NIC"
            fullWidth
            variant="standard"
            placeholder={employee?.nic}
            onChange={(e)=>{e.preventDefault, setNic(e.target.value)}}
          />

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Mobile"
            type="Mobile"
            fullWidth
            variant="standard"
            placeholder={employee?.mobile}
            onChange={(e)=>{e.preventDefault, setMobile(e.target.value)}}
          />

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Password"
            type="Password"
            fullWidth
            variant="standard"
            value={employee?.password}
          />

        


        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpadate}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
