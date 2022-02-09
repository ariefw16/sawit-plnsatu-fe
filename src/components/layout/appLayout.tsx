import { Box, CssBaseline, AppBar, Toolbar, Drawer } from "@mui/material";
import axios from "axios";
import { Navigate, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { hideToast } from "../../store/toast.store";
import AppToast from "../ui/AppToast";
import ButtonUser from "./parts/ButtonUser";
import MenuApp from "./parts/MenuApp";
import ToolbarApp from "./parts/ToolbarApp";

export default function AppLayout() {
  const drawerWidth = 250;
  const appbarHeight = 70;
  const toast = useAppSelector((state) => state.toast);
  const dispatch = useAppDispatch();
  const handleToastClose = () => {
    dispatch(hideToast());
  };
  const access = useAppSelector((state) => state.auth.access_token);
  const localAccess = localStorage.getItem("key");
  if (access === "" && localAccess === null) {
    return <Navigate to="/auth" replace />;
  }
  axios.defaults.headers.common.Authorization = `Bearer ${localAccess}`;

  return (
    <Box sx={{ display: "flex" }}>
      <AppToast
        handleClose={handleToastClose}
        message={toast.message}
        type={toast.type}
        open={toast.open || false}
      />
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
