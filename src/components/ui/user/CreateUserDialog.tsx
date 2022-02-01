import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  TextField,
  Autocomplete,
  DialogActions,
  Button,
} from "@mui/material";
import { useState } from "react";
import { createUnit } from "../../../services/unit.service";
import { useAppDispatch, useAppSelector } from "../../../store";
import { showToast } from "../../../store/toast.store";
import { UnitCreateType } from "../../../types/Unit.type";

export default function CreateUserDialog(props: {
  open: boolean;
  handleClose: any;
}) {
  const { open, handleClose } = props;
  const [data, setData] = useState<UnitCreateType>({
    name: "",
    parentId: 0,
    parent: undefined,
  });
  const dispatch = useAppDispatch();
  const units = useAppSelector((state) =>
    state.unit.units.map((x) => ({ id: x.id, name: x.name }))
  );

  const handlerDataChange = (data: UnitCreateType) => {
    setData((x) => ({ ...x, ...data }));
  };
  const handleSubmit = () => {
    dispatch(createUnit(data))
      .unwrap()
      .then(() => {
        dispatch(
          showToast({ message: "Unit created success!", type: "success" })
        );
        resetData();
        handleClose();
      })
      .catch((e) => {
        dispatch(showToast({ message: e.errorMessage, type: "error" }));
      });
  };
  const resetData = () => {
    setData({ name: "", parentId: 0, parent: undefined });
  };

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
            <Autocomplete
              options={units}
              getOptionLabel={(x) => x.name!}
              renderInput={(params) => (
                <TextField {...params} label="Parent Unit" />
              )}
              onChange={(ev, val) => {
                handlerDataChange({
                  parent: { id: val?.id!, name: val?.name! },
                });
              }}
              isOptionEqualToValue={(opt, val) => opt.id === val.id}
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
