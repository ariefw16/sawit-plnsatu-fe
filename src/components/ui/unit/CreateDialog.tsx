import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { UnitCreateType } from "../../../types/Unit.type";

export default function UnitCreateDialog(props: {
  open: boolean;
  handleClose: any;
}) {
  const { open, handleClose } = props;
  const [data, setData] = useState<UnitCreateType>({
    name: "",
    parent: 0,
    parentName: "",
  });

  const handlerDataChange = (data: UnitCreateType) => {
    setData((x) => ({ ...x, ...data }));
  };
  const handleSubmit = () => {};

  return (
    <Dialog open={open} fullWidth maxWidth="sm">
      <DialogTitle>Create new Unit</DialogTitle>
      <DialogContent dividers>
        <Grid container rowSpacing={1}>
          <Grid item sm={12}>
            <TextField
              fullWidth
              label="Unit Name"
              value={data.name}
              onChange={(e) => {
                handlerDataChange({ name: e.target.value });
              }}
            />
          </Grid>
          <Grid item sm={12}>
            <TextField
              fullWidth
              label="Parent Unit"
              value={data.parentName}
              onChange={(e) => {
                handlerDataChange({ parentName: e.target.value });
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="warning" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
