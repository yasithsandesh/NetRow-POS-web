import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TextField } from "@mui/material";
import sendEmailProcess from "@/utils/sendEmailProcess";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EmailSend({
  openEmail,
  setOpenEmail,
  sendEmail,
  fromEmail,
}) {
  const handleClose = () => {
    setOpenEmail(false);
  };

  const [subject,setSubject] = React.useState()
  const [sendText,setSendText] = React.useState()

  return (
    <div>
      <Dialog
        fullScreen
        open={openEmail}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              From: {fromEmail}
            </Typography>

            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              To: {sendEmail}
            </Typography>
            <Button autoFocus color="inherit" onClick={()=>{
              handleClose();
              sendEmailProcess(fromEmail,sendEmail,subject,sendText)
            }}>
              Send Email
            </Button>
          </Toolbar>
        </AppBar>

        <div className="flex justify-center items-center flex-col p-10 gap-2">
          <TextField
            autoFocus
            margin="dense"
            id="subject"
            label="Subject"
            type="Subject"
            fullWidth
            variant="standard"
            onChange={(e)=>{e.preventDefault,setSubject(e.target.value)}}
          />
          <textarea className="textarea-email" onChange={(e)=>{e.preventDefault,setSendText(e.target.value)}}/>
        </div>
      </Dialog>
    </div>
  );
}
