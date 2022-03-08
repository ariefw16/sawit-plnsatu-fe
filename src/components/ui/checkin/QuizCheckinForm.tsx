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
  const [data, setData] = useState<CheckinQuizCreateType[]>([]);

  useEffect(() => {
    setData(Object.assign([], article.quizzes));
  }, [article.quizzes]);

  const submitQuiz = () => {};

  return (
    <Paper sx={{ p: 2, mt: 2 }} variant="outlined">
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mr: 3 }}>
          Quiz Session
        </Typography>
        <Chip label="Undone" color="error" variant="filled" size="small" />
      </Box>
      <Divider sx={{ mb: 3, mt: 1 }} />
      {article.quizzes?.map((x, i) => (
        <React.Fragment key={x.id}>
          <Typography variant="body2">
            {i + 1}. {x.question}
          </Typography>
          <RadioGroup sx={{ pl: 4 }}>
            {x.choices?.map((ch) => (
              <FormControlLabel
                key={ch.id}
                value={ch.id}
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
          <Button variant="outlined" startIcon={<Send />}>
            Submit Quiz
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
