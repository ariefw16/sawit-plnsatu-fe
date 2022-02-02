import { Autocomplete, Grid, Paper, TextField } from "@mui/material";
import { useEffect } from "react";
import { fetchUnit } from "../../../services/unit.service";
import { useAppDispatch, useAppSelector } from "../../../store";
import { UserType } from "../../../types/User.type";

export default function UserFormEdit(props: {
  user: UserType;
  handlerOnChange: any;
}) {
  const { user, handlerOnChange } = props;
  const dispatch = useAppDispatch();
  const unit = useAppSelector((state) => state.unit.units);

  useEffect(() => {
    if (unit.length < 1) dispatch(fetchUnit({ limit: 0 }));
  }, []);

  return (
    <Grid container>
      <Grid item sm={1} />
      <Grid item sm={10}>
        <Paper variant="outlined" sx={{ my: 4, p: 2 }}>
          <Grid container columnSpacing={1} rowSpacing={2}>
            <Grid item sm={6}>
              <TextField
                value={user.name || ""}
                label="Name"
                fullWidth
                onChange={(e) => {
                  handlerOnChange({ name: e.target.value });
                }}
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                value={user.nik || ""}
                label="NIK"
                fullWidth
                onChange={(e) => {
                  handlerOnChange({ nik: e.target.value });
                }}
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                value={user.email || ""}
                label="Email"
                fullWidth
                onChange={(e) => {
                  handlerOnChange({ email: e.target.value });
                }}
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                value={user.username || ""}
                label="Username"
                fullWidth
                onChange={(e) => {
                  handlerOnChange({ username: e.target.value });
                }}
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                value={user.password || ""}
                label="Password"
                type="password"
                fullWidth
                onChange={(e) => {
                  handlerOnChange({ password: e.target.value });
                }}
              />
            </Grid>
            <Grid item sm={12}>
              <Autocomplete
                options={unit}
                getOptionLabel={(x) => x.name!}
                renderInput={(params) => <TextField {...params} label="Unit" />}
                onChange={(ev, val) => {
                  handlerOnChange({
                    unit: { id: val?.id!, name: val?.name! },
                  });
                }}
                isOptionEqualToValue={(opt, val) => opt.id === val.id}
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                value={"Superadmin"}
                label="Role"
                fullWidth
                variant="filled"
                inputProps={{ readOnly: true }}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item sm={1} />
    </Grid>
  );
}
