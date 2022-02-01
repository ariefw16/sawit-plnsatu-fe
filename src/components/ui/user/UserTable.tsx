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
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import { UnitType as Unit } from "../../../types/Unit.type";
import { StyledTableCell } from "../StyledTableCell";
import { HeadCell } from "../../../types/CommonParams.type";
import { useState } from "react";
import { UserType } from "../../../types/User.type";

export default function UserTable(props: {
  user: UserType[];
  rowCount: number;
  loading: boolean;
  handleDeleteButton: any;
}) {
  const { user, rowCount, loading, handleDeleteButton } = props;
  const navigate = useNavigate();
  const [numSelected, setNumSelected] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);

  const onSelectAllClick = () => {
    const ids = user.map((x) => (x.id !== undefined ? x.id : 0));
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
      {loading ? (
        <TableBody>
          <TableRow>
            <TableCell colSpan={6} align="center">
              <CircularProgress />
            </TableCell>
          </TableRow>
        </TableBody>
      ) : (
        <TableBody>
          {user.length < 1 && (
            <TableRow key={0}>
              <TableCell colSpan={6} align="center">
                <Typography variant="caption" sx={{ fontStyle: "italic" }}>
                  No Data to show
                </Typography>
              </TableCell>
            </TableRow>
          )}
          {user.map((x) => (
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
              <TableCell sx={{ width: "25%" }} padding="checkbox">
                {x.name}
              </TableCell>
              <TableCell sx={{ width: "15%" }} padding="checkbox">
                {x.nik}
              </TableCell>
              <TableCell sx={{ width: "20%" }} padding="checkbox">
                {x.username}
              </TableCell>
              <TableCell sx={{ width: "20%" }} padding="checkbox">
                {x.unit?.name}
              </TableCell>
              <TableCell sx={{ width: "15%" }} padding="checkbox">
                <Tooltip title="Quick View">
                  <IconButton
                    color="primary"
                    onClick={() => {
                      navigate(`/user/${x.id}`);
                    }}
                  >
                    <ManageSearchIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton
                    color="error"
                    onClick={() => {
                      handleDeleteButton({ id: x.id, name: x.name });
                    }}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      )}
    </Table>
  );
}

const headCells: readonly HeadCell<UserType>[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "nik",
    numeric: false,
    disablePadding: true,
    label: "NIK",
  },
  {
    id: "username",
    numeric: false,
    disablePadding: true,
    label: "Username",
  },
  {
    id: "unit",
    numeric: false,
    disablePadding: true,
    label: "Unit",
  },
];
