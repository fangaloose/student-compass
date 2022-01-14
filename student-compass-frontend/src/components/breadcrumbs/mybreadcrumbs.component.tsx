import { Breadcrumbs, Link, Skeleton, Typography } from "@mui/material";
import { useHistory, useParams } from "react-router-dom";

import React from "react";
import CourseService from "../../service/courses.service";
import { toast } from "react-toastify";

const BreadCrumbsTermsTeacher = () => {
  const history = useHistory();

  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string>("course");

  const { termId, courseId }: any = useParams();

  const refreshPage = React.useCallback(async () => {
    setLoaded(false);
    try {
      
      const name = await CourseService.getCourseName(courseId);
      setName(name);
    } catch (e:any) {toast.error(e.message,{})}
    setLoaded(true);
  }, [courseId]);

  React.useEffect(() => {
    refreshPage();
  }, [refreshPage]);

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link
        underline="hover"
        color="inherit"
        onClick={() => {
          history.push("/");
        }}
      >
        Courses
      </Link>
      <Link
        underline="hover"
        color="inherit"
        onClick={() => {
          const id=termId+'/'+courseId
          history.push("/courses/"+id);
        }}
      >
        {loaded ? name : <Skeleton variant="text" width={100} />}
      </Link>
      <Typography color="text.primary">Settings</Typography>
    </Breadcrumbs>
  );
};

export default BreadCrumbsTermsTeacher