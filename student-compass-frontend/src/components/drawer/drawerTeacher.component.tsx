import ResponsiveDrawer, { Tab } from "./responsiveBase";
import BookIcon from "@mui/icons-material/Book";

export default function MiniDrawerAdmin(props: { children: any }) {
  const tabs:Tab[]=[
    {name:"Courses",icon:<BookIcon />,link:"/"},
  ]

  return(<ResponsiveDrawer tabs={tabs} title='Student Compass'>{props.children}</ResponsiveDrawer>)
}