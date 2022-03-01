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
import { ScheduleUpdateType } from "../../../types/Schedule.type";
import moment from "moment";
import {
  deleteSchedule,
  updateSchedule,
} from "../../../services/schedule.service";
import { showToast } from "../../../store/toast.store";
import DeleteDialog from "../DeleteDialog";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import ArticleIcon from "@mui/icons-material/Article";

export default function DetailScheduleDrawer(props: {
  open: boolean;
  handleToggle: any;
}) {
  const navigate = useNavigate();
  const { open, handleToggle } = props;
  const units = useAppSelector((state) => state.unit.units);
  const schedule = useAppSelector((state) => state.schedule.selectedSchedule);
  const dispatch = useAppDispatch();
  const [data, setData] = useState<ScheduleUpdateType>({});
  const [isView, setIsView] = useState(true);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    if (units.length < 1) dispatch(fetchUnit({ limit: 0 }));
  }, []);

  const closeHandler = () => {
    setIsView(true);
    handleToggle();
  };
  const updateButtonHandler = () => {
    setData(Object.assign({}, schedule));
    setIsView(false);
  };
  const saveDataHandler = () => {
    dispatch(updateSchedule(data))
      .unwrap()
      .then(() => {
        dispatch(
          showToast({ type: "success", message: "Update Schedule success!" })
        );
        setIsView(true);
      })
      .catch((e) => {
        dispatch(showToast({ type: "error", message: e.errorMessage }));
      });
  };
  const deleteScheduleHandler = () => {
    dispatch(deleteSchedule({ id: schedule.id! }))
      .unwrap()
      .then(() => {
        dispatch(
          showToast({ type: "success", message: "Delete schedule success!" })
        );
        handleToggle();
        setShowDelete(false);
      })
      .catch((e) => {
        dispatch(showToast({ type: "error", message: e.errorMessage }));
      });
  };

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
        {schedule.article ? (
          <Button
            variant="contained"
            color="info"
            sx={{ fontWeight: "bold", ml: 2 }}
            startIcon={<ArticleIcon />}
            onClick={() => {
              navigate(`/article/${schedule.article?.id}`);
            }}
          >
            Go to Article
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            sx={{ fontWeight: "bold", ml: 2 }}
            startIcon={<SendIcon />}
            onClick={() => {
              navigate(
                `/article/create/${moment(schedule.schedule_date).format(
                  "YYYY-MM-DD"
                )}`
              );
            }}
          >
            Create Article
          </Button>
        )}
        <Button
          variant="contained"
          color="secondary"
          sx={{ fontWeight: "bold", ml: 2 }}
          startIcon={<EditIcon />}
          onClick={updateButtonHandler}
        >
          Update
        </Button>
        <Button
          startIcon={<DeleteForeverIcon />}
          color="error"
          variant="outlined"
          sx={{ fontWeight: "bold" }}
          onClick={() => {
            setShowDelete(true);
          }}
        >
          Delete
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
          onClick={saveDataHandler}
        >
          Save Schedule
        </Button>
        <Button
          startIcon={<CancelIcon />}
          color="warning"
          variant="outlined"
          sx={{ fontWeight: "bold" }}
          onClick={() => {
            setIsView(true);
          }}
        >
          Cancel
        </Button>
      </Box>
    );
  };

  return (
    <>
      <Drawer
        anchor={"right"}
        open={open}
        onClose={closeHandler}
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
            {isView ? (
              <TextField
                label="Theme / Topic"
                fullWidth
                value={schedule.name}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <TopicIcon />
                    </InputAdornment>
                  ),
                }}
                inputProps={{ readOnly: true }}
                variant="filled"
              />
            ) : (
              <TextField
                label="Theme / Topic"
                fullWidth
                value={data.name}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <TopicIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => {
                  setData((x) => ({ ...x, name: e.target.value }));
                }}
              />
            )}
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
                onChange={(ev, val) => {
                  setData((x) => ({ ...x, unit: val || undefined }));
                }}
                isOptionEqualToValue={(opt, val) => opt.id === val.id}
                value={{ id: data.unit?.id, name: data.unit?.name }}
                disableClearable
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
                  value={data.schedule_date}
                  onChange={(newValue) => {
                    setData((x) => ({
                      ...x,
                      schedule_date: newValue || new Date(),
                    }));
                  }}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            )}
          </Grid>
        </Grid>
        {isView ? <ViewButton /> : <UpdateButton />}
      </Drawer>
      <DeleteDialog
        data={{ id: schedule.id!, name: schedule.name! }}
        open={showDelete}
        handleClose={() => {
          setShowDelete(false);
        }}
        handleDelete={deleteScheduleHandler}
      />
    </>
  );
}
