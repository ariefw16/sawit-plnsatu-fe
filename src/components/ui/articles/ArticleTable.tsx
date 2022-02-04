import { Table, TableHead, TableRow, Checkbox } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import user from "../../../pages/user";
import { ArticleType } from "../../../types/Article.type";
import { HeadCell } from "../../../types/CommonParams.type";
import { StyledTableCell } from "../StyledTableCell";

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
