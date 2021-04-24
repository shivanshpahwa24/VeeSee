import React, { useContext, useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import CallEndRoundedIcon from "@material-ui/icons/CallEndRounded";
import { SocketContext } from "../Context";
import DialogNotification from "./DialogNotification";
import Button from "@material-ui/core/Button";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import VideocamOutlinedIcon from "@material-ui/icons/VideocamOutlined";
import VideocamOffOutlinedIcon from "@material-ui/icons/VideocamOffOutlined";

const VideoPlayer = () => {
  const {
    name,
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    setCallEnded,
    stream,
    me,
    call,
    getUserMedia,
    leaveCall,
    nameOfCalledUser,
  } = useContext(SocketContext);

  const [confirmationModal, setConfirmationModal] = useState(false);
  const history = useHistory();
  const [micOff, setMicOff] = useState(false);
  const [videoOff, setVideoOff] = useState(false);

  const handleModalClose = () => {
    setConfirmationModal(false);
  };

  useEffect(() => {
    getUserMedia();
  }, []);

  return (
    <div className="callRoom">
      <div className="video-player-container d-flex flex-column flex-sm-row justify-content-center align-items-center">
        <div className="video-player mr-sm-1 ml-sm-2 mt-3 mt-sm-0">
          {stream && (
            <video
              playsInline
              muted
              ref={myVideo}
              autoPlay
              className="actualVideo"
            />
          )}
          <p className="video-player-name">{name || me.name} (You)</p>
        </div>
        <div className="video-player mr-sm-2 ml-sm-1 my-3 my-sm-0">
          {callAccepted && !callEnded && (
            <video
              playsInline
              ref={userVideo}
              autoPlay
              className="actualVideo"
            />
          )}
          <p className="video-player-name">{call.name || nameOfCalledUser}</p>
        </div>
      </div>
      <div className="callRoom-footer">
        <button
          className={`callRoom-footer-button ${
            micOff ? "callRoom-buttons-off" : "callRoom-buttons-on"
          }`}
          onClick={() => setMicOff(!micOff)}
        >
          {micOff ? <MicOffIcon /> : <MicIcon />}
        </button>
        <button
          onClick={() => {
            setConfirmationModal(true);
          }}
          className="callRoom-footer-button endCall-button"
        >
          <CallEndRoundedIcon />
        </button>
        <button
          className={`callRoom-footer-button ${
            videoOff ? "callRoom-buttons-off" : "callRoom-buttons-on"
          }`}
          onClick={() => setVideoOff(!videoOff)}
        >
          {videoOff ? <VideocamOffOutlinedIcon /> : <VideocamOutlinedIcon />}
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
