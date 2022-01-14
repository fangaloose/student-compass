import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import AddIcon from "@mui/icons-material/Add";
import DialogBase from "./dialogBase.component";
import { Autocomplete, Checkbox } from "@mui/material";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import React from "react";
import CourseService from "../../service/courses.service";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { User } from "../../interfaces/interface";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function AddStudentDialog() {

  const {termId,courseId}:any = useParams();
  const [value, setValue] = React.useState<User[]>([]);
  const [users, setUsers] = React.useState<User[]>([]);

  
  const refreshPage = React.useCallback(async () => {
    try {
      const _users: User[] = await CourseService.getUsersNotInCourse(courseId,termId)
      setUsers(_users);

    } catch (e:any) {toast.error(e.message,{})}
  }, [courseId,termId]);

  React.useEffect(() => {
    refreshPage();
  }, [refreshPage]);



  return (
    <>
      <DialogBase
        title="Add Student"
        icon={<AddIcon />}
        color="primary"
        onSubmit={async () => {
          const arrayOfIds=value.map((val)=>(val.id))
          await CourseService.addStudentsToCourse(courseId,termId,arrayOfIds)
        }}
      >
        <DialogContent>
          <DialogContentText>
            Please enter your student's email address here.
          </DialogContentText>
          
          <Autocomplete
      multiple
      onChange={(event, newValue) => {setValue(newValue)}}
      options={users}
      isOptionEqualToValue={(option, value) => option.email === value.email}
      disableCloseOnSelect
      getOptionLabel={(option) => option.email}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.email}
        </li>
      )}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} label="Students" />
      )}
    />

        </DialogContent>
      </DialogBase>
    </>
  );
}
