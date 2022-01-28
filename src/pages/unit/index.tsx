import {
  Box,
  Button,
  Grid,
  Paper,
  TablePagination,
  Typography,
} from "@mui/material";
import { useState } from "react";
import TitleBar from "../../components/ui/TitleBar";
import UnitSearchBox from "../../components/ui/unit/SearchBox";
import UnitTable from "../../components/ui/unit/UnitTable";
import { UnitType as Unit } from "../../types/Unit.type";

export default function UnitPage() {
  const unit: Unit[] = [
    { id: 1, name: "tes1" },
    { id: 2, name: "tes2" },
    { id: 3, name: "tes2" },
    { id: 4, name: "tes2" },
    { id: 5, name: "tes2" },
    { id: 6, name: "tes2" },
    { id: 7, name: "tes2" },
    { id: 8, name: "tes2" },
    { id: 9, name: "tes2" },
    { id: 10, name: "tes2" },
    { id: 11, name: "tes2" },
    { id: 12, name: "tes2" },
    { id: 13, name: "tes2" },
    { id: 14, name: "tes2" },
    { id: 15, name: "tes2" },
    { id: 16, name: "tes2" },
  ];
  const [rowsPerPage, setRowPerpage] = useState(10);

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
