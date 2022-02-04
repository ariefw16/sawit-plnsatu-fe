import {
  Paper,
  Grid,
  TextField,
  InputAdornment,
  Autocomplete,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { LocalizationProvider, DatePicker } from "@mui/lab";
import AdapterMoment from "@mui/lab/AdapterMoment";
import { useAppDispatch, useAppSelector } from "../../../store";
import { useEffect } from "react";
import { fetchUnit } from "../../../services/unit.service";
import { fetchUser } from "../../../services/user.service";

export default function ArticleSearchBox() {
  const units = useAppSelector((state) => state.unit.units);
  const users = useAppSelector((state) => state.user.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (units.length < 1) dispatch(fetchUnit({ limit: 0 }));
    if (users.length < 1) dispatch(fetchUser({ limit: 0 }));
  }, []);

  return (
    <Paper sx={{ width: 1, p: 2, my: 3 }} variant="outlined">
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
          <Autocomplete
            options={units}
            getOptionLabel={(x) => x.name!}
            renderInput={(params) => (
              <TextField {...params} label="Search by Unit Creator" fullWidth />
            )}
            onChange={(ev, val) => {}}
            isOptionEqualToValue={(opt, val) => opt.id === val.id}
          />
        </Grid>
        <Grid item sm={3}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label="Search By Date"
              value={Date()}
              onChange={() => {}}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item sm={4}>
          <Autocomplete
            options={users}
            getOptionLabel={(x) => x.name!}
            renderInput={(params) => (
              <TextField {...params} label="Search by Creator" fullWidth />
            )}
            onChange={(ev, val) => {}}
            isOptionEqualToValue={(opt, val) => opt.id === val.id}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
