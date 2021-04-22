import React, { useContext } from "react";

import { SocketContext } from "../Context";

const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);

  return <></>;
};

export default Notifications;
