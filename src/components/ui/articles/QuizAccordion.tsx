import { ExpandMore, Star } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { useAppSelector } from "../../../store";

export default function QuizAccordion() {
  const quiz = useAppSelector((state) => state.article.selectedArticle.quizzes);

  return (
    <Grid container columnSpacing={2}>
      <Grid item md={4} sm={12}>
        <TextField variant="outlined" label="Question to Show" fullWidth />
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
              <Typography variant="body1">{x.question}</Typography>
              <List dense>
                {x.choices?.map((ch) => (
                  <>
                    <ListItem>
                      <ListItemIcon>{ch.isCorrect && <Star />}</ListItemIcon>
                      <ListItemText primary={ch.name} />
                    </ListItem>
                    <Divider variant="inset" />
                  </>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </Grid>
    </Grid>
  );
}
