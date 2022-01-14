import { Grid } from "@mui/material";
import AddTermDialog from "../../components/dialogs/addTermDialog.component";
import TableTermComponent from "../../components/Table/tableTerm.component";
import TermService from "../../service/terms.service";

const TermsPage = () => {

  return (
    <>
      <Grid container px='20px'>

        <TableTermComponent addDialog={<AddTermDialog></AddTermDialog>} getData={TermService.getAllTerms} showEdit={true} deleteTerm={TermService.deleteTerm}></TableTermComponent>

      </Grid>
    </>
  );
};

export default TermsPage;
