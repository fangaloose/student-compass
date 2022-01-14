import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

import CreateIcon from '@mui/icons-material/Create';
import DialogBase from "./dialogBase.component";
import { useState } from "react";
import TermService from "../../service/terms.service";

export default function EditTermDialog(props:{id:string}) {

  const [name,setName]=useState<string>('')
  const [startDate,setStartDate]=useState<string>('')
  const [endtDate,setEndDate]=useState<string>('')
  
  return (
    <>
      <DialogBase
        title="Edit Term"
        icon={<CreateIcon />}
        variant='text'
        onSubmit={async () => {
          await TermService.patchTerm(props.id,name,startDate,endtDate);
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
