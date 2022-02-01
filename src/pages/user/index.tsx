import {
  Box,
  Button,
  Grid,
  Paper,
  TablePagination,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteDialog from "../../components/ui/DeleteDialog";
import TitleBar from "../../components/ui/TitleBar";
import UnitCreateDialog from "../../components/ui/unit/CreateDialog";
import UnitSearchBox from "../../components/ui/unit/SearchBox";
import UnitTable from "../../components/ui/unit/UnitTable";
import CreateUserDialog from "../../components/ui/user/CreateUserDialog";
import UserSearchBox from "../../components/ui/user/UserSearchBox";
import UserTable from "../../components/ui/user/UserTable";
import { fetchUser } from "../../services/user.service";
import { useAppDispatch, useAppSelector } from "../../store";
import { showToast } from "../../store/toast.store";
import unit from "../unit";

export default function UserPage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.users);
  const totalRow = useAppSelector((state) => state.user.totalRow);
  const [isLoading, setIsLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showDialog, setShowDialog] = useState<{
    create: boolean;
    delete: boolean;
  }>({ create: false, delete: false });
  const [singleDelete, setSingleDelete] = useState<{
    id: number;
    name: string;
  }>({ id: 0, name: "" });

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchUser({ limit: rowsPerPage }))
      .unwrap()
      .catch((e) => {
        dispatch(showToast({ type: "error", message: e.errorMessage }));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [rowsPerPage]);

  const handleRowPerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(e.target.value));
  };
  const handleDeleteData = () => {};
  const handleDeleteButton = () => {};

  return (
    <>
      <TitleBar
        title="User Management"
        subtitle="Manage all user who can access this application"
        buttonCreateText="Create new User"
        createType="dialog"
        handleCreateDialog={() => {
          setShowDialog((x) => ({ ...x, create: true }));
        }}
      >
        <Button variant="outlined" sx={{ mx: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Export
          </Typography>
        </Button>
      </TitleBar>
      <UserSearchBox />
      <Paper sx={{ py: 2, my: 3 }} variant="outlined">
        <Grid container rowSpacing={2}>
          <Grid item sm={12} sx={{ px: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography variant="caption" sx={{ fontSize: 14 }}>
                  Showing {totalRow} data
                </Typography>
              </Box>
              <Box sx={{ flexGrow: 1 }} />
              <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
                rowsPerPage={rowsPerPage}
                count={unit.length}
                page={0}
                component="div"
                onPageChange={() => {}}
                onRowsPerPageChange={handleRowPerPageChange}
              />
            </Box>
          </Grid>
          <Grid item sm={12}>
            <UserTable
              user={user}
              rowCount={rowsPerPage}
              loading={isLoading}
              handleDeleteButton={handleDeleteButton}
            />
          </Grid>
          <Grid item sm={12} sx={{ px: 2 }}>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50, 100]}
              rowsPerPage={rowsPerPage}
              count={unit.length}
              page={0}
              component="div"
              onPageChange={() => {}}
              onRowsPerPageChange={handleRowPerPageChange}
            />
          </Grid>
        </Grid>
      </Paper>
      <CreateUserDialog
        open={showDialog.create}
        handleClose={() => {
          setShowDialog((x) => ({ ...x, create: false }));
        }}
      />
      <DeleteDialog
        open={showDialog.delete}
        data={singleDelete}
        handleClose={() => {
          setShowDialog({ delete: false, create: false });
        }}
        handleDelete={handleDeleteData}
      />
    </>
  );
}
