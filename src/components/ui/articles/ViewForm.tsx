import { Paper, Box, Divider, Grid, TextField, Tabs, Tab } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { Document, Page } from "react-pdf";
import { getFileArticle } from "../../../services/article.service";
import { useAppDispatch, useAppSelector } from "../../../store";
import { TabPanel } from "../TabPanel";
import ArticlePointsTable from "./ArticlePointsTable";
import QuizAccordion from "./QuizAccordion";

export default function ArticleViewForm() {
  const dispatch = useAppDispatch();
  const article = useAppSelector((state) => state.article.selectedArticle);
  const [tabValue, setTabValue] = useState("quiz");
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    if (article.id) dispatch(getFileArticle({ id: article.id }));
  }, [article]);

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
          <Box sx={{ p: 2, width: "60%", height: "600px" }}>
            <Document file={article.docs}>
              <Page pageNumber={pageNumber} />
            </Document>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box sx={{ flexGrow: 1, p: 2, height: "600px", width: "35%" }}>
            <Grid container rowSpacing={1}>
              <Grid item sm={12}>
                <TextField
                  label="Topic / Theme"
                  variant="filled"
                  fullWidth
                  value={article.name || ""}
                  inputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  label="Share Date"
                  variant="filled"
                  fullWidth
                  value={
                    moment(article.article_date).format("ddd, DD MMM YYYY") ||
                    ""
                  }
                  inputProps={{ readOnly: true }}
                />
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
          <Tab label="Quiz" value="quiz" />
          <Tab label="Points" value="points" />
          <Tab label="Recent Activity" value="activities" />
        </Tabs>
        <TabPanel selector={tabValue} id="quiz">
          <QuizAccordion />
        </TabPanel>
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
