import {
  Paper,
  Grid,
  TextField,
  InputAdornment,
  Autocomplete,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useAppDispatch, useAppSelector } from "../../../store";
import { useEffect } from "react";
import { fetchUnit } from "../../../services/unit.service";

export default function UserSearchBox(props: { handleSearch?: any }) {
  const { handleSearch } = props;
  const dispatch = useAppDispatch();
  const unit = useAppSelector((state) => state.unit.units);
  useEffect(() => {
    if (unit.length < 1) dispatch(fetchUnit({ limit: 0 }));
  }, []);

  return (
    <Paper sx={{ width: 1, p: 2, my: 3 }} variant="outlined">
      <Grid container rowSpacing={2} columnSpacing={{ sm: 2 }}>
        <Grid item sm={6}>
          <TextField
            onChange={(e) => {
              handleSearch({ q: e.target.value });
            }}
            fullWidth
            placeholder="Search By Name / Username / NIK"
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
            options={unit}
            getOptionLabel={(x) => x.name!}
            renderInput={(params) => <TextField {...params} label="Unit" />}
            onChange={(ev, val) => {
              handleSearch({
                unitId: val?.id!,
              });
            }}
            isOptionEqualToValue={(opt, val) => opt.id === val.id}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
