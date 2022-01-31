import { Paper, Grid, TextField } from "@mui/material";
import { UnitType } from "../../../types/Unit.type";

export default function UnitFormView(props: { unit: UnitType }) {
  const { unit } = props;
  return (
    <Paper variant="outlined" sx={{ my: 2, p: 2 }}>
      <Grid container rowSpacing={1} columnSpacing={1}>
        <Grid item sm={12}>
          <TextField
            fullWidth
            variant="filled"
            value={unit.name || ""}
            inputProps={{ readOnly: true }}
            label="Unit Name"
          />
        </Grid>
        <Grid item sm={12}>
          <TextField
            fullWidth
            variant="filled"
            value={unit.parent?.name || "-"}
            inputProps={{ readOnly: true }}
            label="Parent Unit"
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
