import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import StarsIcon from "@mui/icons-material/Stars";
import PlagiarismIcon from "@mui/icons-material/Plagiarism";

export default function CheckinListHeader() {
  return (
    <Grid container sx={{ display: "flex", mt: 2, py: 2 }} columnSpacing={2}>
      <Grid item md={6}>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Button
              variant="contained"
              size="large"
              color="info"
              sx={{ px: 5 }}
              endIcon={<LoginIcon />}
            >
              Check In
            </Button>
            <Box sx={{ display: "flex", flexDirection: "column", px: 4 }}>
              <Typography
                variant="caption"
                color="secondary"
                sx={{ fontWeight: 700 }}
              >
                Topic Today
              </Typography>
              <Typography variant="h6" color="primary.dark">
                Tes 1 2 3 4 5 Topic
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>
      <Grid item md={3}>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Box sx={{ pr: 2, pt: 1 }}>
              <StarsIcon fontSize="large" color="primary" />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Points in February 2022
              </Typography>
              <Typography variant="h5">100</Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>
      <Grid item md={3}>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Box sx={{ pr: 2, pt: 1 }}>
              <PlagiarismIcon fontSize="large" color="error" />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600 }}
                color="orangered"
              >
                Unread Article
              </Typography>
              <Typography variant="h5">8</Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
