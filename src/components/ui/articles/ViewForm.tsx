import {
  Paper,
  Box,
  Divider,
  Grid,
  TextField,
  Tabs,
  Tab,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Chip,
} from "@mui/material";
import moment from "moment";
import { useState } from "react";
import { useAppSelector } from "../../../store";
import { StyledTableCellSecondary, StyledTableRow } from "../StyledTableCell";
import { TabPanel } from "../TabPanel";

export default function ArticleViewForm() {
  const article = useAppSelector((state) => state.article.selectedArticle);
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
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCellSecondary>Name</StyledTableCellSecondary>
                <StyledTableCellSecondary align="right">
                  NIK
                </StyledTableCellSecondary>
                <StyledTableCellSecondary align="right">
                  Checked In
                </StyledTableCellSecondary>
                <StyledTableCellSecondary align="right">
                  Quizzes
                </StyledTableCellSecondary>
                <StyledTableCellSecondary align="right">
                  Points
                </StyledTableCellSecondary>
              </TableRow>
            </TableHead>
            <TableBody>
              {article.checkins &&
                article.checkins.map((dt) => (
                  <StyledTableRow key={dt.id}>
                    <StyledTableCellSecondary component="th" scope="row">
                      {dt.user?.name || ""}
                    </StyledTableCellSecondary>
                    <StyledTableCellSecondary align="right">
                      {dt.user?.nik || ""}
                    </StyledTableCellSecondary>
                    <StyledTableCellSecondary align="right">
                      <Chip
                        label="Checked In"
                        color="primary"
                        variant="outlined"
                        size="small"
                      />
                    </StyledTableCellSecondary>
                    <StyledTableCellSecondary align="right">
                      <Chip
                        label="Undone"
                        color="error"
                        variant="filled"
                        size="small"
                      />
                    </StyledTableCellSecondary>
                    <StyledTableCellSecondary align="right">
                      {dt.points || ""}
                    </StyledTableCellSecondary>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TabPanel>
        <TabPanel selector={tabValue} id="activities">
          Recent Activities
        </TabPanel>
      </Paper>
    </>
  );
}
