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

export default function AddEmployee({ setOpen, open,setNewEmployee }) {

  const [email,setEmail] = React.useState();
  const [fname,setFname] = React.useState(); 
  const [lname,setLname] = React.useState(); 
  const [nic,setNic] = React.useState();   
  const [mobile,setMobile] = React.useState();
  const [password,setPassword] = React.useState();
  const [gender,setGenderId] = React.useState();
  const [type,setTypeId] = React.useState();
  

  const addEmployee = async ()=>{

    const employeeObj = {
      email:email,
      fname:fname,
      lname:lname,
      nic:nic,
      mobile:mobile,
      password:password,
      gender_id:'1',
      employee_id:'1',
    }

    await axios.post('http://localhost:8000/api/add-employee',employeeObj).then((res)=>{
      setNewEmployee(res.data.neEmployee)
      setOpen(false);
    }).catch((error)=>{
      console.log(error)
    })

  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Employee</DialogTitle>
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
            variant="standard"
            onChange={(e)=>{e.preventDefault, setEmail(e.target.value)}}
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
            label="NIC"
            type="NIC"
            fullWidth
            variant="standard"
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
            onChange={(e)=>{e.preventDefault, setPassword(e.target.value)}}
          />

          <div className=" flex flex-row justify-start items-center gap-3 mt-4">
            <GenderSelect />
            <TypeSelect />
          </div>


        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addEmployee} >ADD</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
