import { Switch, Route } from "react-router-dom";

import UsersPage from "../pages/admin/users.page";
import LogoutPage from "../pages/common/logout.page";
import TermsPage from "../pages/admin/terms.page";
import CategoriesPage from "../pages/admin/categories.page";
import ProfilePage from "../pages/common/profile.page";

const AdminRouterComponent = () => {
  return (
    <Switch>
      <Route path="/logout">
        <LogoutPage></LogoutPage>
      </Route>
      <Route path="/profile">
        <ProfilePage></ProfilePage>
      </Route>
      <Route path="/terms">
        <TermsPage></TermsPage>
      </Route>
      <Route path="/categories">
        <CategoriesPage></CategoriesPage>
      </Route>
      <Route path="/courses">
        <UsersPage></UsersPage>
      </Route>

      <Route path="/">
        <UsersPage></UsersPage>
      </Route>
    </Switch>
  );
};

export default AdminRouterComponent;
