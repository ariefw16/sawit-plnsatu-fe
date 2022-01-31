import {
  Backdrop,
  CircularProgress,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DeleteDialog from "../../components/ui/DeleteDialog";
import FormTitleBar from "../../components/ui/FormTitleBar";
import UnitFormView from "../../components/ui/unit/FormView";
import { fetchSingleUnit } from "../../services/unit.service";
import { useAppDispatch, useAppSelector } from "../../store";
import { showToast } from "../../store/toast.store";

export default function UnitDetailPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const unit = useAppSelector((state) => state.unit.selectedUnit);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [isView, setIsView] = useState(true);

  useEffect(() => {
    setOpenBackdrop(true);
    dispatch(fetchSingleUnit({ id: parseInt(id!) }))
      .unwrap()
      .catch((e) => {
        dispatch(showToast({ type: "error", message: e.errorMessage }));
      })
      .finally(() => {
        setOpenBackdrop(false);
      });
  }, [id]);

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
      >
        <CircularProgress color="secondary" />
      </Backdrop>
      <FormTitleBar
        breadcrumbs={[{ to: "/unit", label: "Unit" }, { label: "Detail Unit" }]}
        handlerBackButton={() => {
          navigate(-1);
        }}
        handlerDeleteButton={() => {
          setDeleteDialog(true);
        }}
        handlerUpdateButton={() => {
          setIsView(false);
        }}
        handlerCancelEditButton={() => {
          setIsView(true);
        }}
        handlerSubmitEdit={() => {}}
        isView={isView}
      />
      <DeleteDialog
        open={deleteDialog}
        handleClose={() => {
          setDeleteDialog(false);
        }}
        handleDelete={() => {}}
        data={{ id: unit.id!, name: unit.name! }}
      />
      {isView ? <UnitFormView unit={unit} /> : <></>}
    </>
  );
}
