import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

import { SocketContext } from "../Context";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Notifications = ({ modalOpen, setModalOpen }) => {
  const { answerCall, call } = useContext(SocketContext);
  const [callAnswered, setCallAnswered] = useState(false);

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Dialog
        open={modalOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        disableBackdropClick={true}
      >
        <DialogTitle id="alert-dialog-slide-title">
          {` ${call.name} is calling:`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Would you like to answer?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              answerCall();
              setCallAnswered(true);
            }}
            color="primary"
          >
            Yes
          </Button>
          <Button onClick={handleClose} color="secondary">
            No
          </Button>
        </DialogActions>
      </Dialog>
      {callAnswered && <Redirect to="/call" />}
    </>
  );
};

export default Notifications;
