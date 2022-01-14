import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import React from "react";
import { Rating } from "@mui/material";

const labels: { [index: string]: string } = {
  1: "Useless",
  2: "Poor",
  3: "Ok",
  4: "Good",
  5: "Excellent",
};

export default function RateComponent(props:{setStarValue: React.Dispatch<React.SetStateAction<number | null>>}) {
  const [starValue, setStarValue] = React.useState<number | null>(5);
  const [hover, setHover] = React.useState(-1);

  return (
    <>
      <Box
        sx={{
          width: 250,
          display: "flex",
          alignItems: "center",
          mx:"auto"
        }}
      >
        <Rating
          name="hover-feedback"
          value={starValue}
          onChange={(event, newValue) => {
            setStarValue(newValue);
            props.setStarValue(newValue);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        {starValue !== null && (
          <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : starValue]}</Box>
        )}
      </Box>
    </>
  );
}
