import { LocalizationProvider, DatePicker } from "@mui/lab";
import AdapterMoment from "@mui/lab/AdapterMoment";
import { Grid, Paper, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormTitleBar from "../../components/ui/FormTitleBar";
import { fetchScheduleByDate } from "../../services/schedule.service";
import { useAppDispatch, useAppSelector } from "../../store";
import { resetSelectedSchedule } from "../../store/schedule.store";
import { ArticleCreateType, ArticleType } from "../../types/Article.type";
import moment from "moment";
import { ScheduleType } from "../../types/Schedule.type";
import { showToast } from "../../store/toast.store";
import { createArticle } from "../../services/article.service";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function ArticleCreatePage() {
  const { date } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const selectedSchedule = useAppSelector(
    (state) => state.schedule.selectedSchedule
  );
  const [data, setData] = useState<ArticleCreateType>({
    article_date: moment(date).toDate(),
  });

  useEffect(() => {
    if (!date) dispatch(resetSelectedSchedule());
    else
      setData((x) => ({
        ...x,
        name: selectedSchedule.name,
        scheduleId: selectedSchedule.id,
      }));
  }, []);

  const backButtonHandler = () => {
    navigate(-1);
  };
  const createDataHandler = () => {
    dispatch(createArticle(data))
      .unwrap()
      .then((e) => {
        dispatch(
          showToast({ type: "success", message: "Article creation success!" })
        );
        navigate(`/article/${e.id}`);
      })
      .catch((e) => {
        dispatch(showToast({ type: "error", message: e.errorMessage }));
      });
  };
  const changeDateHandler = (vals?: Date) => {
    dispatch(fetchScheduleByDate({ schedule_date: vals! })).then((e) => {
      const id = (e.payload as ScheduleType).id!;
      setData((x) => ({
        ...x,
        article_date: vals,
        name: (e.payload as ScheduleType).name || "",
        scheduleId: id,
      }));
    });
  };
  return (
    <>
      <FormTitleBar
        title="Create new Article"
        handlerBackButton={backButtonHandler}
        viewMode="create"
        breadcrumbs={[
          { label: "Articles Management", to: "/article" },
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
            <Grid container columnSpacing={1} rowSpacing={1}>
              <Grid item sm={12}>
                <TextField
                  fullWidth
                  label="Article Title"
                  value={data.name || ""}
                  onChange={(e) => {
                    setData((x) => ({ ...x, name: e.target.value }));
                  }}
                />
              </Grid>
              <Grid item sm={12}>
                <ReactQuill
                  value={data.body || ""}
                  onChange={(e) => {
                    setData((x) => ({ ...x, body: e }));
                  }}
                />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  fullWidth
                  type={"file"}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setData((x) => ({ ...x, docs: e.target.files![0] }));
                  }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
