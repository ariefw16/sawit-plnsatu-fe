import { Paper, Grid, Box, Typography, TablePagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import ArticleTable from "../../components/ui/articles/ArticleTable";
import ArticleSearchBox from "../../components/ui/articles/SearchBox";
import DeleteDialog from "../../components/ui/DeleteDialog";
import TitleBar from "../../components/ui/TitleBar";
import { deleteArticle, fetchArticles } from "../../services/article.service";
import { useAppDispatch, useAppSelector } from "../../store";
import { showToast } from "../../store/toast.store";

export default function ArticlesPage() {
  const dispatch = useAppDispatch();
  const articles = useAppSelector((state) => state.article.articles);
  const totalRow = useAppSelector((state) => state.article.totalRow!);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [singleDelete, setSingleDelete] = useState<{
    id: number;
    name: string;
  }>({ id: 0, name: "" });

  useEffect(() => {
    setLoading(true);
    dispatch(fetchArticles({ limit: 0 }))
      .unwrap()
      .catch((e) => {
        dispatch(showToast({ type: "error", message: e.errorMessage }));
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleRowPerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(e.target.value));
  };
  const closeDeleteHandler = () => {
    setDeleteDialog(false);
  };
  const deleteDataHandler = () => {
    dispatch(deleteArticle({ id: singleDelete.id }))
      .unwrap()
      .then(() => {
        dispatch(
          showToast({ type: "success", message: "Article deletion success!" })
        );
        closeDeleteHandler();
      })
      .catch((e) => {
        dispatch(showToast({ type: "error", message: e.errorMessage }));
      });
  };
  const deleteItemHandler = (props: { id: number; name: string }) => {
    setSingleDelete(props);
    setDeleteDialog(true);
  };

  return (
    <>
      <TitleBar
        title="Articles Management"
        subtitle="Manage All Article to sharing with all user"
        createType="redirect"
        redirectCreate="/article/create"
        buttonCreateText="Create New Article"
      />
      <ArticleSearchBox />
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
                <Typography variant="caption" sx={{ fontSize: 14 }}>
                  Showing {totalRow} data
                </Typography>
              </Box>
              <Box sx={{ flexGrow: 1 }} />
              <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
                rowsPerPage={rowsPerPage}
                count={articles.length}
                page={0}
                component="div"
                onPageChange={() => {}}
                onRowsPerPageChange={handleRowPerPageChange}
              />
            </Box>
          </Grid>
          <Grid item sm={12}>
            <ArticleTable
              articles={articles}
              loading={loading}
              rowCount={totalRow}
              handleDeleteButton={deleteItemHandler}
            />
          </Grid>
          <Grid item sm={12} sx={{ px: 2 }}>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50, 100]}
              rowsPerPage={rowsPerPage}
              count={articles.length}
              page={0}
              component="div"
              onPageChange={() => {}}
              onRowsPerPageChange={handleRowPerPageChange}
            />
          </Grid>
        </Grid>
      </Paper>
      <DeleteDialog
        handleClose={closeDeleteHandler}
        open={deleteDialog}
        data={singleDelete}
        handleDelete={deleteDataHandler}
      />
    </>
  );
}
