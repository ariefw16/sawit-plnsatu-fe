import { Box, CssBaseline, AppBar, Toolbar, Drawer } from "@mui/material";
import { Outlet } from "react-router-dom";
import ButtonUser from "./parts/ButtonUser";
import MenuApp from "./parts/MenuApp";
import ToolbarApp from "./parts/ToolbarApp";

export default function AppLayout() {
  const drawerWidth = 240;
  const appbarHeight = 70;
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          height: appbarHeight,
          ml: `${drawerWidth}px`,
          bgcolor: "#fbf9fb",
          opacity: 0.9,
        }}
      >
        <ToolbarApp />
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <ButtonUser bgcolor="whitesmoke" />
        <MenuApp />
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
