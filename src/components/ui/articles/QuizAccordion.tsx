import { Create, ExpandMore, Star } from "@mui/icons-material";
import Add from "@mui/icons-material/Add";
import DeleteForever from "@mui/icons-material/DeleteForever";
import Save from "@mui/icons-material/Save";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { updateQuizShownArticle } from "../../../services/article.service";
import { deleteQuestion } from "../../../services/quiz.service";
import { useAppDispatch, useAppSelector } from "../../../store";
import { showToast } from "../../../store/toast.store";
import { ArticleQuizType } from "../../../types/Quiz.type";
import DeleteDialog from "../DeleteDialog";
import CreateQuizDialog from "./CreateQuizDialog";

export default function QuizAccordion() {
  const dispatch = useAppDispatch();
  const article = useAppSelector((state) => state.article.selectedArticle);
  const [shown, setShown] = useState(0);
  const [create, setCreate] = useState(false);
  const [deletion, setDeletion] = useState(false);
  const [deletionData, setDeletionData] = useState<{
    id: number;
    name: string;
  }>({ id: 0, name: "" });
  const [update, setUpdate] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<ArticleQuizType>({});

  useEffect(() => {
    setShown(article?.quiz_shown || 0);
  }, [article.quiz_shown]);

  const saveShownHandler = () => {
    dispatch(updateQuizShownArticle({ id: article.id!, shown }))
      .unwrap()
      .then(() => {
        dispatch(
          showToast({ message: "Question to Show updated!", type: "success" })
        );
      })
      .catch((e) => {
        dispatch(showToast({ type: "error", message: e.errorMessage }));
      });
  };
  const showCreateHandler = () => {
    setCreate(true);
  };
  const deleteQuestionHandler = () => {
    dispatch(deleteQuestion({ id: deletionData.id }))
      .unwrap()
      .then(() => {
        dispatch(showToast({ message: "Question deleted!", type: "success" }));
        setDeletion(false);
      })
      .catch((e) => {
        dispatch(showToast({ message: e.errorMessage, type: "error" }));
      });
  };
  const deleteButtonHandler = (params: { id: number; name: string }) => {
    setDeletion(true);
    setDeletionData(params);
  };

  return (
    <>
      <Grid container columnSpacing={2}>
        <Grid item md={4} sm={12}>
          <TextField
            variant="outlined"
            label="Question to Show"
            fullWidth
            value={shown}
            onChange={(e) => {
              setShown(parseInt(e.target.value || "0"));
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") saveShownHandler();
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    color="secondary"
                    variant="outlined"
                    onClick={saveShownHandler}
                  >
                    <Save />
                  </Button>
                </InputAdornment>
              ),
            }}
          />
          <Button
            fullWidth
            sx={{ mt: 2 }}
            variant="outlined"
            startIcon={<Add />}
            onClick={showCreateHandler}
          >
            Add new Question
          </Button>
        </Grid>
        <Grid item md={8} sm={12}>
          {article.quizzes?.map((x) => (
            <Accordion key={x.id}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                sx={{ backgroundColor: "whitesmoke" }}
              >
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  {x.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="body1">{x.question}</Typography>
                  </Box>
                  <Box sx={{ flexGrow: 1 }} />
                  <Button
                    size="small"
                    variant="outlined"
                    sx={{
                      padding: 1,
                      height: 40,
                      minHeight: 0,
                      minWidth: 0,
                      mx: 1,
                    }}
                    color="secondary"
                  >
                    <Create fontSize="small" />
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    sx={{
                      padding: 1,
                      height: 40,
                      minHeight: 0,
                      minWidth: 0,
                    }}
                    color="error"
                    onClick={() => {
                      deleteButtonHandler({ id: x.id!, name: x.question! });
                    }}
                  >
                    <DeleteForever fontSize="small" />
                  </Button>
                </Box>
                <List dense>
                  {x.choices?.map((ch) => (
                    <React.Fragment key={ch.id}>
                      <ListItem>
                        <ListItemIcon>{ch.isCorrect && <Star />}</ListItemIcon>
                        <ListItemText primary={ch.name} />
                      </ListItem>
                      <Divider variant="inset" />
                    </React.Fragment>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
      </Grid>
      <CreateQuizDialog
        open={create}
        handleClose={() => {
          setCreate(false);
        }}
      />
      <DeleteDialog
        open={deletion}
        data={deletionData}
        handleClose={() => {
          setDeletion(false);
        }}
        handleDelete={deleteQuestionHandler}
      />
    </>
  );
}
