import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import AddIcon from "@mui/icons-material/Add";
import DialogBase from "./dialogBase.component";
import { useParams } from "react-router-dom";
import CourseService from "../../service/courses.service";
import { useState } from "react";

export default function AddChapterDialog() {
  const {courseId}:any = useParams();
  const [name,setName]=useState<string>('')
  return (
    <>
      <DialogBase
        title="Add Competence"
        icon={<AddIcon/>}
        color="primary"
        sendText="Add"
        onSubmit={async () => {
          await CourseService.postChapter(courseId,name)
        }}
      >
        <DialogContent>
          <DialogContentText>
            Please enter the new Competence's name.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="chaptername"
            label="Competence Name"
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
