import React, { useState, useContext } from "react";

import { CopyToClipboard } from "react-copy-to-clipboard";

import { SocketContext } from "../Context";

const Sidebar = ({ children }) => {
  const {
    me,
    callAccepted,
    name,
    setName,
    callEnded,
    leaveCall,
    callUser,
  } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState("");

  return <div></div>;
};

export default Sidebar;
