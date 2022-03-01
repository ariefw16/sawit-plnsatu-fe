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
import { useEffect, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterMoment from "@mui/lab/AdapterMoment";
import { useAppDispatch } from "../../../store";
import { fetchCheckinAvailable } from "../../../services/checkin.service";
import moment from "moment";

export default function CheckinSearchBox(props: { rowsPerPage: number }) {
  const { rowsPerPage } = props;
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<Date | null | undefined>(new Date());
  const [status, setStatus] = useState<"all" | "read" | "unread">("all");

  useEffect(() => {
    if (value)
      dispatch(
        fetchCheckinAvailable({
          month: moment(value).format("MM"),
          year: moment(value).format("YYYY"),
          limit: rowsPerPage,
          status,
        })
      );
  }, [value, status]);

  const handlerChange = (e: SelectChangeEvent) => {
    setStatus(e.target.value as "read" | "all" | "unread");
  };

  return (
    <Paper sx={{ width: 1, p: 2, my: 1 }} variant="outlined">
      <Grid container rowSpacing={2} columnSpacing={{ sm: 2 }}>
        <Grid item sm={5}>
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
              <MenuItem value={"read"}>All Read</MenuItem>
              <MenuItem value={"unread"}>All Unread</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item sm={3}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              views={["year", "month"]}
              label="Year and Month"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} helperText={null} />
              )}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
    </Paper>
  );
}
