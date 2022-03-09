import { AddCircle, DeleteForever } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  TextField,
  DialogActions,
  Button,
  Box,
  Divider,
  List,
  ListItem,
  IconButton,
  Checkbox,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { saveQuestion } from "../../../services/quiz.service";
import { useAppDispatch, useAppSelector } from "../../../store";
import { showToast } from "../../../store/toast.store";
import { ArticleQuizCreateType } from "../../../types/Quiz.type";

export default function CreateQuizDialog(props: {
  open: boolean;
  handleClose: any;
}) {
  const { open, handleClose } = props;
  const dispatch = useAppDispatch();
  const article = useAppSelector((state) => state.article.selectedArticle);
  const [data, setData] = useState<ArticleQuizCreateType>({
    question: "",
    articleId: article.id,
    choices: [],
  });
  const [choice, setChoice] = useState("");

  useEffect(() => {
    setData({ question: "", articleId: article.id, choices: [] });
  }, [article]);

  const dataChangeHandler = (quiz: ArticleQuizCreateType) => {
    setData((x) => ({ ...x, ...quiz }));
  };
  const submitHandler = () => {
    const isCorrectChoosen = data.choices?.some((x) => x.isCorrect);
    if (isCorrectChoosen) {
      data.articleId = article.id;
      dispatch(saveQuestion(data))
        .unwrap()
        .then(() => {
          dispatch(showToast({ message: "Question added!", type: "success" }));
          handleClose();
        })
        .catch((e) => {
          dispatch(showToast({ type: "error", message: e.errorMessage }));
        });
    } else
      dispatch(
        showToast({
          message: "Please Choose 1 correct Answer!",
          type: "warning",
        })
      );
  };
  const addChoiceHandler = () => {
    setData((x) => {
      const { choices, ...rest } = x;
      choices?.push({ name: choice });
      return { ...rest, choices };
    });
    setChoice("");
  };
  const removeChoiceHandler = (idx: number) => {
    setData((x) => {
      const { choices, ...rest } = x;
      choices?.splice(idx, 1);
      return { ...rest, choices };
    });
  };
  const changeIsCorrectHandler = (idx: number) => {
    setData((x) => {
      const { choices, ...rest } = x;
      const newChoice = choices?.map((ch) => ({ ...ch, isCorrect: false }));
      newChoice![idx].isCorrect = true;
      return { ...rest, choices: newChoice };
    });
  };

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
          <Grid item sm={12}>
            <List>
              {data.choices?.map((x, i) => (
                <React.Fragment key={i}>
                  <ListItem
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="remove"
                        color="error"
                        onClick={() => {
                          removeChoiceHandler(i);
                        }}
                      >
                        <DeleteForever />
                      </IconButton>
                    }
                  >
                    <Checkbox
                      edge="start"
                      checked={x?.isCorrect || false}
                      tabIndex={-1}
                      disableRipple
                      onChange={() => {
                        changeIsCorrectHandler(i);
                      }}
                    />
                    {x.name}
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Grid>
          <Grid item sm={12}>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <TextField
                size="small"
                label="Add Choice here.."
                fullWidth
                value={choice}
                onChange={(e) => {
                  setChoice(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") addChoiceHandler();
                }}
              />
              <Button
                sx={{ ml: 3 }}
                variant="outlined"
                color="secondary"
                onClick={addChoiceHandler}
              >
                <AddCircle />
              </Button>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Box sx={{ px: 2 }}></Box>
        <Box sx={{ flexGrow: 1 }} />
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
