import { Box, Divider, Grid, Paper, Tab, Tabs, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DeleteDialog from "../../components/ui/DeleteDialog";
import FormTitleBar from "../../components/ui/FormTitleBar";
import { TabPanel } from "../../components/ui/TabPanel";
import {
  deleteArticle,
  fetchSingleArticle,
} from "../../services/article.service";
import { useAppDispatch, useAppSelector } from "../../store";
import { setSelectedArticle } from "../../store/article.store";
import { showToast } from "../../store/toast.store";

export default function ArticleDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const article = useAppSelector((state) => state.article.selectedArticle);
  const articles = useAppSelector((state) => state.article.articles);
  const [isView, setIsView] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [tabValue, setTabValue] = useState("points");

  useEffect(() => {
    if (articles.length < 1)
      dispatch(fetchSingleArticle({ id: parseInt(id!) }));
    else dispatch(setSelectedArticle({ id: parseInt(id!) }));
  }, [id]);

  const backButtonHandler = () => {
    navigate(-1);
  };
  const deleteButtonHandler = () => {
    setDeleteDialog(true);
  };
  const closeDeleteHandler = () => {
    setDeleteDialog(false);
  };
  const deleteDataHandler = () => {
    dispatch(deleteArticle({ id: parseInt(id!) }))
      .unwrap()
      .then(() => {
        dispatch(
          showToast({ type: "success", message: "Deletion Article Success!" })
        );
        navigate("/article");
      })
      .catch((e) => {
        dispatch(showToast({ type: "error", message: e.errorMessage }));
      });
  };
  const updateButtonHandler = () => {
    setIsView(false);
  };
  const cancelButtonHandler = () => {
    setIsView(true);
  };
  const submitEditHandler = () => {
    setIsView(true);
  };

  return (
    <>
      <FormTitleBar
        title="Article Detail"
        viewMode="detail"
        handlerBackButton={backButtonHandler}
        breadcrumbs={[
          { label: "Article management", to: "/article" },
          { label: "Detail Article" },
        ]}
        isView={isView}
        handlerDeleteButton={deleteButtonHandler}
        handlerUpdateButton={updateButtonHandler}
        handlerCancelEditButton={cancelButtonHandler}
        handlerSubmitEdit={submitEditHandler}
      />
      <Paper variant="outlined" sx={{ mt: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <Box sx={{ p: 2, width: "60%", height: "600px" }}>
            PDF Reader here ...
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box sx={{ flexGrow: 1, p: 2, height: "600px", width: "35%" }}>
            <Grid container rowSpacing={1}>
              <Grid item sm={12}>
                <TextField label="Topic / Theme" variant="filled" fullWidth />
              </Grid>
              <Grid item sm={12}>
                <TextField label="Share Date" variant="filled" fullWidth />
              </Grid>
              <Grid item sm={12}>
                <TextField label="Unit Creator" variant="filled" fullWidth />
              </Grid>
              <Grid item sm={12}>
                <TextField label="Creator" variant="filled" fullWidth />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  label="Body"
                  variant="filled"
                  fullWidth
                  multiline
                  minRows={4}
                  maxRows={10}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
      <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
        <Tabs
          value={tabValue}
          onChange={(e, vals: string) => {
            setTabValue(vals);
          }}
        >
          <Tab label="Points" value="points" />
          <Tab label="Recent Activity" value="activities" />
        </Tabs>
        <TabPanel selector={tabValue} id="points">
          Points
        </TabPanel>
        <TabPanel selector={tabValue} id="activities">
          Recent Activities
        </TabPanel>
      </Paper>
      <DeleteDialog
        open={deleteDialog}
        data={{ id: article.id!, name: article.name! }}
        handleClose={closeDeleteHandler}
        handleDelete={deleteDataHandler}
      />
    </>
  );
}
