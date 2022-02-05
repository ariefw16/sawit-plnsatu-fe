import { Backdrop, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DeleteDialog from "../../components/ui/DeleteDialog";
import FormTitleBar from "../../components/ui/FormTitleBar";
import UserFormEdit from "../../components/ui/user/FormEdit";
import UserFormView from "../../components/ui/user/FormView";
import { fetchSingleUser, updateUser } from "../../services/user.service";
import { useAppDispatch, useAppSelector } from "../../store";
import { showToast } from "../../store/toast.store";
import { UserType, UserUpdateType } from "../../types/User.type";

export default function DetailUserPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [isView, setIsView] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [userData, setUserData] = useState<UserUpdateType>({});
  const user = useAppSelector((state) => state.user.selectedUser);

  useEffect(() => {
    dispatch(fetchSingleUser({ id: parseInt(id!) }))
      .unwrap()
      .catch((e) => {
        dispatch(showToast({ type: "error", message: e.errorMessage }));
      });
  }, []);

  const backButtonHandler = () => {
    navigate(-1);
  };
  const updateButtonHandler = () => {
    setIsView(false);
    const { id, name, email, nik, unit, username, password } = user;
    const userTemp: UserUpdateType = Object.assign(
      {},
      {
        id,
        name,
        email,
        nik,
        username,
        password,
        unit: (unit && { id: unit.id!, name: unit.name! }) || undefined,
      }
    );
    setUserData(userTemp);
  };
  const cancelButtonHandler = () => {
    setIsView(true);
  };
  const deleteButtonHandler = () => {
    setDeleteDialog(true);
  };
  const SubmitEditHandler = () => {
    setOpenBackdrop(true);
    dispatch(updateUser(userData))
      .unwrap()
      .then(() => {
        setIsView(true);
        dispatch(
          showToast({
            type: "success",
            message: `update user ${user.name} success`,
          })
        );
      })
      .catch((e) => {
        dispatch(showToast({ type: "error", message: e.errorMessage }));
      })
      .finally(() => {
        setOpenBackdrop(false);
      });
  };
  const deleteDataHandler = () => {};
  const onchangeDataHandler = (user: UserUpdateType) => {
    setUserData((x) => ({ ...x, ...user }));
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
      >
        <CircularProgress color="secondary" />
      </Backdrop>
      <DeleteDialog
        open={deleteDialog}
        data={{ id: user.id!, name: user.name! }}
        handleClose={() => {
          setDeleteDialog(false);
        }}
        handleDelete={deleteDataHandler}
      />
      <FormTitleBar
        isView={isView}
        breadcrumbs={[
          { to: "/user", label: "User Management" },
          { label: "Detail User" },
        ]}
        handlerBackButton={backButtonHandler}
        handlerUpdateButton={updateButtonHandler}
        handlerCancelEditButton={cancelButtonHandler}
        handlerDeleteButton={deleteButtonHandler}
        handlerSubmitEdit={SubmitEditHandler}
        title="User Detail"
        viewMode="detail"
      />
      {isView ? (
        <UserFormView user={user} />
      ) : (
        <UserFormEdit user={userData} handlerOnChange={onchangeDataHandler} />
      )}
    </>
  );
}
