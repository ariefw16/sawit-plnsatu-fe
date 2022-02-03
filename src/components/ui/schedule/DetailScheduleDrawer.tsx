import { LocalizationProvider, DatePicker } from "@mui/lab";
import AdapterMoment from "@mui/lab/AdapterMoment";
import {
  Drawer,
  Box,
  Typography,
  Divider,
  Grid,
  TextField,
  InputAdornment,
  Autocomplete,
  Button,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CancelIcon from "@mui/icons-material/Cancel";
import TopicIcon from "@mui/icons-material/Topic";
import EditIcon from "@mui/icons-material/Edit";
import { useAppDispatch, useAppSelector } from "../../../store";
import { useEffect, useState } from "react";
import { fetchUnit } from "../../../services/unit.service";
import { ScheduleType } from "../../../types/Schedule.type";
import moment from "moment";

export default function DetailScheduleDrawer(props: {
  open: boolean;
  handleToggle: any;
  id: number;
}) {
  const { open, handleToggle, id } = props;
  const units = useAppSelector((state) => state.unit.units);
  const schedule = useAppSelector((state) => state.schedule.selectedSchedule);
  const dispatch = useAppDispatch();
  const [data, setData] = useState<ScheduleType>({});
  const [isView, setIsView] = useState(true);

  useEffect(() => {
    if (units.length < 1) dispatch(fetchUnit({ limit: 0 }));
  }, []);

  const ViewButton = () => {
    return (
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
          color="secondary"
          sx={{ fontWeight: "bold", ml: 2 }}
          startIcon={<EditIcon />}
          onClick={() => {}}
        >
          Update Schedule
        </Button>
        <Button
          startIcon={<DeleteForeverIcon />}
          color="error"
          variant="outlined"
          sx={{ fontWeight: "bold" }}
          onClick={handleToggle}
        >
          Delete Schedule
        </Button>
      </Box>
    );
  };

  const UpdateButton = () => {
    return (
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
          onClick={() => {}}
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
    );
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
          Detail Schedule
        </Typography>
      </Box>
      <Divider />
      <Grid container sx={{ px: 4, pt: 4 }} rowSpacing={2} columnSpacing={1}>
        <Grid item sm={12}>
          <TextField
            label="Theme / Topic"
            fullWidth
            variant="filled"
            value={schedule.name}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <TopicIcon />
                </InputAdornment>
              ),
            }}
            onChange={(e) => {}}
          />
        </Grid>
        <Grid item sm={8}>
          {isView ? (
            <TextField
              label="Unit Scheduled"
              fullWidth
              variant="filled"
              value={schedule.unit?.name}
              inputProps={{ readOnly: true }}
            />
          ) : (
            <Autocomplete
              options={units}
              getOptionLabel={(x) => x.name!}
              renderInput={(params) => (
                <TextField {...params} label="Unit" fullWidth />
              )}
              onChange={(ev, val) => {}}
              isOptionEqualToValue={(opt, val) => opt.id === val.id}
            />
          )}
        </Grid>
        <Grid item sm={6}>
          {isView ? (
            <TextField
              label="Date Scheduled"
              fullWidth
              variant="filled"
              value={moment(schedule.schedule_date).format("D MMMM Y")}
              inputProps={{ readOnly: true }}
            />
          ) : (
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="Tanggal Sharing"
                value={"2022-02-02"}
                onChange={(newValue) => {}}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          )}
        </Grid>
      </Grid>
      {isView ? <ViewButton /> : <UpdateButton />}
    </Drawer>
  );
}
