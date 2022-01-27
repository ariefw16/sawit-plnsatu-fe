import {
  Button,
  Checkbox,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { StyledTableCell } from "../../components/ui/StyledTableCell";
import TitleBar from "../../components/ui/TitleBar";
import UnitSearchBox from "../../components/ui/unit/SearchBox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { HeadCell } from "../../types/CommonParams.type";
import { Unit } from "../../types/Unit.type";

export default function UnitPage() {
  const navigate = useNavigate();
  const [numSelected, setNumSelected] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
  const [singleSelected, setSingleSelected] = useState<{
    name: string;
    id: number;
  }>({ name: "", id: 0 });
  const rowCount = 2;
  const unit: Unit[] = [
    { id: 1, name: "tes1" },
    { id: 2, name: "tes2" },
  ];

  const onSelectAllClick = () => {
    const ids = unit.map((x) => (x.id !== undefined ? x.id : 0));
    if (selected.length === ids.length) {
      setSelected([]);
      setNumSelected(0);
    } else {
      setSelected(ids);
      setNumSelected(ids.length);
    }
  };
  const handleChangeCheckbox = (id: number) => {
    if (selected.includes(id)) {
      setSelected((s) => s.filter((x) => x !== id));
      setNumSelected((x) => x - 1);
    } else {
      setSelected([...selected, id]);
      setNumSelected((x) => x + 1);
    }
  };
  const isSelected = (id: number) => {
    if (selected.includes(id)) return true;
    return false;
  };

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
      <Paper sx={{ py: 4, my: 3 }} variant="outlined">
        <Grid container rowSpacing={2}>
          <Grid item sm={12} sx={{ px: 2 }}>
            Showing x data
          </Grid>
          <Grid item sm={12}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>
                    <Checkbox
                      color="primary"
                      indeterminate={numSelected > 0 && numSelected < rowCount}
                      checked={rowCount > 0 && numSelected === rowCount}
                      onChange={onSelectAllClick}
                      inputProps={{
                        "aria-label": "select all desserts",
                      }}
                    />
                  </StyledTableCell>
                  {headCells.map((x) => (
                    <StyledTableCell key={x.label}>{x.label} </StyledTableCell>
                  ))}
                  <StyledTableCell>Action </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {unit.length < 1 && (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      <Typography
                        variant="caption"
                        sx={{ fontStyle: "italic" }}
                      >
                        No Data to show
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
                {unit.map((x) => (
                  <TableRow key={x.id}>
                    <TableCell sx={{ width: "5%" }}>
                      <Checkbox
                        color="primary"
                        checked={isSelected(x.id!)}
                        onChange={() => handleChangeCheckbox(x.id!)}
                        inputProps={{
                          "aria-labelledby": x.name,
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ width: "40%" }} padding="checkbox">
                      {x.name}
                    </TableCell>
                    <TableCell sx={{ width: "40%" }} padding="checkbox">
                      {x.parent?.name || "-"}
                    </TableCell>
                    <TableCell sx={{ width: "15%" }} padding="checkbox">
                      <Tooltip title="Quick View">
                        <IconButton
                          color="primary"
                          onClick={() => {
                            navigate(`unit/${x.id}`);
                          }}
                        >
                          <ManageSearchIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton color="warning">
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          color="error"
                          onClick={() => {
                            setSingleSelected({
                              id: x?.id || 0,
                              name: x?.name || "",
                            });
                          }}
                        >
                          <DeleteForeverIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
          <Grid item sm={12}></Grid>
        </Grid>
      </Paper>
    </>
  );
}

const headCells: readonly HeadCell<Unit>[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "parent",
    numeric: false,
    disablePadding: true,
    label: "Parent",
  },
];
