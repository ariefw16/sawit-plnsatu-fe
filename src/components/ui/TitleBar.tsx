import { Grid, Typography, Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ReactChild } from "react";
import { Link } from "react-router-dom";

export default function TitleBar(props: {
  title: string;
  subtitle?: string;
  buttonCreateText?: string;
  children?: ReactChild;
  handleCreateDialog?: any;
  redirectCreate?: any;
  createType: "redirect" | "dialog" | "no";
}) {
  const {
    title,
    subtitle = "",
    children,
    buttonCreateText,
    createType,
    handleCreateDialog,
    redirectCreate,
  } = props;
  return (
    <Grid container sx={{ p: 1 }}>
      <Grid item md={8}>
        <Typography
          variant="h3"
          sx={{ fontSize: 25, fontWeight: 700, lineHeight: 1.4 }}
        >
          {title}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ fontSize: 15, fontWeight: 400, color: "#223354b3" }}
        >
          {subtitle}
        </Typography>
      </Grid>
      <Grid item md={4}>
        <Box
          sx={{
            width: 1,
            display: "flex",
            flexDirection: "row-reverse",
            mt: 1,
          }}
        >
          {createType === "dialog" ? (
            <Button
              variant="contained"
              sx={{ mx: 1 }}
              startIcon={<AddIcon />}
              onClick={handleCreateDialog}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {buttonCreateText}
              </Typography>
            </Button>
          ) : createType === "redirect" ? (
            <Button
              variant="contained"
              sx={{ mx: 1 }}
              startIcon={<AddIcon />}
              component={Link}
              to={redirectCreate}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {buttonCreateText}
              </Typography>
            </Button>
          ) : undefined}
          {children}
        </Box>
      </Grid>
    </Grid>
  );
}
