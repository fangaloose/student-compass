import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { useHistory } from "react-router";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import stringToColor from "../../utils/colorgen";
import { Avatar, ListItemAvatar } from "@mui/material";

const drawerWidth = 240;

export interface Tab{
    name:string,
    icon:any,
    link:string
  }

interface Props {
  children:any;
  tabs:Tab[];
  title:string;
  window?: () => Window;
}

export default function ResponsiveDrawer(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const history = useHistory();
  const user = useAppSelector((state: RootState) => state.user);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{backgroundColor:stringToColor(user.fname +" "+user.lname)}}>{user.fname.split("")[0].toUpperCase() +""+user.lname.split("")[0].toUpperCase()}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={user.fname +" "+user.lname} />
          </ListItem>

          <Divider />

          {props.tabs.map((value,index)=>(
            
            <ListItem
            key={index}
            button
            onClick={() => {
              history.push(value.link);
            }}
          >
            <ListItemIcon>
              {value.icon}
            </ListItemIcon>
            <ListItemText primary={value.name} />
          </ListItem>
          ))}

        </List>

        <List
          sx={{ position: "absolute", bottom: 0, width: "100%" }}
        >
          <ListItem button onClick={() => {history.push("/profile");}}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>

          <ListItem button onClick={() => {history.push("/logout");}}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>


        </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {props.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: `calc(100% - ${drawerWidth}px)` }}
      >
        <Toolbar />
         {props.children}
      </Box>
    </Box>
  );
}