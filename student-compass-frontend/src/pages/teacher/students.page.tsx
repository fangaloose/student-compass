import { Button, Divider, Grid, Tooltip } from "@mui/material";
import ChaptersAccordion from "../../components/chapters/chapters.comonent";
import AddChapterDialog from "../../components/dialogs/addChapterDialog.component";
import AddStudentDialog from "../../components/dialogs/addStudentDialog.component";
import TableUserComponent from "../../components/Table/tableUser.component";
import CourseService from "../../service/courses.service";
import CreateIcon from '@mui/icons-material/Create';
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import InfoCourse from "../../components/infoCourse/infoCourse.component";


const StudentPage = () => {

  const history=useHistory()

  const {termId,courseId}:any = useParams();
  const auxDeleteUser = (userId:string) => {
    return CourseService.deleteUser(userId,courseId,termId)
  }

  return (
    <>
      <Grid container px='20px'>
      
      <Grid item xs={12} sx={{textAlign:"right"}}>

      <Tooltip title="Settings">
        <Button
          variant="text"
          sx={{ marginLeft: "5px", marginRight: "5px",marginBottom:"15px" }}
          onClick={()=>{history.push("/courses/"+termId+'/'+courseId+"/terms")}}
        >
          <CreateIcon></CreateIcon>
        </Button>
      </Tooltip>

        </Grid>

        <InfoCourse />

        <ChaptersAccordion addDialog={<AddChapterDialog></AddChapterDialog>} getChapters={()=>(CourseService.getReviews(courseId,termId))}></ChaptersAccordion>

        <Grid item xs={12} sx={{margin:"40px 0"}}><Divider/></Grid>

        <TableUserComponent addDialog={<AddStudentDialog></AddStudentDialog>} getData={()=>(CourseService.getUsers(courseId,termId))} title="Students" deleteUser={auxDeleteUser}></TableUserComponent>

      </Grid>
    </>
  );
};

export default StudentPage;
