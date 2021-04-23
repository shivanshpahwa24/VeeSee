import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import NotificationTransition from "./NotificationTransitiion";

const DialogNotification = ({
  dialogTitle,
  handleClose,
  modalOpen,
  dialogText,
  dialogActions,
}) => {
  return (
    <>
      <Dialog
        open={modalOpen}
        TransitionComponent={NotificationTransition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        disableBackdropClick={true}
      >
        <DialogTitle id="alert-dialog-slide-title">{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {dialogText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>{dialogActions}</DialogActions>
      </Dialog>
    </>
  );
};

export default DialogNotification;
