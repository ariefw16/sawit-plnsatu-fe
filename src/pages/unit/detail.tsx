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
import UnitFormEdit from "../../components/ui/unit/FormEdit";
import UnitFormView from "../../components/ui/unit/FormView";
import { fetchSingleUnit, updateUnit } from "../../services/unit.service";
import { useAppDispatch, useAppSelector } from "../../store";
import { showToast } from "../../store/toast.store";
import { UnitType, UnitUpdateType } from "../../types/Unit.type";

export default function UnitDetailPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const unit = useAppSelector((state) => state.unit.selectedUnit);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [isView, setIsView] = useState(true);
  const [unitState, setUnitState] = useState<UnitType>({});

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
  }, []);

  const backButtonHandler = () => {
    navigate(-1);
  };
  const updateButtonHandler = () => {
    setUnitState(Object.assign({}, unit));
    setIsView(false);
  };
  const deleteButtonHandler = () => {
    setDeleteDialog(true);
  };
  const cancelEditHandler = () => {
    setIsView(true);
  };
  const submitEditHandler = () => {
    setOpenBackdrop(true);
    const params: UnitUpdateType = {
      name: unitState.name,
      parent: unitState.parent
        ? { id: unitState.parent?.id!, name: unitState.parent?.name! }
        : undefined,
      id: parseInt(id!),
    };
    dispatch(updateUnit(params))
      .unwrap()
      .then(() => {
        dispatch(
          showToast({ message: "Unit update success!", type: "success" })
        );
        setIsView(true);
      })
      .catch((e) => {
        dispatch(showToast({ type: "error", message: e.errorMessage }));
      })
      .finally(() => {
        setOpenBackdrop(false);
      });
  };
  const changeUnitStateHandler = (unit: Partial<UnitType>) => {
    setUnitState((x) => ({ ...x, ...unit }));
  };

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
        handlerBackButton={backButtonHandler}
        handlerDeleteButton={deleteButtonHandler}
        handlerUpdateButton={updateButtonHandler}
        handlerCancelEditButton={cancelEditHandler}
        handlerSubmitEdit={submitEditHandler}
        isView={isView}
        title="Unit Details"
      />
      <DeleteDialog
        open={deleteDialog}
        handleClose={() => {
          setDeleteDialog(false);
        }}
        handleDelete={() => {}}
        data={{ id: unit.id!, name: unit.name! }}
      />
      {isView ? (
        <UnitFormView unit={unit} />
      ) : (
        <UnitFormEdit
          unit={unitState}
          handleOnchange={changeUnitStateHandler}
        />
      )}
    </>
  );
}
