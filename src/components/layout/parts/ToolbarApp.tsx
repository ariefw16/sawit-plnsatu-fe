import { Toolbar, Box, Button } from "@mui/material";
import ButtonUser from "./ButtonUser";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import SettingsIcon from "@mui/icons-material/Settings";

export default function ToolbarApp() {
  return (
    <Toolbar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
          width: 1,
        }}
      >
        <Button sx={{ borderRadius: 4 }}>
          <SearchIcon color="primary" />
        </Button>
        <Box sx={{ flexGrow: 1 }} />

        <Button
          sx={{
            padding: 1,
            height: 40,
            minHeight: 0,
            minWidth: 0,
            mr: 1,
            mt: 1,
          }}
          variant="outlined"
        >
          <NotificationsActiveIcon color="primary" />
        </Button>
        <Button
          sx={{
            padding: 1,
            height: 40,
            minHeight: 0,
            minWidth: 0,
            mr: 1,
            mt: 1,
          }}
          size="small"
          variant="outlined"
        >
          <SettingsIcon color="inherit" />
        </Button>
        <ButtonUser bgcolor="whitesmoke" width={200} />
      </Box>
    </Toolbar>
  );
}
