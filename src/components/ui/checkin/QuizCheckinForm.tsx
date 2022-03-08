import { Send } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Divider,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../store";
import { CheckinQuizCreateType } from "../../../types/Quiz.type";

export default function QuizCheckinForm() {
  const article = useAppSelector((state) => state.article.checkinSelected);
  const [data, setData] = useState<CheckinQuizCreateType>({});

  useEffect(() => {
    setData((x) => {
      if (article.quizzes) {
        const retVals = {
          articleId: article.id,
          questions: article.quizzes.map((q) => ({
            quizId: q.id,
            question: q.question,
            choices: q.choices?.map((ch) => ({
              choiceRelId: ch.id,
              name: ch.name,
              isChoosen: false,
            })),
          })),
        };
        return retVals;
      }
      return {};
    });
  }, [article]);

  const submitQuizHandler = () => {
    console.log(data);
  };
  const getChoosenChoice = (quizId: number) => {
    const quiz = data.questions?.find((x) => x.quizId === quizId);
    const choosen = quiz?.choices?.find((x) => x.isChoosen);
    return choosen?.choiceRelId;
  };
  const questionChange = (choiceRelId: number, quizId: number) => {
    setData((x) => {
      const newData = Object.assign({}, x);
      const quizIdx = newData.questions?.findIndex((q) => q.quizId === quizId);
      newData.questions![quizIdx!].choices = newData.questions![
        quizIdx!
      ].choices?.map((ch) => ({
        ...ch,
        isChoosen: ch.choiceRelId === choiceRelId,
      }));
      return newData;
    });
  };

  return (
    <Paper sx={{ p: 2, mt: 2 }} variant="outlined">
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mr: 3 }}>
          Quiz Session
        </Typography>
        <Chip label="Undone" color="error" variant="filled" size="small" />
      </Box>
      <Divider sx={{ mb: 3, mt: 1 }} />
      {data.questions?.map((x, i) => (
        <React.Fragment key={x.quizId}>
          <Typography variant="body2">
            {i + 1}. {x.question}
          </Typography>
          <RadioGroup
            sx={{ pl: 4 }}
            value={getChoosenChoice(x.quizId!) || false}
            onChange={(v) => {
              questionChange(
                parseInt((v.target as HTMLInputElement).value),
                x.quizId!
              );
            }}
          >
            {x.choices?.map((ch) => (
              <FormControlLabel
                key={ch.choiceRelId}
                value={ch.choiceRelId}
                control={<Radio />}
                label={<Typography variant="subtitle2">{ch.name}</Typography>}
              />
            ))}
          </RadioGroup>
        </React.Fragment>
      ))}
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Button
            variant="outlined"
            startIcon={<Send />}
            onClick={submitQuizHandler}
          >
            Submit Quiz
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
