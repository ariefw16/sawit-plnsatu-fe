import { Alert, Snackbar } from "@mui/material";

export default function AppToast(props: {
  message: string;
  type: "warning" | "info" | "success" | "error";
  open: boolean;
  handleClose: any;
}) {
  const { message, type, open, handleClose } = props;
  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert severity={type}>{message}</Alert>
    </Snackbar>
  );
}
