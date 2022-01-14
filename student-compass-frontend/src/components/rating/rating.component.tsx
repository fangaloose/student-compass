import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import React from "react";
import { Grid, List, ListItem, Rating } from "@mui/material";
import { Review } from "../../interfaces/interface";

const labels: { [index: string]: string } = {
  1: "Useless",
  2: "Poor",
  3: "Ok",
  4: "Good",
  5: "Excellent",
};

export default function RatingComponent(props: { reviews: Review[] }) {
  const [starValue, setStarValue] = React.useState<number | null>(5);
  const [hover, setHover] = React.useState(-1);

  return (
    <Grid container alignItems="center">
      <Grid item xs={12} md={2}>
        <h3
          style={{
            textAlign: "left",
            paddingLeft: "16px",
            margin: "0px",
          }}
        >
          Reviews
        </h3>
      </Grid>
      <Grid item xs={12} md={8}>
        <Box
          sx={{
            width: 250,
            display: "flex",
            alignItems: "center",
            mx: "auto",
          }}
        >
          <Rating
            name="hover-feedback"
            value={starValue}
            onChange={(event, newValue) => {
              setStarValue(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
          {starValue !== null && (
            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : starValue]}</Box>
          )}
        </Box>
      </Grid>

      <Grid item xs={12}>
        <List>
          {props.reviews.map(
            (value, index) =>
              starValue !== null &&
              starValue === value.note && (
                <ListItem>{value.text}</ListItem>
              )
          )}
        </List>
      </Grid>
    </Grid>
  );
}
