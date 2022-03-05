import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  TextField,
  Autocomplete,
  DialogActions,
  Button,
} from "@mui/material";
import { useState } from "react";
import { useAppSelector } from "../../../store";
import { ArticleQuizCreateType } from "../../../types/Quiz.type";

export default function CreateQuizDialog(props: {
  open: boolean;
  handleClose: any;
}) {
  const { open, handleClose } = props;
  const article = useAppSelector((state) => state.article.selectedArticle);
  const [data, setData] = useState<ArticleQuizCreateType>({
    question: "",
    articleId: article.id,
    choices: [],
  });

  const dataChangeHandler = (quiz: ArticleQuizCreateType) => {
    setData((x) => ({ ...x, ...quiz }));
  };
  const submitHandler = () => {};

  return (
    <Dialog open={open} fullWidth maxWidth="sm" onClose={handleClose}>
      <DialogTitle>Create new Question</DialogTitle>
      <DialogContent dividers>
        <Grid container rowSpacing={1}>
          <Grid item sm={12}>
            <TextField
              fullWidth
              label="Question"
              value={data.question}
              onChange={(e) => {
                dataChangeHandler({ question: e.target.value });
              }}
            />
          </Grid>
          <Grid item sm={12}></Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="warning" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={submitHandler}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
