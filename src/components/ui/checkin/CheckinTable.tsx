import {
  Table,
  TableHead,
  TableRow,
  Checkbox,
  TableBody,
  TableCell,
  CircularProgress,
  Typography,
  Tooltip,
  IconButton,
  Chip,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArticleType } from "../../../types/Article.type";
import { HeadCell } from "../../../types/CommonParams.type";
import { StyledTableCell } from "../StyledTableCell";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import moment from "moment";

export default function CheckinTable(props: {
  article: ArticleType[];
  rowCount: number;
  loading?: boolean;
}) {
  const { article, rowCount, loading } = props;
  const navigate = useNavigate();
  const [numSelected, setNumSelected] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);

  const onSelectAllClick = () => {
    const ids = article.map((x) => (x.id !== undefined ? x.id : 0));
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
            <TableCell colSpan={4} align="center">
              <CircularProgress />
            </TableCell>
          </TableRow>
        </TableBody>
      ) : (
        <TableBody>
          {article.length < 1 && (
            <TableRow key={0}>
              <TableCell colSpan={4} align="center">
                <Typography variant="caption" sx={{ fontStyle: "italic" }}>
                  No Data to show
                </Typography>
              </TableCell>
            </TableRow>
          )}
          {article.map((x) => (
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
                {x.name || "-"}
              </TableCell>
              <TableCell sx={{ width: "25%" }} padding="checkbox">
                {moment(x.article_date).format("ddd, DD / MMM / YYYY")}
              </TableCell>
              <TableCell sx={{ width: "15%" }} padding="checkbox">
                {x.checkedIn ? (
                  <Chip label="Checked In" color="primary" variant="outlined" />
                ) : (
                  <Chip label="Not checked yet" color="error" size="small" />
                )}
              </TableCell>
              <TableCell sx={{ width: "15%" }} padding="checkbox">
                <Tooltip title="Read Article">
                  <IconButton
                    color="primary"
                    onClick={() => {
                      navigate(`/available-article/checkin/${x.id}`);
                    }}
                  >
                    <ManageSearchIcon />
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

const headCells: readonly HeadCell<ArticleType>[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Article",
  },
  {
    id: "article_date",
    numeric: false,
    disablePadding: true,
    label: "Article Date",
  },
  {
    id: "checkedIn",
    numeric: false,
    disablePadding: true,
    label: "Checked In ?",
  },
];
