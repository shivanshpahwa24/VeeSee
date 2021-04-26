import React, { useContext, useEffect, useState } from "react";
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
    callEnded,
    setCallEnded,
    stream,
    userVideo,
    me,
    call,
    leaveCall,
    nameOfCalledUser,
    audioMuted,
    videoMuted,
    userAudioMuted,
    userVideoMuted,
    toggleMuteVideo,
    toggleMuteAudio,
  } = useContext(SocketContext);

  const [confirmationModal, setConfirmationModal] = useState(false);

  const handleModalClose = () => {
    setConfirmationModal(false);
  };
  /* 
  useEffect(() => {
    
  }, [myVideo, setStream]); */

  return (
    <div className="callRoom">
      <div className="video-player-container d-flex flex-column flex-sm-row justify-content-center align-items-center">
        <div className="video-player mr-sm-1 ml-sm-2 mt-3 mt-sm-0">
          {stream && (
            <video
              id="myVideo"
              playsInline
              muted
              ref={myVideo}
              autoPlay
              className="actualVideo"
            />
          )}
          <p className="video-player-name">
            {audioMuted && (
              <span className="callRoom-buttons-off callRoom-mic-off-icon">
                <MicOffIcon style={{ fontSize: 16 }} />
              </span>
            )}{" "}
            {name || me.name} (You)
          </p>
        </div>
        <div className="video-player mr-sm-2 ml-sm-1 my-3 my-sm-0">
          {callAccepted && !callEnded && (
            <video
              id="userVideo"
              playsInline
              ref={userVideo}
              autoPlay
              className="actualVideo"
            />
          )}
          <p className="video-player-name">
            {userAudioMuted && (
              <span className="callRoom-buttons-off callRoom-mic-off-icon">
                <MicOffIcon style={{ fontSize: 16 }} />
              </span>
            )}{" "}
            {call.name || nameOfCalledUser}
          </p>
        </div>
      </div>
      <div className="callRoom-footer">
        <button
          className={`callRoom-footer-button ${
            audioMuted ? "callRoom-buttons-off" : "callRoom-buttons-on"
          }`}
          onClick={() => toggleMuteAudio()}
        >
          {audioMuted ? <MicOffIcon /> : <MicIcon />}
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
            videoMuted ? "callRoom-buttons-off" : "callRoom-buttons-on"
          }`}
          onClick={() => toggleMuteVideo()}
        >
          {videoMuted ? <VideocamOffOutlinedIcon /> : <VideocamOutlinedIcon />}
        </button>
      </div>
      <DialogNotification
        dialogTitle={`Are you sure you want to leave the call?`}
        handleClose={handleModalClose}
        modalOpen={confirmationModal}
      >
        <Button
          onClick={() => {
            leaveCall();
          }}
          color="primary"
        >
          Yes
        </Button>
        <Button onClick={handleModalClose} color="secondary">
          No
        </Button>
      </DialogNotification>
    </div>
  );
};

export default VideoPlayer;
