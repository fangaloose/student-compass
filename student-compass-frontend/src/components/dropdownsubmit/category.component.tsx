import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
  } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Category } from "../../interfaces/interface";
import CategoryService from "../../service/categories.service";
import CourseService from "../../service/courses.service";

const CategoryDropDown = () => {

    const {courseId}:any = useParams();

    const [category, setCategory] = React.useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = React.useState<string>("-1");

    const handleChange2 = (event: SelectChangeEvent) => {
        setSelectedCategory(event.target.value);
      };


      const refreshPage = React.useCallback(async () => {
        try {
          const _category: Category[] = await CategoryService.getAllCategories();
          setCategory(_category);
          const _courseCategoryId :string = await CourseService.getCourseCategory(courseId);
          setSelectedCategory(_courseCategoryId)
        } catch (e:any) {toast.error(e.message,{})}
      }, [courseId]);
    
      React.useEffect(() => {
        refreshPage();
      }, [refreshPage]);

      const submitCategory = async () => {
        try{
          await CourseService.patchCourseCategory(courseId,selectedCategory)
        }
        catch(e:any){toast.error(e.message,{})}
      }


    return(<>
    
    <Grid container sx={{'marginTop':'10px'}} justifyContent='center'>
        
        <Grid item xs={12} textAlign='left'><h2>Category</h2></Grid>

        <Grid item xs={9} md={5}>


        <FormControl fullWidth>
          <InputLabel variant="standard">Category</InputLabel>
          <Select
            label="Category"
            value={selectedCategory}
            onChange={handleChange2}
            variant="standard"
            fullWidth
          >
            {category.map((value, index) => {
              return <MenuItem key={index} value={value.id}>{value.name}</MenuItem>;
            })}
          </Select>
        </FormControl>


        </Grid>
        <Grid item xs={3} md={1}>
            <Button variant="contained" fullWidth sx={{'height':'100%'}} onClick={()=>{submitCategory()}}>Submit</Button>
        </Grid>
        
    </Grid>
    
    </>)
}

export default CategoryDropDown;