import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Typography,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import React from "react";
import { TransitionProps } from "@mui/material/transitions";

export default function DeleteDialog(props: {
  open: boolean;
  data: { name: string; id: number };
  handleClose: any;
  handleDelete: any;
}) {
  const { open, data, handleClose, handleDelete } = props;
  return (
    <Dialog open={open} TransitionComponent={Transition}>
      <DialogTitle>Confirm for Deletion</DialogTitle>
      <DialogContent>
        Are you sure to delete <b>{data.name}</b> ? This process cannot be
        undone.
      </DialogContent>
      <DialogActions>
        <Button color="info" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
          startIcon={<DeleteForeverIcon />}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
            Yes, Delete it.
          </Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});
