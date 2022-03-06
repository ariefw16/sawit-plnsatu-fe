import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApp } from "../../services/auth.service";
import { useAppDispatch } from "../../store";
import { showToast } from "../../store/toast.store";

function Login() {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    const { username, password } = loginData;
    setLoading(true);
    dispatch(loginApp({ username, password }))
      .unwrap()
      .then(() => {
        navigate("/", { replace: true });
      })
      .catch((e) => {
        dispatch(showToast({ type: "error", message: e.errorMessage }));
        setLoading(false);
      });
  };

  return (
    <>
      <Box sx={{ p: 3, my: 3 }}></Box>
      <Card sx={{ width: "100%", p: 4, mx: 2, pt: 5 }}>
        <Typography variant="h5" sx={{ pb: 1 }}>
          Sign In
        </Typography>
        <Typography variant="subtitle2" color={"gray"} sx={{ pb: 4 }}>
          Fill in the fields below to sign into your account.
        </Typography>
        <TextField
          variant="outlined"
          label="Username"
          fullWidth
          sx={{ my: 1 }}
          value={loginData.username}
          onChange={(e) => {
            setLoginData((x) => ({ ...x, username: e.target.value }));
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleLogin();
          }}
        />
        <TextField
          type="password"
          variant="outlined"
          label="Password"
          fullWidth
          sx={{ my: 1 }}
          value={loginData.password}
          onChange={(e) => {
            setLoginData((x) => ({ ...x, password: e.target.value }));
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleLogin();
          }}
        />
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          sx={{ py: 2, fontWeight: "bold", mt: 2 }}
          onClick={handleLogin}
          disabled={loading}
        >
          Sign In
          {loading && (
            <CircularProgress
              size={24}
              color="secondary"
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </Button>
      </Card>
    </>
  );
}

export default Login;
