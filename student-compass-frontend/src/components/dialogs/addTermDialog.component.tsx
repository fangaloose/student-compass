import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

import AddIcon from "@mui/icons-material/Add";
import DialogBase from "./dialogBase.component";
import { useState } from "react";
import TermService from "../../service/terms.service";

export default function AddTermDialog() {

  const [name,setName]=useState<string>('')
  const [startDate,setStartDate]=useState<string>('')
  const [endtDate,setEndDate]=useState<string>('')

  return (
    <>
      <DialogBase
        title="Add Term"
        icon={<AddIcon />}
        color="primary"
        onSubmit={async () => {

          await TermService.postTerm(name,startDate,endtDate);

        }}
      >
        <DialogContent>
          <DialogContentText>Please choose the Term's name.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="termname"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e)=>setName(e.target.value)}
          />
        </DialogContent>
        <DialogContent>
          <DialogContentText>
            Please enter the Term's start date.
          </DialogContentText>
          <TextField margin="dense" id="startdate" type="date" fullWidth onChange={(e)=>setStartDate(e.target.value)}/>
        </DialogContent>
        <DialogContent>
          <DialogContentText>
            Please enter the Term's end date.
          </DialogContentText>
          <TextField margin="dense" id="enddate" type="date" fullWidth onChange={(e)=>setEndDate(e.target.value)}/>
        </DialogContent>
      </DialogBase>
    </>
  );
}
