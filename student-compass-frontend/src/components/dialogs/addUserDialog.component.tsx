import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

import AddIcon from "@mui/icons-material/Add";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import DialogBase from "./dialogBase.component";
import { useState } from "react";
import UserService from "../../service/users.service";

export default function AddUserDialog() {

  const [fname,setFName]=useState<string>('')
  const [lname,setLName]=useState<string>('')
  const [email,setEmail]=useState<string>('')
  const [role,setRole]=useState<string>('')
  
  return (
    <>
      <DialogBase
        title="Add User"
        icon={<AddIcon />}
        color="primary"
        onSubmit={async () => {
          await UserService.postUser(fname,lname,email,role);
        }}
      >
        <DialogContent>
          <DialogContentText>
            Please enter the new user's first name here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="User First Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e)=>setFName(e.target.value)}
          />
        </DialogContent>
        <DialogContent>
          <DialogContentText>
            Please enter the new user's last name here.
          </DialogContentText>
          <TextField
            margin="dense"
            id="userlastname"
            label="User Last Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e)=>setLName(e.target.value)}
          />
        </DialogContent>
        <DialogContent>
          <DialogContentText>
            Please enter the new user's email address here.
          </DialogContentText>
          <TextField
            margin="dense"
            id="useremail"
            label="User Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e)=>setEmail(e.target.value)}
          />
        </DialogContent>
        <DialogContent>
          <DialogContentText>
            Please choose the new user's role.
          </DialogContentText>
          <FormControl component="fieldset">
            <RadioGroup name="role-radio-button" onChange={(e)=>setRole(e.target.value)}>
              <FormControlLabel
                value="6196ad2ec1e37ade5bb0058a"
                control={<Radio />}
                label="Student"
              />
              <FormControlLabel
                value="6196ad32c1e37ade5bb0058c"
                control={<Radio />}
                label="Teacher"
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
      </DialogBase>
    </>
  );
}
