import { LocalizationProvider, DatePicker } from "@mui/lab";
import AdapterMoment from "@mui/lab/AdapterMoment";
import { Grid, Paper, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormTitleBar from "../../components/ui/FormTitleBar";
import { fetchScheduleByDate } from "../../services/schedule.service";
import { useAppDispatch, useAppSelector } from "../../store";
import { resetSelectedSchedule } from "../../store/schedule.store";
import { ArticleType } from "../../types/Article.type";

export default function ArticleCreatePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const selectedSchedule = useAppSelector(
    (state) => state.schedule.selectedSchedule
  );
  const [data, setData] = useState<ArticleType>();

  useEffect(() => {
    dispatch(resetSelectedSchedule());
  }, []);

  const backButtonHandler = () => {
    navigate(-1);
  };
  const createDataHandler = () => {};
  const changeDateHandler = (vals?: Date) => {
    setData((x) => ({ ...x, article_date: vals }));
    dispatch(fetchScheduleByDate({ schedule_date: vals! }));
  };
  return (
    <>
      <FormTitleBar
        title="Create new Article"
        handlerBackButton={backButtonHandler}
        viewMode="create"
        breadcrumbs={[
          { label: "Articles Management", to: "article" },
          { label: "Create new Article" },
        ]}
        handlerCreateButton={createDataHandler}
      />
      <Grid container columnSpacing={2}>
        <Grid item md={4} sm={12}>
          <Paper sx={{ p: 3, mt: 4 }} variant="outlined">
            <Box>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label="Tanggal Sharing"
                  value={data?.article_date}
                  onChange={(newValue) => {
                    changeDateHandler(newValue!);
                  }}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Box>
            <Box sx={{ mt: 2 }}>
              <TextField
                variant="filled"
                inputProps={{ readOnly: true }}
                value={selectedSchedule.name || ""}
                fullWidth
                label="Theme / Topic"
                onChange={() => {}}
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <TextField
                variant="filled"
                inputProps={{ readOnly: true }}
                value={selectedSchedule.unit?.name || ""}
                fullWidth
                label="Unit Scheduled"
                onChange={() => {}}
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item md={8} sm={12}>
          <Paper sx={{ p: 3, mt: 4 }} variant="outlined">
            <Grid container>
              <Grid item sm={12}>
                <TextField
                  fullWidth
                  label="Body Article"
                  multiline
                  minRows={4}
                  maxRows={10}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
