import { Button, Typography } from "@mui/material";
import TitleBar from "../../components/ui/TitleBar";

export default function UnitPage() {
  return (
    <>
      <TitleBar
        title="Unit Management"
        subtitle="You can manage all unit available in this application"
        buttonCreateText="Create new Unit"
      >
        <Button variant="outlined" sx={{ mx: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Export
          </Typography>
        </Button>
      </TitleBar>
    </>
  );
}
