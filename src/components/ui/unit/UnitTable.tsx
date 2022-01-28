import {
  Table,
  TableHead,
  TableRow,
  Checkbox,
  TableBody,
  TableCell,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import { UnitType as Unit } from "../../../types/Unit.type";
import { StyledTableCell } from "../StyledTableCell";
import { HeadCell } from "../../../types/CommonParams.type";
import { useState } from "react";

export default function UnitTable(props: { unit: Unit[]; rowCount: number }) {
  const { unit, rowCount } = props;
  const navigate = useNavigate();
  const [numSelected, setNumSelected] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
  const [singleSelected, setSingleSelected] = useState<{
    name: string;
    id: number;
  }>({ name: "", id: 0 });

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
          <TableRow key={0}>
            <TableCell colSpan={4} align="center">
              <Typography variant="caption" sx={{ fontStyle: "italic" }}>
                No Data to show
              </Typography>
            </TableCell>
          </TableRow>
        )}
        {unit.map((x) => (
          <TableRow key={x.id}>
            <TableCell sx={{ width: "5%" }} padding="checkbox">
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
