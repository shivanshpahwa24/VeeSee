import React, { useContext } from "react";

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
  } = useContext(SocketContext);

  return (
    <div className="callRoom">
      <div className="d-flex justify-content-center align-items-center"></div>
    </div>
  );
};

export default VideoPlayer;
