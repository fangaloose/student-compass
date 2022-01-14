import TableTermComponent from "../../components/Table/tableTerm.component";
import CourseService from "../../service/courses.service";

import { Grid } from "@mui/material";
import BreadCrumbsTermsTeacher from "../../components/breadcrumbs/mybreadcrumbs.component";
import { useParams } from "react-router-dom";
import AddCourseToTermDialog from "../../components/dialogs/addCourseToTermDialog.component";
import CategoryDropDown from "../../components/dropdownsubmit/category.component";

const TermsPage = () => {
  const {courseId}:any = useParams();
  const auxDeleteTerm = (termId:string) =>{
    return CourseService.deleteTerm(courseId,termId);
  }
 
  return (
    <>
      <Grid container px='20px'>

      <Grid item xs={12} textAlign="left" marginBottom="15px">
        <BreadCrumbsTermsTeacher></BreadCrumbsTermsTeacher>
      </Grid>

        <TableTermComponent addDialog={<AddCourseToTermDialog></AddCourseToTermDialog>} getData={()=>(CourseService.getTerms(courseId))} showEdit={false} deleteTerm={auxDeleteTerm}></TableTermComponent>

        <CategoryDropDown />

      </Grid>
    </>
  );
};

export default TermsPage;
