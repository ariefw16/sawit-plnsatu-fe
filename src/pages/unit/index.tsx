import {
  Box,
  Button,
  Grid,
  Paper,
  TablePagination,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import TitleBar from "../../components/ui/TitleBar";
import UnitSearchBox from "../../components/ui/unit/SearchBox";
import UnitTable from "../../components/ui/unit/UnitTable";
import { fetchUnit } from "../../services/unit.service";
import { useAppDispatch, useAppSelector } from "../../store";
import { showToast } from "../../store/toast.store";

export default function UnitPage() {
  const unit = useAppSelector((state) => state.unit.units);
  const dispatch = useAppDispatch();
  const [rowsPerPage, setRowPerpage] = useState(10);

  useEffect(() => {
    dispatch(fetchUnit({ limit: rowsPerPage }))
      .unwrap()
      .catch((e) => {
        dispatch(showToast({ message: e.errorMessage, type: "error" }));
      });
  }, [rowsPerPage]);

  return (
    <>
      <TitleBar
        title="Unit Management"
        subtitle="You can manage all unit available in this application"
        buttonCreateText="Create new Unit"
      >
        <Button variant="outlined" sx={{ mx: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Export
          </Typography>
        </Button>
      </TitleBar>
      <UnitSearchBox />
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
                Showing x data
              </Box>
              <Box sx={{ flexGrow: 1 }} />
              <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
                rowsPerPage={rowsPerPage}
                count={unit.length}
                page={0}
                component="div"
                onPageChange={() => {}}
              />
            </Box>
          </Grid>
          <Grid item sm={12}>
            <UnitTable unit={unit} rowCount={rowsPerPage} />
          </Grid>
          <Grid item sm={12} sx={{ px: 2 }}>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50, 100]}
              rowsPerPage={rowsPerPage}
              count={unit.length}
              page={0}
              component="div"
              onPageChange={() => {}}
            />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
