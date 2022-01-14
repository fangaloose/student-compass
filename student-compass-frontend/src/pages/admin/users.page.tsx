import { Grid } from "@mui/material";
import AddUserDialog from "../../components/dialogs/addUserDialog.component";

import TableUserComponent from "../../components/Table/tableUser.component";
import UserService from "../../service/users.service";

const UsersPage = () => {

  return (
    <>
      <Grid container px='20px'>

        <TableUserComponent addDialog={<AddUserDialog></AddUserDialog>} getData={UserService.getAllUsers} title='Users' deleteUser={UserService.deleteUser}></TableUserComponent>

      </Grid>
    </>
  );
};

export default UsersPage;
