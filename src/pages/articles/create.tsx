import { Grid, Paper, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormTitleBar from "../../components/ui/FormTitleBar";
import { ArticleType } from "../../types/Article.type";

export default function ArticleCreatePage() {
  const navigate = useNavigate();
  const [data, setData] = useState<ArticleType>();

  const backButtonHandler = () => {
    navigate(-1);
  };
  const createDataHandler = () => {};
  return (
    <>
      <FormTitleBar
        title="Create new Article"
        handlerBackButton={backButtonHandler}
        viewMode="create"
        breadcrumbs={[
          { label: "Articles Management", to: "article" },
          { label: "Create new Article" },
        ]}
        handlerCreateButton={createDataHandler}
      />
      <Paper sx={{ p: 2, mt: 4 }} variant="outlined">
        <Grid container>
          <Grid item sm={12}>
            <TextField
              fullWidth
              label="Body Article"
              multiline
              rows={4}
              maxRows={10}
            />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
