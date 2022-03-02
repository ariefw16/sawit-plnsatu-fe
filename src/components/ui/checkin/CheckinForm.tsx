import {
  Paper,
  Box,
  Divider,
  Grid,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { ArticleType } from "../../../types/Article.type";
import SendToMobileIcon from "@mui/icons-material/SendToMobile";
import { useAppDispatch, useAppSelector } from "../../../store";
import { checkinArticle } from "../../../services/checkin.service";
import { showToast } from "../../../store/toast.store";

export default function CheckinForm() {
  const article = useAppSelector((state) => state.article.checkinSelected);
  const { checkedIn = false } = article;
  const dispatch = useAppDispatch();
  const [read, setRead] = useState(false);

  useEffect(() => {
    setRead(checkedIn);
  }, [checkedIn]);

  const readCheckboxHandler = () => {
    setRead((x) => !x);
  };
  const checkinHandler = () => {
    dispatch(checkinArticle({ id: article.id! }))
      .unwrap()
      .then((res) => {
        dispatch(showToast({ type: "success", message: "Checkin success !" }));
      })
      .catch((e) => {
        dispatch(showToast({ type: "error", message: e.errorMessage }));
      });
  };

  return (
    <>
      <Paper variant="outlined" sx={{ mt: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <Box
            sx={{
              p: 2,
              width: "60%",
              height: "600px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{ display: "block", width: "600px" }}
              dangerouslySetInnerHTML={{ __html: article.body! }}
            ></div>
            <Box sx={{ flexGrow: 1 }} />
            <Grid container>
              <Grid item sm={8}>
                {checkedIn ? (
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Yes, I have read this articles!"
                    disabled
                  />
                ) : (
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox value={read} onChange={readCheckboxHandler} />
                      }
                      label="Yes, I have read this article!"
                    />
                  </FormGroup>
                )}
              </Grid>
              {!article.checkedIn && (
                <Grid item sm={4}>
                  {read && (
                    <Button
                      variant="contained"
                      fullWidth
                      endIcon={<SendToMobileIcon />}
                      color="secondary"
                      onClick={checkinHandler}
                    >
                      Checkin
                    </Button>
                  )}
                </Grid>
              )}
            </Grid>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box sx={{ flexGrow: 1, p: 2, height: "600px", width: "35%" }}>
            <Grid container rowSpacing={1}>
              <Grid item sm={12}>
                <TextField
                  label="Topic / Theme"
                  variant="filled"
                  fullWidth
                  value={article.name || ""}
                  inputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  label="Share Date"
                  variant="filled"
                  fullWidth
                  value={
                    moment(article.article_date).format("ddd, DD MMM YYYY") ||
                    ""
                  }
                  inputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  label="Unit Creator"
                  variant="filled"
                  fullWidth
                  value={article.schedule?.unit?.name || ""}
                  inputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  label="Creator"
                  variant="filled"
                  fullWidth
                  value="-"
                  inputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  label="Points"
                  variant="outlined"
                  fullWidth
                  value={article.points || ""}
                  inputProps={{ readOnly: true }}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </>
  );
}
