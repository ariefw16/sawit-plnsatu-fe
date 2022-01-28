import { Paper, Grid, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function UnitSearchBox() {
  return (
    <Paper sx={{ width: 1, p: 2, my: 3 }} variant="outlined">
      <Grid container rowSpacing={2} columnSpacing={{ sm: 2 }}>
        <Grid item sm={6}>
          <TextField
            fullWidth
            placeholder="Search By Name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item sm={4}>
          <TextField
            fullWidth
            placeholder="Search By Parent"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
