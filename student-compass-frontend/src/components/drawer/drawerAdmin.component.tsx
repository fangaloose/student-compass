import ResponsiveDrawer, { Tab } from "./responsiveBase";

import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from '@mui/icons-material/Assignment';
import CategoryIcon from '@mui/icons-material/Category';


export default function MiniDrawerAdmin(props: { children: any }) {
  const tabs:Tab[]=[
    {name:"Users",icon:<PersonIcon />,link:"/"},
    {name:"Terms",icon:<AssignmentIcon />,link:"/terms"},
    {name:"Categories",icon:<CategoryIcon />,link:"/categories"},
  ]

  return(<ResponsiveDrawer tabs={tabs} title='Student Compass - Admin Panel'>{props.children}</ResponsiveDrawer>)
}
