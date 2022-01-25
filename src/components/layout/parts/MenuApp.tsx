import {
  List,
  ListSubheader,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  SxProps,
  Theme,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

export default function MenuApp() {
  const sxList: SxProps<Theme> = {
    mx: 2, // selected and (selected + hover) states
    "&& .Mui-selected, && .Mui-selected:hover": {
      bgcolor: (theme: Theme) => theme.palette.secondary.light,
      "&, & .MuiListItemIcon-root": {
        color: (theme: Theme) => theme.palette.secondary.main,
      },
    },
    // hover states
    "& .MuiListItemButton-root:hover": {
      bgcolor: (theme: Theme) => theme.palette.secondary.light,
      "&, & .MuiListItemIcon-root": {
        color: (theme: Theme) => theme.palette.secondary.main,
      },
    },
  };
  return (
    <>
      <List sx={sxList}>
        <ListSubheader>App Menu</ListSubheader>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItemButton key={text} sx={{ borderRadius: 3, p: 1 }}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{ fontSize: 14, fontWeight: "bold" }}
              primary={text}
            />
          </ListItemButton>
        ))}
      </List>
      <ListSubheader>Administrator</ListSubheader>
      <List sx={sxList}>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItemButton key={text} sx={{ borderRadius: 3, p: 1 }}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{ fontSize: 14, fontWeight: "bold" }}
              primary={text}
            />
          </ListItemButton>
        ))}
      </List>
    </>
  );
}
