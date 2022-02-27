import { Paper, Grid, Box, Typography, TablePagination } from "@mui/material";
import { useEffect, useState } from "react";
import CheckinTable from "../../components/ui/checkin/CheckinTable";
import CheckinListHeader from "../../components/ui/checkin/ListHeader";
import CheckinSearchBox from "../../components/ui/checkin/SearchBox";
import TitleBar from "../../components/ui/TitleBar";
import { useAppDispatch, useAppSelector } from "../../store";

export default function CheckinAvailablePage() {
  const dispatch = useAppDispatch();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const totalRow = useAppSelector((state) => state.article.totalRowCheckin);
  const article = useAppSelector((state) => state.article.checkinArticles);

  useEffect(() => {}, []);

  const handleRowPerPageChange = () => {};
  return (
    <>
      <TitleBar
        title="Checkin Article"
        subtitle="List All available Article to Checkin"
        createType="no"
      />
      <CheckinListHeader />
      <CheckinSearchBox />
      <Paper sx={{ py: 2, my: 3 }} variant="outlined">
        <Grid container rowSpacing={2}>
          <Grid item sm={12} sx={{ px: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography variant="caption" sx={{ fontSize: 14 }}>
                  Showing {totalRow} data
                </Typography>
              </Box>
              <Box sx={{ flexGrow: 1 }} />
              <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
                rowsPerPage={rowsPerPage}
                count={article.length}
                page={0}
                component="div"
                onPageChange={() => {}}
                onRowsPerPageChange={handleRowPerPageChange}
              />
            </Box>
          </Grid>
          <Grid item sm={12}>
            <CheckinTable />
          </Grid>
          <Grid item sm={12} sx={{ px: 2 }}>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50, 100]}
              rowsPerPage={rowsPerPage}
              count={article.length}
              page={0}
              component="div"
              onPageChange={() => {}}
              onRowsPerPageChange={handleRowPerPageChange}
            />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
