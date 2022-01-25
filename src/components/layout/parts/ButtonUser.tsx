import { Button, Box, Avatar, Typography, SvgIcon } from "@mui/material";

export default function ButtonUser(props: { bgcolor: string; width?: number }) {
  const { bgcolor, width } = props;
  return (
    <Button
      sx={{
        bgcolor,
        mx: 2,
        pl: 1,
        pr: 0,
        borderRadius: 3,
        width,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
          width: 1,
        }}
      >
        <Avatar>AD</Avatar>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            pl: 1,
            justifyContent: "start",
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{ lineHeight: 1.5, color: "black", fontWeight: "bold" }}
          >
            Administrator
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "start",
            }}
          >
            <Typography
              variant="caption"
              sx={{ lineHeight: 1.5, color: "black" }}
            >
              Super Admin
            </Typography>
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            p: 0,
          }}
        >
          <SvgIcon color="action">
            <path d="M12 5.83 15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z"></path>
          </SvgIcon>
        </Box>
      </Box>
    </Button>
  );
}
