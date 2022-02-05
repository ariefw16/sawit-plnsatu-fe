import {
  Table,
  TableHead,
  TableRow,
  Checkbox,
  TableBody,
  IconButton,
  TableCell,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArticleType } from "../../../types/Article.type";
import { HeadCell } from "../../../types/CommonParams.type";
import { StyledTableCell } from "../StyledTableCell";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import moment from "moment";

export default function ArticleTable(props: {
  articles: ArticleType[];
  rowCount: number;
  loading: boolean;
  handleDeleteButton: any;
}) {
  const { articles, rowCount, loading, handleDeleteButton } = props;
  const navigate = useNavigate();
  const [numSelected, setNumSelected] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);

  const onSelectAllClick = () => {
    const ids = articles.map((x) => (x.id !== undefined ? x.id : 0));
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
        {articles.length < 1 && (
          <TableRow key={0}>
            <TableCell colSpan={6} align="center">
              <Typography variant="caption" sx={{ fontStyle: "italic" }}>
                No Data to show
              </Typography>
            </TableCell>
          </TableRow>
        )}
        {articles.map((x) => (
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
            <TableCell sx={{ width: "20%" }} padding="checkbox">
              {moment(x.article_date).format("ddd, DD MMM Y")}
            </TableCell>
            <TableCell sx={{ width: "20%" }} padding="checkbox">
              {x.schedule?.unit?.name}
            </TableCell>
            <TableCell sx={{ width: "15%" }} padding="checkbox">
              <Tooltip title="Quick View">
                <IconButton
                  color="primary"
                  onClick={() => {
                    navigate(`/article/${x.id}`);
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
    </Table>
  );
}

const headCells: readonly HeadCell<ArticleType>[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "article_date",
    numeric: false,
    disablePadding: true,
    label: "Expose Date",
  },
  {
    id: "schedule",
    numeric: false,
    disablePadding: true,
    label: "Unit",
  },
];
