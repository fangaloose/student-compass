import { Grid, Skeleton } from "@mui/material";
import React from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import CourseService from "../../service/courses.service";
import TermService from "../../service/terms.service";

const InfoCourse = () => {
  const { termId, courseId }: any = useParams();

  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [course, setCourse] = React.useState<string>("");
  const [term, setTerm] = React.useState<string>("");

  const refreshPage = React.useCallback(async () => {
    setLoaded(false);
    try {
      const _course: string = await CourseService.getCourseName(courseId);
      setCourse(_course);
      const _term: string = await TermService.getTermName(termId);
      setTerm(_term);
    } catch (e: any) {
      toast.error(e.message, {});
    }
    setLoaded(true);
  }, [courseId,termId]);

  React.useEffect(() => {
    refreshPage();
  }, [refreshPage]);

  return (
    <>
      <Grid container alignItems="center">
        <Grid item xs={12}>
          <h4 style={{ textAlign: "left", margin: 0 }}>
            Course: {loaded ? course : <Skeleton variant="text" width={150} />}
          </h4>
        </Grid>
        <Grid item xs={12}  sx={{ marginBottom: "15px" }}>
          <h4 style={{ textAlign: "left", margin: 0 }}>
            Term: {loaded ? term : <Skeleton variant="text" width={150} />}
          </h4>
        </Grid>
      </Grid>
    </>
  );
};

export default InfoCourse;
