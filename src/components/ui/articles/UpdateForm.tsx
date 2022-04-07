import { LocalizationProvider, DatePicker } from "@mui/lab";
import AdapterMoment from "@mui/lab/AdapterMoment";
import {
  Paper,
  Box,
  Divider,
  Grid,
  TextField,
  Tabs,
  Tab,
  Button,
  Typography,
} from "@mui/material";
import moment from "moment";
import { ChangeEvent, useEffect, useState } from "react";
import { ArticleType } from "../../../types/Article.type";
import { TabPanel } from "../TabPanel";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useAppDispatch, useAppSelector } from "../../../store";
import { fetchAvailableScheduleDate } from "../../../services/schedule.service";
import { showToast } from "../../../store/toast.store";
import ArticlePointsTable from "./ArticlePointsTable";
import { Document, Page, pdfjs } from "react-pdf";
import { ArrowForward, ArrowBack } from "@mui/icons-material";
import PDFViewer from "./PDFViewer";

export default function ArticleUpdateForm(props: {
  article: ArticleType;
  handleDataChange: any;
}) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  const { article, handleDataChange } = props;
  const dispatch = useAppDispatch();
  const availableSchedule = useAppSelector(
    (state) => state.schedule.availableSchedule
  );
  const [tabValue, setTabValue] = useState("points");
  const [numPages, setNumPages] = useState<number | null>(0);
  const [pageNumber, setPageNumber] = useState(1);

  // useEffect(() => {
  //   dispatch(
  //     fetchAvailableScheduleDate({
  //       month: new Date().getMonth() + 1,
  //       year: new Date().getFullYear(),
  //       scheduleId: article.schedule?.id!,
  //     })
  //   )
  //     .unwrap()
  //     .catch((e) => {
  //       dispatch(showToast({ type: "error", message: e.errorMessage }));
  //     });
  // }, []);
  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset: number) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  const getDisableDate = (date: Date) => {
    if (availableSchedule.length < 1) return false;
    const availableDate = availableSchedule.map((x) =>
      moment(x.schedule_date).format("DD-MM-YYYY")
    );
    return !availableDate.includes(moment(date).format("DD-MM-YYYY"));
  };

  return (
    <>
      <Paper variant="outlined" sx={{ mt: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <Box sx={{ p: 2, width: "60%" }}>
            <PDFViewer docs={article.docs} />
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box sx={{ flexGrow: 1, p: 2, height: "600px", width: "35%" }}>
            <Grid container rowSpacing={1}>
              <Grid item sm={12}>
                <TextField
                  label="Topic / Theme"
                  variant="outlined"
                  fullWidth
                  value={article.name || ""}
                  onChange={(e) => {
                    handleDataChange({ name: e.target.value });
                  }}
                />
              </Grid>
              <Grid item sm={12}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    label="Tanggal Sharing"
                    value={article?.article_date}
                    onChange={(newValue) => {
                      handleDataChange({
                        article_date: moment(newValue!)
                          .format("YYYY-MM-DD")
                          .toString(),
                      });
                    }}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                    inputFormat="DD/MM/YYYY"
                    shouldDisableDate={getDisableDate}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item sm={12}>
                <TextField
                  label="Unit Creator"
                  variant="filled"
                  fullWidth
                  value={article.schedule?.unit?.name || ""}
                  inputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  label="Creator"
                  variant="filled"
                  fullWidth
                  value="-"
                  inputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  fullWidth
                  type={"file"}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    handleDataChange({ docs: e.target.files![0] });
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
      <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
        <Tabs
          value={tabValue}
          onChange={(e, vals: string) => {
            setTabValue(vals);
          }}
        >
          <Tab label="Points" value="points" />
          <Tab label="Recent Activity" value="activities" />
        </Tabs>
        <TabPanel selector={tabValue} id="points">
          <ArticlePointsTable />
        </TabPanel>
        <TabPanel selector={tabValue} id="activities">
          Recent Activities
        </TabPanel>
      </Paper>
    </>
  );
}
