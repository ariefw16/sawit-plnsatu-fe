import { Box } from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  selector: string;
  id: string;
}

export function TabPanel(props: TabPanelProps) {
  const { children, selector, id, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={selector !== id}
      id={`simple-tabpanel-${id}`}
      aria-labelledby={`simple-tab-${id}`}
      {...other}
    >
      {selector === id && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
