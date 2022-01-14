import { Switch, Route } from "react-router-dom";

import CoursesPage from "../pages/teacher/courses.page";
import StudentPage from "../pages/teacher/students.page";
import LogoutPage from "../pages/common/logout.page";
import ProfilePage from "../pages/common/profile.page";
import TermsPage from "../pages/teacher/terms.page";

const TeacherRouterComponent = () => {
  return (
    <Switch>
      <Route path="/logout">
        <LogoutPage></LogoutPage>
      </Route>
      <Route path="/profile">
        <ProfilePage></ProfilePage>
      </Route>
      <Route exact path="/courses/:termId/:courseId">
        <StudentPage></StudentPage>
      </Route>
      <Route exact path="/courses/:termId/:courseId/terms">
        <TermsPage></TermsPage>
      </Route>
      <Route path="/">
        <CoursesPage></CoursesPage>
      </Route>
    </Switch>
  );
};

export default TeacherRouterComponent;
