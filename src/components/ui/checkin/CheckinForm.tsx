import { TabPanel } from "@mui/lab";
import { Paper, Box, Divider, Grid, TextField, Tabs, Tab } from "@mui/material";
import moment from "moment";
import { ArticleType } from "../../../types/Article.type";

export default function CheckinForm(props: { article: ArticleType }) {
  const { article } = props;
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
            <div
              style={{ display: "block", width: "600px" }}
              dangerouslySetInnerHTML={{ __html: article.body! }}
            ></div>
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
    </>
  );
}
