import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import FormTitleBar from "../../components/ui/FormTitleBar";

export default function SettingPage() {
  return (
    <>
      <FormTitleBar
        title="Settings"
        viewMode="create"
        handlerBackButton={() => {}}
        breadcrumbs={[{ label: "Settings" }]}
        isView={false}
        handlerCreateButton={() => {}}
      />
      <Grid container sx={{ mt: 4 }}>
        <Grid item md={6} sm={12}>
          <Card variant="outlined" sx={{ p: 1 }}>
            <CardContent>
              <Typography variant="h6">Points</Typography>
              <Divider variant="fullWidth" orientation="horizontal" />
              <Grid container sx={{ mt: 1 }}>
                <Grid item md={2} />
                <Grid
                  item
                  md={4}
                  display={{ xs: "none", md: "block" }}
                  sx={{
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="button">Read Article</Typography>
                </Grid>
                <Grid item md={6}>
                  <TextField
                    variant="outlined"
                    placeholder="Read Article Points"
                    size="small"
                  />
                </Grid>
              </Grid>
              <Grid container sx={{ mt: 1 }}>
                <Grid item md={2} />
                <Grid
                  item
                  md={4}
                  display={{ xs: "none", md: "block" }}
                  sx={{
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="button">Points per Question</Typography>
                </Grid>
                <Grid item md={6}>
                  <TextField
                    variant="outlined"
                    placeholder="Quiz Points"
                    size="small"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
