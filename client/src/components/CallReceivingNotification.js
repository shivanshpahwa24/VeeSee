import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import DialogNotification from "./DialogNotification";
import { SocketContext } from "../Context";

const CallReceivingNotification = ({ modalOpen, setModalOpen }) => {
  const { answerCall, call, setCalling, rejectCall } = useContext(
    SocketContext
  );

  const handleClose = () => {
    setModalOpen(false);
  };
  const CallAction = () => {
    return (
      <>
        <Button
          onClick={() => {
            answerCall();
          }}
          color="primary"
        >
          Yes
        </Button>
        <Button
          onClick={() => {
            rejectCall();
            handleClose();
          }}
          color="secondary"
        >
          No
        </Button>
      </>
    );
  };

  return (
    <>
      <DialogNotification
        dialogTitle={`${call.name} is calling:`}
        handleClose={handleClose}
        modalOpen={modalOpen}
        dialogText={`Would you like to answer?`}
      >
        <CallAction />
      </DialogNotification>
    </>
  );
};

export default CallReceivingNotification;
