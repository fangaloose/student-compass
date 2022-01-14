import * as React from "react";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

import AddIcon from "@mui/icons-material/Add";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import DialogBase from "./dialogBase.component";
import { Term } from "../../interfaces/interface";
import TermService from "../../service/terms.service";
import { toast } from "react-toastify";
import CourseService from "../../service/courses.service";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

export default function AddCourseToTermDialog() {
  const [term, setTerm] = React.useState<Term[]>([]);

  const [selectedTerm, setSelectedTerm] = React.useState<string>("");

  const {courseId}:any = useParams();
  const teacherId :string = useAppSelector(root=>root.user.id)
  
  const refreshPage = React.useCallback(async () => {
    try {
      const _term: Term[] = await TermService.getTermsForCourse(courseId);
      setTerm(_term);
    } catch (e:any) {toast.error(e.message,{})}
  }, [courseId]);

  React.useEffect(() => {
    refreshPage();
  }, [refreshPage]);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedTerm(event.target.value);
  };

  return (
    <>
      <DialogBase
        title="Add Course To Term"
        icon={<AddIcon />}
        color="primary"
        onSubmit={async () => {
          await CourseService.addCourseToTerm(courseId,selectedTerm,teacherId)
        }}
      >
        <DialogContent>
          <DialogContentText>
            Please select the Term you want this course to be added to.
          </DialogContentText>
          <FormControl fullWidth>
            <InputLabel variant="standard">Term</InputLabel>
            <Select
              label="Term"
              value={selectedTerm}
              onChange={handleChange}
              variant="standard"
              fullWidth
            >
              {term.map((value, index) => (
                  <MenuItem value={value.id}>
                    {value.name}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
        </DialogContent>
      </DialogBase>
    </>
  );
}
