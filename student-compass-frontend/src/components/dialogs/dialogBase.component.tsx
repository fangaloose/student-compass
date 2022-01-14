import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Tooltip } from "@mui/material";
import { toast } from "react-toastify";

interface Props {
  title: string;
  icon: any;
  cancelText?: string;
  sendText?: string;
  variant?: "contained" | "text" | "outlined";
  color?:"secondary" | "inherit" | "primary" | "success" | "error" | "info" | "warning";
  children?: any;
  onSubmit: () => Promise<any>;
}

DialogBase.defaultProps = {
  cancelText: "Cancel",
  sendText: "Send",
  variant: "contained",
  color:"secondary"
};

export default function DialogBase(props: Props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    setOpen(false);
    try{
     await props.onSubmit();
    }catch(e:any){
      toast.error(e.message,{})
    }

  };

  return (
    <>
      <Tooltip title={props.title}>
        <Button
          variant={props.variant}
          color={props.color}
          sx={{ marginLeft: "5px", marginRight: "5px" }}
          onClick={handleClickOpen}
        >
          {props.icon}
        </Button>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
          {props.children}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{props.cancelText}</Button>
          <Button onClick={handleSubmit} autoFocus>
            {props.sendText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
