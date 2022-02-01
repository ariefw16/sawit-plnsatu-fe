import { Grid, Paper, TextField } from "@mui/material";
import { UserType } from "../../../types/User.type";

export default function UserFormView(props: { user: UserType }) {
  const { user } = props;
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
                variant="filled"
                inputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                value={user.nik || ""}
                label="NIK"
                fullWidth
                variant="filled"
                inputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                value={user.email || ""}
                label="Email"
                fullWidth
                variant="filled"
                inputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                value={user.username || ""}
                label="Username"
                fullWidth
                variant="filled"
                inputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                value={user.unit?.name || "-"}
                label="Unit"
                fullWidth
                variant="filled"
                inputProps={{ readOnly: true }}
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
