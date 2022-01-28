import {
  Box,
  Button,
  Grid,
  Paper,
  TablePagination,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import TitleBar from "../../components/ui/TitleBar";
import UnitCreateDialog from "../../components/ui/unit/CreateDialog";
import UnitSearchBox from "../../components/ui/unit/SearchBox";
import UnitTable from "../../components/ui/unit/UnitTable";
import { fetchUnit } from "../../services/unit.service";
import { useAppDispatch, useAppSelector } from "../../store";
import { showToast } from "../../store/toast.store";

export default function UnitPage() {
  const unit = useAppSelector((state) => state.unit.units);
  const totalRow = useAppSelector((state) => state.unit.totalRow);
  const dispatch = useAppDispatch();
  const [rowsPerPage, setRowPerpage] = useState(10);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchUnit({ limit: rowsPerPage }))
      .unwrap()
      .catch((e) => {
        dispatch(showToast({ message: e.errorMessage, type: "error" }));
      })
      .then(() => {
        setIsLoading(false);
      });
  }, [rowsPerPage]);

  const handleRowPerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowPerpage(parseInt(e.target.value));
  };

  return (
    <>
      <TitleBar
        title="Unit Management"
        subtitle="You can manage all unit available in this application"
        buttonCreateText="Create new Unit"
        createType="dialog"
        handleCreateDialog={() => {
          setShowCreateDialog(true);
        }}
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
                Showing {totalRow} data
              </Box>
              <Box sx={{ flexGrow: 1 }} />
              <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
                rowsPerPage={rowsPerPage}
                count={unit.length}
                page={0}
                component="div"
                onPageChange={() => {}}
                onRowsPerPageChange={handleRowPerPageChange}
              />
            </Box>
          </Grid>
          <Grid item sm={12}>
            <UnitTable unit={unit} rowCount={rowsPerPage} loading={isLoading} />
          </Grid>
          <Grid item sm={12} sx={{ px: 2 }}>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50, 100]}
              rowsPerPage={rowsPerPage}
              count={unit.length}
              page={0}
              component="div"
              onPageChange={() => {}}
              onRowsPerPageChange={handleRowPerPageChange}
            />
          </Grid>
        </Grid>
      </Paper>
      <UnitCreateDialog
        open={showCreateDialog}
        handleClose={() => {
          setShowCreateDialog(false);
        }}
      />
    </>
  );
}
