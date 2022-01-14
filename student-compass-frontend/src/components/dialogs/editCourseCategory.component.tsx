import {
  DialogContent,
  DialogContentText,
  TextField,
} from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import DialogBase from "./dialogBase.component";
import CategoryService from "../../service/categories.service";
import { useState } from "react";


export default function EditCourseCategory(props:{id:string}) {

  const [name,setName]=useState<string>('')

  return (
    <>
      <DialogBase
        title="Edit Course Category"
        icon={<CreateIcon />}
        variant='text'
        onSubmit={async () => {
          await CategoryService.putCategory(props.id,name)
        }}
      >
        <DialogContent>
          <DialogContentText>
            Please choose the new category's name.
          </DialogContentText>
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
      </DialogBase>
    </>
  );
}
