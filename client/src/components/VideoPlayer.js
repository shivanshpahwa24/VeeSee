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

  return <div></div>;
};

export default VideoPlayer;
