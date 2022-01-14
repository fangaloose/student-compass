import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import ChaptersReview from "../../components/chapters/chaptersInput.component";
import InfoCourse from "../../components/infoCourse/infoCourse.component";
import CourseService from "../../service/courses.service";

const MainPage = () => {
  const {courseId,termId}:any = useParams();
  const studentid: string = useAppSelector((state: RootState) => state.user.id);

    return (
    <Grid container px='20px'>
      <InfoCourse />
      <ChaptersReview getChapters={()=>(CourseService.getChaptersStudent(courseId,studentid,termId))} addDialog={undefined}></ChaptersReview>
    </Grid>
    );
  };
  
  export default MainPage;