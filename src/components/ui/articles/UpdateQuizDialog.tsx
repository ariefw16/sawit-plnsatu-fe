import { DeleteForever, AddCircle } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  TextField,
  List,
  ListItem,
  IconButton,
  Checkbox,
  Divider,
  Box,
  Button,
  DialogActions,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { updateQuestion } from "../../../services/quiz.service";
import { useAppDispatch } from "../../../store";
import { showToast } from "../../../store/toast.store";
import { ArticleQuizType } from "../../../types/Quiz.type";

export default function UpdateQuizDialog(props: {
  open: boolean;
  quiz: ArticleQuizType;
  handleClose: any;
}) {
  const { open, quiz, handleClose } = props;
  const dispatch = useAppDispatch();
  const [data, setData] = useState<ArticleQuizType>({});
  const [choice, setChoice] = useState("");

  useEffect(() => {
    setData(() => Object.assign({}, quiz));
  }, [quiz]);

  const dataChangeHandler = (params: ArticleQuizType) => {
    setData((x) => ({ ...x, ...params }));
  };
  const addChoiceHandler = () => {
    setData((x) => {
      const { choices, ...rest } = x;
      const newChoices = Object.assign([], choices);
      newChoices?.push({ name: choice });
      return { ...rest, choices: newChoices };
    });
    setChoice("");
  };
  const removeChoiceHandler = (idx: number) => {
    setData((x) => {
      const { choices, ...rest } = x;
      const newChoices = Object.assign([], choices);
      newChoices?.splice(idx, 1);
      return { ...rest, choices: newChoices };
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
  const submitHandler = () => {
    console.log(data);
    dispatch(updateQuestion(data))
      .unwrap()
      .then(() => {
        dispatch(showToast({ type: "success", message: "Question Updated!" }));
        handleClose();
      })
      .catch((e) => {
        dispatch(showToast({ type: "error", message: e.errorMessage }));
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
