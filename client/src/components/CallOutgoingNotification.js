import React from "react";
import Button from "@material-ui/core/Button";
import DialogNotification from "./DialogNotification";

const CallOutgoingNotification = ({ modalOpen, setModalOpen, id }) => {
  const handleClose = () => {
    setModalOpen(false);
  };
  const CallAction = () => {
    return (
      <>
        <Button onClick={handleClose} color="secondary">
          x
        </Button>
      </>
    );
  };

  return (
    <>
      <DialogNotification
        dialogTitle={`Calling ID : ${id} ...`}
        handleClose={handleClose}
        modalOpen={modalOpen}
      >
        <CallAction />
      </DialogNotification>
    </>
  );
};

export default CallOutgoingNotification;
