import { Grid } from "@mui/material";
import AddCourseCategory from "../../components/dialogs/addCourseCategory.component";
import TableCategoryComponent from "../../components/Table/tableCategory.component";
import CategoryService from "../../service/categories.service";

const CategoriesPage = () => {

  return (
    <>
      <Grid container px='20px'>

        <TableCategoryComponent addDialog={<AddCourseCategory></AddCourseCategory>} getData={CategoryService.getAllCategories} showEdit={true}></TableCategoryComponent>

      </Grid>
    </>
  );
};

export default CategoriesPage;
