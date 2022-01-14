import { Grid, List, ListItemAvatar, ListItem, Avatar,ListItemText } from "@mui/material";
import FunctionsIcon from '@mui/icons-material/Functions';
import PeopleIcon from '@mui/icons-material/People';

export default function StatsComponent(props:{moyenne:number,number_of_reviews:number}) {
  return (
    <Grid container alignItems="center">
      <Grid item xs={2}>
        <h3
          style={{
            textAlign: "left",
            paddingLeft: "16px",
            margin: "0px",
          }}
        >
          Stats
        </h3>
      </Grid>
      <Grid item xs={8}></Grid>

      <Grid item xs={12}>
        <List>
          
        <ListItem>
            <ListItemAvatar>
              <Avatar>
                <FunctionsIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Average" secondary={props.moyenne} />
          </ListItem>

          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <PeopleIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="# Reviews" secondary={props.number_of_reviews} />
          </ListItem>

        </List>
      </Grid>
    </Grid>
  );
}
