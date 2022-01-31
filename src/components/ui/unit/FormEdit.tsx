import { Autocomplete, Grid, Paper, TextField } from "@mui/material";
import { useEffect } from "react";
import { fetchUnit } from "../../../services/unit.service";
import { useAppDispatch, useAppSelector } from "../../../store";
import { UnitType } from "../../../types/Unit.type";

export default function UnitFormEdit(props: {
  unit: UnitType;
  handleOnchange: any;
}) {
  const { unit, handleOnchange } = props;
  const dispatch = useAppDispatch();
  const units = useAppSelector((state) => state.unit.units).map((x) => ({
    id: x.id,
    name: x.name,
  }));

  useEffect(() => {
    if (units.length < 1) dispatch(fetchUnit({ limit: 1000 }));
  }, []);

  return (
    <Paper variant="outlined" sx={{ my: 2, p: 2 }}>
      <Grid container rowSpacing={1} columnSpacing={1}>
        <Grid item sm={12}>
          <TextField
            fullWidth
            variant="outlined"
            value={unit.name || ""}
            label="Unit Name"
            onChange={(e) => {
              handleOnchange({ name: e.target.value });
            }}
          />
        </Grid>
        <Grid item sm={12}>
          <Autocomplete
            options={units.filter((x) => x.id !== unit.id)}
            getOptionLabel={(x) => x.name! || ""}
            renderInput={(params) => (
              <TextField {...params} label="Parent Unit" />
            )}
            onChange={(ev, val) => {
              handleOnchange({
                parent: { id: val?.id!, name: val?.name! },
              });
            }}
            isOptionEqualToValue={(opt, val) => opt.id === val.id}
            value={{ id: unit.parent?.id, name: unit.parent?.name }}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
