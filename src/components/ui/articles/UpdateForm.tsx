import { LocalizationProvider, DatePicker } from "@mui/lab";
import AdapterMoment from "@mui/lab/AdapterMoment";
import { Paper, Box, Divider, Grid, TextField, Tabs, Tab } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import { ArticleType } from "../../../types/Article.type";
import { TabPanel } from "../TabPanel";

export default function ArticleUpdateForm(props: {
  article: ArticleType;
  handleDataChange: any;
}) {
  const { article, handleDataChange } = props;
  const [tabValue, setTabValue] = useState("points");
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
            PDF Reader here ...
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
                      console.log(
                        moment(newValue!).format("YYYY-MM-DD").toString()
                      );
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
                  />
                </LocalizationProvider>
                {/* <TextField
                  label="Share Date"
                  variant="outlined"
                  fullWidth
                  value={
                    moment(article.article_date).format("ddd, DD MMM YYYY") ||
                    ""
                  }
                /> */}
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
                  label="Body"
                  variant="outlined"
                  fullWidth
                  multiline
                  minRows={4}
                  maxRows={10}
                  value={article.body || ""}
                  onChange={(e) => {
                    handleDataChange({ body: e.target.value });
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
          Points
        </TabPanel>
        <TabPanel selector={tabValue} id="activities">
          Recent Activities
        </TabPanel>
      </Paper>
    </>
  );
}
