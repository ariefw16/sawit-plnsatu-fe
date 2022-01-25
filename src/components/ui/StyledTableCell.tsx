import styled from "@emotion/styled";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "whitesmoke",
    color: "grey",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
