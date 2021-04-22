import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    callUser(idToCall);
  };

  return (
    <div>
      <h2 className="grey-text">Call a user</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            className="form-control"
            name="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            type="text"
            required
          />
          <input
            className="form-control"
            type="text"
            name="id"
            placeholder="ID to call"
            value={idToCall}
            onChange={(e) => setIdToCall(e.target.value)}
            id="idToCall"
            required
          />
          <button type="submit" className="btn callButton">
            Call
          </button>
        </form>
      </div>
      {callAccepted && <Redirect to="/call" />}
    </div>
  );
};

export default Sidebar;
