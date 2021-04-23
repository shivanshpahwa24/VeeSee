import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import DialogNotification from "./DialogNotification";
import { SocketContext } from "../Context";

const CallReceivingNotification = ({ modalOpen, setModalOpen }) => {
  const { answerCall, call, setCalling } = useContext(SocketContext);
  const [callAnswered, setCallAnswered] = useState(false);

  const handleClose = () => {
    setModalOpen(false);
  };
  const CallAction = () => {
    return (
      <>
        <Button
          onClick={() => {
            answerCall();
            setCallAnswered(true);
          }}
          color="primary"
        >
          Yes
        </Button>
        <Button
          onClick={() => {
            setCalling(false);
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
      {callAnswered && <Redirect to="/call" />}
    </>
  );
};

export default CallReceivingNotification;
