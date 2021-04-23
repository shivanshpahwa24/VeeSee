import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import DialogNotification from "./DialogNotification";
import { SocketContext } from "../Context";

const CallOutgoingNotification = ({ modalOpen, setModalOpen, id }) => {
  const { answerCall, call } = useContext(SocketContext);
  const [callAnswered, setCallAnswered] = useState(false);

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
      {callAnswered && <Redirect to="/call" />}
    </>
  );
};

export default CallOutgoingNotification;
