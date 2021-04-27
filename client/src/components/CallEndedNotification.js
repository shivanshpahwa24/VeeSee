import React from "react";
import DialogNotification from "./DialogNotification";

const CallEndedNotification = ({ modalOpen, setModalOpen }) => {
  const handleClose = () => {
    setModalOpen(false);
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
