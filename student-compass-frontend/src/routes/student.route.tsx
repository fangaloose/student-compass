import { Switch, Route } from "react-router-dom";
import LogoutPage from "../pages/common/logout.page";
import ProfilePage from "../pages/common/profile.page";
import CoursesPage from "../pages/student/courses.page";
import MainPage from "../pages/student/main.page";

const StudentRouterComponent = () => {
  return (
    <Switch>
      <Route path="/logout">
        <LogoutPage></LogoutPage>
      </Route>
      <Route path="/profile">
        <ProfilePage></ProfilePage>
      </Route>
      <Route path="/courses/:termId/:courseId">
        <MainPage></MainPage>
      </Route>
      <Route path="/">
        <CoursesPage></CoursesPage>
      </Route>
    </Switch>
  );
};

export default StudentRouterComponent;
