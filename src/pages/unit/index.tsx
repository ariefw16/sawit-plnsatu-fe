import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Paper,
  Table,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import TitleBar from "../../components/ui/TitleBar";
import SearchIcon from "@mui/icons-material/Search";

export default function UnitPage() {
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
      <Paper sx={{ width: 1, p: 2 }} variant="outlined">
        <Grid container rowSpacing={2} columnSpacing={{ sm: 2 }}>
          <Grid item sm={12}>
            <TextField
              fullWidth
              placeholder="Search By Name"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item sm={5}>
            <TextField
              fullWidth
              placeholder="Search By Parent"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item sm={5}>
            <TextField
              fullWidth
              placeholder="Search By STI Unit"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Paper>
      <Table>
        <TableHead>
          <TableRow></TableRow>
        </TableHead>
      </Table>
    </>
  );
}
