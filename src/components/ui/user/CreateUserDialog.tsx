import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  TextField,
  Autocomplete,
  DialogActions,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useEffect, useState } from "react";
import { createUnit } from "../../../services/unit.service";
import { createUser } from "../../../services/user.service";
import { useAppDispatch, useAppSelector } from "../../../store";
import { showToast } from "../../../store/toast.store";
import { UnitCreateType } from "../../../types/Unit.type";
import { UserCreateType } from "../../../types/User.type";

export default function CreateUserDialog(props: {
  open: boolean;
  handleClose: any;
}) {
  const { open, handleClose } = props;
  const [data, setData] = useState<UserCreateType>({
    name: "",
    nik: "",
    password: "",
    username: "",
    email: "",
    unit: undefined,
    role: "user",
  });
  const dispatch = useAppDispatch();
  const units = useAppSelector((state) =>
    state.unit.units.map((x) => ({ id: x.id, name: x.name }))
  );

  const handlerDataChange = (data: UserCreateType) => {
    setData((x) => ({ ...x, ...data }));
  };
  const handleSubmit = () => {
    dispatch(createUser(data))
      .unwrap()
      .then(() => {
        dispatch(
          showToast({ message: "User created success!", type: "success" })
        );
        handleClose();
      })
      .catch((e) => {
        dispatch(showToast({ message: e.errorMessage, type: "error" }));
      });
  };
  const resetData = () => {
    setData({
      name: "",
      nik: "",
      password: "",
      username: "",
      unit: undefined,
      role: "user",
    });
  };

  useEffect(() => {
    resetData();
  }, []);

  return (
    <Dialog open={open} fullWidth maxWidth="md">
      <DialogTitle>Create new User</DialogTitle>
      <DialogContent dividers>
        <Grid container rowSpacing={1} columnSpacing={1}>
          <Grid item sm={6}>
            <TextField
              fullWidth
              label="Employee Name"
              value={data.name}
              onChange={(e) => {
                handlerDataChange({ name: e.target.value });
              }}
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              fullWidth
              label="NIK"
              value={data.nik}
              onChange={(e) => {
                handlerDataChange({ nik: e.target.value });
              }}
            />
          </Grid>
          <Grid item sm={7}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={data.email}
              onChange={(e) => {
                handlerDataChange({ email: e.target.value });
              }}
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              fullWidth
              label="Username"
              value={data.username}
              onChange={(e) => {
                handlerDataChange({ username: e.target.value });
              }}
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              fullWidth
              label="Password"
              value={data.password}
              type="password"
              onChange={(e) => {
                handlerDataChange({ password: e.target.value });
              }}
            />
          </Grid>
          <Grid item sm={5}>
            <Autocomplete
              options={units}
              getOptionLabel={(x) => x.name!}
              renderInput={(params) => <TextField {...params} label="Unit" />}
              onChange={(ev, val) => {
                handlerDataChange({
                  unit: { id: val?.id!, name: val?.name! },
                });
              }}
              isOptionEqualToValue={(opt, val) => opt.id === val.id}
            />
          </Grid>
          <Grid item sm={4}>
            <FormControl fullWidth>
              <InputLabel id="user-role-label">User Role</InputLabel>
              <Select
                value={data.role}
                label="User Role"
                id="user-role-label"
                onChange={(e) => {
                  handlerDataChange({ role: e.target.value });
                }}
              >
                <MenuItem value="superuser">SuperUser</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="adminUnit">Admin Unit</MenuItem>
                <MenuItem value="user">User / Pegawai</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="warning" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
