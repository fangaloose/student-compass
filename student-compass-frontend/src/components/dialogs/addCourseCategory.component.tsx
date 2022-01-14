import {
  DialogContent,
  DialogContentText,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DialogBase from "./dialogBase.component";
import CategoryService from "../../service/categories.service";
import { useState } from "react";

export default function AddCourseCategory() {
  
  const [name,setName]=useState<string>('')

  return (
    <>
      <DialogBase
        title="Add Course Category"
        icon={<AddIcon />}
        color="primary"
        onSubmit={async () => {
          await CategoryService.postCategory(name)
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
