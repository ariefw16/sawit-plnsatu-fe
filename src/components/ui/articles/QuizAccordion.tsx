import { Create, ExpandMore, Star } from "@mui/icons-material";
import Add from "@mui/icons-material/Add";
import DeleteForever from "@mui/icons-material/DeleteForever";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useAppSelector } from "../../../store";

export default function QuizAccordion() {
  const quiz = useAppSelector((state) => state.article.selectedArticle.quizzes);
  const [shown, setShown] = useState(0);

  return (
    <Grid container columnSpacing={2}>
      <Grid item md={4} sm={12}>
        <TextField
          variant="outlined"
          label="Question to Show"
          fullWidth
          value={shown}
          onChange={(e) => {
            setShown(parseInt(e.target.value));
          }}
        />
        <Button fullWidth sx={{ mt: 2 }} variant="outlined" startIcon={<Add />}>
          Add new Question
        </Button>
      </Grid>
      <Grid item md={8} sm={12}>
        {quiz?.map((x) => (
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
  );
}
