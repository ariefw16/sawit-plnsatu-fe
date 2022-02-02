import {
  List,
  ListSubheader,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  SxProps,
  Theme,
} from "@mui/material";
import { useLocation, Link } from "react-router-dom";
import { MenuType } from "../../../types/menu.type";
import { Box } from "@mui/system";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ApartmentIcon from "@mui/icons-material/Apartment";
import LogoutIcon from "@mui/icons-material/Logout";
import AlarmIcon from "@mui/icons-material/Alarm";
import FeedIcon from "@mui/icons-material/Feed";
import SendToMobileIcon from "@mui/icons-material/SendToMobile";

export default function MenuApp() {
  const { pathname } = useLocation();

  return (
    <>
      <List sx={sxList}>
        <ListSubheader>App Menu</ListSubheader>
        {menu
          .filter((x) => x.section === "app")
          .map((menu) => (
            <ListItemButton
              key={menu.to}
              sx={{ borderRadius: 3, p: 1 }}
              selected={menu.to === pathname}
              component={Link}
              to={menu.to}
            >
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ fontSize: 14, fontWeight: "bold" }}
                primary={menu.label}
              />
            </ListItemButton>
          ))}
      </List>
      <List sx={sxList}>
        <ListSubheader>Administrator</ListSubheader>
        {menu
          .filter((x) => x.section === "admin")
          .map((x) => (
            <ListItemButton
              key={x.to}
              sx={{ borderRadius: 3, p: 1 }}
              selected={pathname.includes(x.to)}
              component={Link}
              to={x.to}
            >
              <ListItemIcon>{x.icon}</ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ fontSize: 14, fontWeight: "bold" }}
                primary={x.label}
              />
            </ListItemButton>
          ))}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <List sx={sxList}>
        {menu
          .filter((x) => x.section === "foot-extra")
          .map((x) => (
            <ListItemButton
              key={x.to}
              sx={{ borderRadius: 3, p: 1 }}
              selected={x.to === pathname}
              component={Link}
              to={x.to}
            >
              <ListItemIcon>{x.icon}</ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ fontSize: 14, fontWeight: "bold" }}
                primary={x.label}
              />
            </ListItemButton>
          ))}
      </List>
    </>
  );
}

const sxList: SxProps<Theme> = {
  mx: 2,
  "&& .Mui-selected, && .Mui-selected:hover": {
    bgcolor: (theme: Theme) => theme.palette.secondary.light,
    "&, & .MuiListItemIcon-root": {
      color: (theme: Theme) => theme.palette.secondary.main,
    },
  },
  "& .MuiListItemButton-root:hover": {
    bgcolor: (theme: Theme) => theme.palette.secondary.light,
    "&, & .MuiListItemIcon-root": {
      color: (theme: Theme) => theme.palette.secondary.main,
    },
  },
};

const menu: MenuType[] = [
  {
    label: "Dashboard",
    to: "/",
    section: "app",
    icon: <DashboardIcon />,
  },
  {
    label: "User",
    to: "/user",
    section: "admin",
    icon: <PersonIcon />,
  },
  {
    label: "Unit",
    to: "/unit",
    section: "admin",
    icon: <ApartmentIcon />,
  },
  {
    label: "Logout",
    to: "/logout",
    section: "foot-extra",
    icon: <LogoutIcon />,
  },
  {
    label: "Checkin Article",
    to: "/available-article",
    section: "app",
    icon: <SendToMobileIcon />,
  },
  {
    label: "Sharing Schedule",
    to: "/schedule",
    section: "app",
    icon: <AlarmIcon />,
  },
  {
    label: "Articles",
    to: "/article",
    section: "app",
    icon: <FeedIcon />,
  },
];
