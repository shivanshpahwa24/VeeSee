import React, { useContext, useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import CallEndRoundedIcon from "@material-ui/icons/CallEndRounded";
import { SocketContext } from "../Context";
import DialogNotification from "./DialogNotification";
import Button from "@material-ui/core/Button";

const VideoPlayer = () => {
  const {
    name,
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    setCallEnded,
    stream,
    call,
    getUserMedia,
    leaveCall,
  } = useContext(SocketContext);

  const [confirmationModal, setConfirmationModal] = useState(false);
  const history = useHistory();

  const handleModalClose = () => {
    setConfirmationModal(false);
  };

  useEffect(() => {
    getUserMedia();
    return {};
  }, []);

  return (
    <div className="callRoom">
      <div className="video-player-container d-sm-flex justify-content-center align-items-center">
        <div className="video-player mr-1 ml-2">
          {stream && (
            <video
              playsInline
              muted
              ref={myVideo}
              autoPlay
              className="actualVideo"
            />
          )}
          <p className="video-player-name">{name} (You)</p>
        </div>
        <div className="video-player mr-2 ml-1">
          {callAccepted && !callEnded && (
            <video
              playsInline
              ref={userVideo}
              autoPlay
              className="actualVideo"
            />
          )}
          <p className="video-player-name">{call.name}</p>
        </div>
      </div>
      <div className="callRoom-footer">
        <button
          onClick={() => {
            setConfirmationModal(true);
          }}
          className="endCall-button"
        >
          <CallEndRoundedIcon />
        </button>
      </div>
      <DialogNotification
        dialogTitle={`Are you sure you want to leave the call?`}
        handleClose={handleModalClose}
        modalOpen={confirmationModal}
      >
        <Button
          onClick={() => {
            history.push("/");
            leaveCall();
            setCallEnded(true);
          }}
          color="primary"
        >
          Yes
        </Button>
        <Button onClick={handleModalClose} color="secondary">
          No
        </Button>
      </DialogNotification>
      {callEnded && <Redirect to="/" />}
    </div>
  );
};

export default VideoPlayer;
