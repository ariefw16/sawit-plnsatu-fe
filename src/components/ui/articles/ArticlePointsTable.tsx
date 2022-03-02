import { Table, TableHead, TableRow, TableBody, Chip } from "@mui/material";
import { useAppSelector } from "../../../store";
import { StyledTableCellSecondary, StyledTableRow } from "../StyledTableCell";

export default function ArticlePointsTable() {
  const article = useAppSelector((state) => state.article.selectedArticle);

  return (
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCellSecondary>Name</StyledTableCellSecondary>
          <StyledTableCellSecondary align="right">NIK</StyledTableCellSecondary>
          <StyledTableCellSecondary align="right">
            Checked In
          </StyledTableCellSecondary>
          <StyledTableCellSecondary align="right">
            Quizzes
          </StyledTableCellSecondary>
          <StyledTableCellSecondary align="right">
            Points
          </StyledTableCellSecondary>
        </TableRow>
      </TableHead>
      <TableBody>
        {article.checkins &&
          article.checkins.map((dt) => (
            <StyledTableRow key={dt.user?.nik}>
              <StyledTableCellSecondary component="th" scope="row">
                {dt.user?.name || ""}
              </StyledTableCellSecondary>
              <StyledTableCellSecondary align="right">
                {dt.user?.nik || ""}
              </StyledTableCellSecondary>
              <StyledTableCellSecondary align="right">
                {dt.checkedIn ? (
                  <Chip
                    label="Checked In"
                    color="success"
                    variant="outlined"
                    size="small"
                  />
                ) : (
                  <Chip
                    size="small"
                    variant="filled"
                    color="error"
                    label="Not Checked yet"
                  />
                )}
              </StyledTableCellSecondary>
              <StyledTableCellSecondary align="right">
                <Chip
                  label="Undone"
                  color="error"
                  variant="filled"
                  size="small"
                />
              </StyledTableCellSecondary>
              <StyledTableCellSecondary align="right">
                {dt.points || ""}
              </StyledTableCellSecondary>
            </StyledTableRow>
          ))}
      </TableBody>
    </Table>
  );
}
