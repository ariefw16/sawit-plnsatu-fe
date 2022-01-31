import { Box, Button, Typography, Breadcrumbs, Link } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link as RouterLink } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function FormTitleBar(props: {
  breadcrumbs: { to?: string; label: string }[];
  handlerBackButton: any;
  handlerDeleteButton: any;
  handlerUpdateButton: any;
  handlerCancelEditButton: any;
  handlerSubmitEdit: any;
  isView: boolean;
}) {
  const {
    breadcrumbs,
    handlerBackButton,
    handlerDeleteButton,
    handlerUpdateButton,
    isView,
    handlerCancelEditButton,
    handlerSubmitEdit,
  } = props;
  return (
    <Box sx={{ display: "flex", flexDirection: "row", my: 2 }}>
      <Box>
        <Button
          sx={{
            padding: 1,
            height: 50,
            minHeight: 0,
            minWidth: 0,
            borderRadius: 3,
          }}
          onClick={handlerBackButton}
        >
          <ArrowBackIcon />
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", px: 2 }}>
        <Typography variant="h5">Unit Details</Typography>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link
            component={RouterLink}
            underline="hover"
            key="1"
            color="inherit"
            to="/"
          >
            <Typography variant="body2">Home</Typography>
          </Link>
          {breadcrumbs.map((x) => {
            if (x.to)
              return (
                <Link
                  component={RouterLink}
                  underline="hover"
                  key="1"
                  color="inherit"
                  to={x.to}
                >
                  <Typography variant="body2">{x.label}</Typography>
                </Link>
              );
            else
              return (
                <Typography key="3" color="text.primary" variant="body2">
                  {x.label}
                </Typography>
              );
          })}
        </Breadcrumbs>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      {isView ? (
        <Box>
          <Button
            size="large"
            variant="outlined"
            color="error"
            sx={{ fontWeight: "bold", mr: 2 }}
            startIcon={<DeleteOutlineIcon />}
            onClick={handlerDeleteButton}
          >
            Delete
          </Button>
          <Button
            size="large"
            variant="contained"
            sx={{ fontWeight: "bold" }}
            startIcon={<EditIcon />}
            onClick={handlerUpdateButton}
          >
            Update Data
          </Button>
        </Box>
      ) : (
        <Box>
          <Button
            size="large"
            variant="outlined"
            color="warning"
            sx={{ fontWeight: "bold", mr: 2 }}
            startIcon={<DeleteOutlineIcon />}
            onClick={handlerCancelEditButton}
          >
            Cancel
          </Button>
          <Button
            size="large"
            variant="contained"
            sx={{ fontWeight: "bold", color: "white" }}
            startIcon={<EditIcon />}
            onClick={handlerSubmitEdit}
            color="secondary"
          >
            Save Update
          </Button>
        </Box>
      )}
    </Box>
  );
}
