import React from "react";
import Button from "@material-ui/core/Button";
import DialogNotification from "./DialogNotification";

const CallEndedNotification = ({ modalOpen, setModalOpen }) => {
  const handleClose = () => {
    setModalOpen(false);
  };
  const CallAction = () => {
    return (
      <>
        <Button onClick={handleClose} color="secondary">
          OK
        </Button>
      </>
    );
  };

  return (
    <>
      <DialogNotification
        dialogTitle={`Call Ended`}
        handleClose={handleClose}
        modalOpen={modalOpen}
      >
        {/*  <CallAction /> */}
      </DialogNotification>
    </>
  );
};

export default CallEndedNotification;
