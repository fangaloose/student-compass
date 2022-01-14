import * as React from "react";
import TextField from "@mui/material/TextField";
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
import { Category, Term } from "../../interfaces/interface";
import { toast } from "react-toastify";
import CourseService from "../../service/courses.service";
import { useAppSelector } from "../../app/hooks";
import CategoryService from "../../service/categories.service";
import TermService from "../../service/terms.service";

export default function AddCourseDialog() {
  const [category, setCategory] = React.useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("");

  const [term, setTerm] = React.useState<Term[]>([]);
  const [selectedTerm, setSelectedTerm] = React.useState<string>("");

  const [name,setName]=React.useState<string>('');
  const [description,setDescription]=React.useState<string>('');

  const teacherId=useAppSelector(state=>state.user.id);


  const refreshPage = React.useCallback(async () => {
    try {
      const _cat: Category[] = await CategoryService.getAllCategories();
      setCategory(_cat);

      const _term: Term[] = await TermService.getAllTerms();
      setTerm(_term);

    } catch (e:any) {toast.error(e.message,{})}
  }, []);

  React.useEffect(() => {
    refreshPage();
  }, [refreshPage]);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value);
  };
  const handleChange2 = (event: SelectChangeEvent) => {
    setSelectedTerm(event.target.value);
  };

  return (
    <>
      <DialogBase
        title="Add Course"
        icon={<AddIcon />}
        onSubmit={async () => {
          await CourseService.addCourse(name,description,selectedCategory,selectedTerm,teacherId)
        }}
      >
        <DialogContent>
          <DialogContentText>
            Please enter your course's name here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="Course-name"
            label="Course Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e)=>setName(e.target.value)}
          />
        </DialogContent>
        <DialogContent>
          <DialogContentText>
            Please enter your course's description here.
          </DialogContentText>
          <TextField
            margin="dense"
            id="Course-description"
            label="Course Description"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e)=>setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel id="select-category-label">Category</InputLabel>
            <Select
              labelId="select-category-label"
              id="category-select"
              value={selectedCategory}
              label="Category"
              onChange={handleChange}
            >
              {category.map((value, index) => {
                return (
                  <MenuItem value={value.id}>
                    {value.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel id="select-term-label">Term</InputLabel>
            <Select
              labelId="select-term-label"
              id="term-select"
              value={selectedTerm}
              label="Term"
              onChange={handleChange2}
            >
              {term.map((value, index) => {
                return (
                  <MenuItem value={value.id}>
                    {value.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </DialogContent>
      </DialogBase>
    </>
  );
}
