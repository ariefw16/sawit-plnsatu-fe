import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Drawer,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import TopicIcon from "@mui/icons-material/Topic";
import AdapterMoment from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { fetchUnit } from "../../../services/unit.service";
import { createSchedule } from "../../../services/schedule.service";
import { ScheduleCreateType } from "../../../types/Schedule.type";
import { showToast } from "../../../store/toast.store";

export default function CreateScheduleDrawer(props: {
  open: boolean;
  handleToggle: any;
}) {
  const { open, handleToggle } = props;
  const dispatch = useAppDispatch();
  const units = useAppSelector((state) =>
    state.unit.units.map((x) => ({ id: x.id, name: x.name }))
  );
  const [value, setValue] = useState<ScheduleCreateType>({
    schedule_date: null,
    name: "",
    unit: undefined,
    createdById: 4,
  });

  useEffect(() => {
    if (units.length < 1) dispatch(fetchUnit({ limit: 0 }));
  }, []);

  const createScheduleHandler = () => {
    dispatch(createSchedule(value))
      .unwrap()
      .then(() => {
        dispatch(
          showToast({ type: "success", message: "Schedule creation success!" })
        );
        handleToggle();
      })
      .catch((e) => {
        dispatch(showToast({ type: "error", message: e.errorMessage }));
      });
  };

  return (
    <Drawer
      anchor={"right"}
      open={open}
      onClose={handleToggle}
      sx={{
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: 600,
          borderBottomLeftRadius: 8,
          borderTopLeftRadius: 8,
        },
      }}
    >
      <Box sx={{ px: 4, py: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Create new Schedule
        </Typography>
      </Box>
      <Divider />
      <Grid container sx={{ px: 4, pt: 4 }} rowSpacing={2} columnSpacing={1}>
        <Grid item sm={12}>
          <TextField
            label="Theme / Topic"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <TopicIcon />
                </InputAdornment>
              ),
            }}
            onChange={(e) => {
              setValue((x) => ({ ...x, name: e.target.value }));
            }}
          />
        </Grid>
        <Grid item sm={8}>
          <Autocomplete
            options={units}
            getOptionLabel={(x) => x.name!}
            renderInput={(params) => (
              <TextField {...params} label="Unit" fullWidth />
            )}
            onChange={(ev, val) => {
              setValue((x) => ({
                ...x,
                unit: { id: val?.id!, name: val?.name! },
              }));
            }}
            isOptionEqualToValue={(opt, val) => opt.id === val.id}
          />
        </Grid>
        <Grid item sm={6}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label="Tanggal Sharing"
              value={value.schedule_date}
              onChange={(newValue) => {
                setValue((x) => ({ ...x, schedule_date: newValue }));
              }}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
      <Box
        sx={{
          m: 4,
          p: 2,
          bgcolor: "rgba(34, 51, 84, 0.02)",
          display: "flex",
          flexDirection: "row-reverse",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{ fontWeight: "bold", ml: 2 }}
          startIcon={<SaveIcon />}
          onClick={createScheduleHandler}
        >
          Save Schedule
        </Button>
        <Button
          startIcon={<CancelIcon />}
          color="warning"
          variant="outlined"
          sx={{ fontWeight: "bold" }}
          onClick={handleToggle}
        >
          Cancel
        </Button>
      </Box>
    </Drawer>
  );
}
