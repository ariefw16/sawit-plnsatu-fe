import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store";
import { hideToast } from "../../store/toast.store";
import AppToast from "../ui/AppToast";

function AuthLayout() {
  const toast = useAppSelector((state) => state.toast);
  const dispatch = useAppDispatch();
  const handleToastClose = () => {
    dispatch(hideToast());
  };
  return (
    <>
      <AppToast
        handleClose={handleToastClose}
        message={toast.message}
        type={toast.type}
        open={toast.open || false}
      />
      <Grid container sx={{ bgcolor: "whitesmoke", height: "100vh" }}>
        <Grid item md={3} sm={0}></Grid>
        <Grid item md={6} sm={12}>
          <Outlet />
        </Grid>
        <Grid item md={3} sm={0}></Grid>
      </Grid>
    </>
  );
}

export default AuthLayout;
