import { CircularProgress, Grid } from "@mui/material";
import "./spinner.css";

const Spinner = () => {
  return (
    <div className="spinnerContainer">
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          <CircularProgress color="secondary"/>
        </Grid>
      </Grid>
    </div>
  );
};

export default Spinner;
