import React, { useContext, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import CallEndRoundedIcon from "@material-ui/icons/CallEndRounded";
import { SocketContext } from "../Context";

const VideoPlayer = () => {
  const {
    name,
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    stream,
    call,
    getUserMedia,
    leaveCall,
  } = useContext(SocketContext);

  const history = useHistory();

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
        </div>
        <div className="video-player mr-2 ml-1">
          {stream && (
            <video
              playsInline
              ref={userVideo}
              autoPlay
              className="actualVideo"
            />
          )}
        </div>
      </div>
      <div className="callRoom-footer">
        <button
          onClick={() => {
            leaveCall();
          }}
          className="endCall-button"
        >
          <CallEndRoundedIcon />
        </button>
      </div>
      {callEnded && <Redirect to="/" />}
    </div>
  );
};

export default VideoPlayer;
