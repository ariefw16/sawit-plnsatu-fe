import {
  Paper,
  Grid,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

export default function CheckinSearchBox() {
  const [status, setStatus] = useState("all");
  const handlerChange = (e: SelectChangeEvent) => {
    setStatus(e.target.value);
  };
  return (
    <Paper sx={{ width: 1, p: 2, my: 1 }} variant="outlined">
      <Grid container rowSpacing={2} columnSpacing={{ sm: 2 }}>
        <Grid item sm={6}>
          <TextField
            fullWidth
            placeholder="Search By Title"
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
          <FormControl fullWidth>
            <InputLabel id="select-label">Search by Status</InputLabel>
            <Select
              labelId="select-label"
              id="simple-select"
              value={status}
              label="Search by Status"
              onChange={handlerChange}
            >
              <MenuItem value={"all"}>All</MenuItem>
              <MenuItem value={"checkin"}>All Read</MenuItem>
              <MenuItem value={"unread"}>All Unread</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  );
}
