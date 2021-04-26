import React from "react";
import Button from "@material-ui/core/Button";
import DialogNotification from "./DialogNotification";

const CallRejectedNotification = ({ modalOpen, setModalOpen }) => {
  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <DialogNotification
        dialogTitle={`Call Rejected`}
        handleClose={handleClose}
        modalOpen={modalOpen}
      ></DialogNotification>
    </>
  );
};

export default CallRejectedNotification;
