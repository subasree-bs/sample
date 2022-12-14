import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
// import Typography from "@mui/material/Typography";
import { Table, TableCell, TableRow } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs() {
  const [ModalOpen, setModalOpen] = React.useState(false);

  const handleClickModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickModalOpen}
        size="small"
        sx={{ fontSize: 10, borderColor: "#7009AB", color: "#7009AB" }}
      >
        View group prices
      </Button>
      <BootstrapDialog
        onClose={handleModalClose}
        aria-labelledby="customized-dialog-title"
        open={ModalOpen}
        sx={{
          "& .MuiDialog-paper": {
            marginTop: "-330px",
            transformOrigin: "0 0 0",
          },
        }}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleModalClose}
          sx={{ minWidth: 600 }}
        >
          Product
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Table>
            <TableRow sx={{ backgroundColor: "#2dce89", m: 0, p: 0 }}>
              <TableCell sx={{ color: "#fff" }}>
                Default Selling Price (Inc. tax)
              </TableCell>
            </TableRow>
            <TableRow sx={{ backgroundColor: "#d2d6de" }}>
              <TableCell>??? 2,343.75</TableCell>
            </TableRow>
          </Table>
          <br />
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleModalClose}
            variant="outlined"
            sx={{
              backgroundColor: "#f4f4f4",
              borderColor: "#ddd",
              color: "#444",
            }}
          >
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}