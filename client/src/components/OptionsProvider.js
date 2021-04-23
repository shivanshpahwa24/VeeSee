import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Snackbar from "@material-ui/core/Snackbar";
import CallReceivingNotification from "./CallReceivingNotification";
import { SocketContext } from "../Context";

const OptionsProvider = () => {
  const { me, callAccepted, name, setName, callUser, call } = useContext(
    SocketContext
  );
  const [idToCall, setIdToCall] = useState("");
  const [idAlertOpen, setIdAlertOpen] = useState(false);
  const [callingModalOpen, setCallingModalOpen] = useState(true);
  const [receivingModalOpen, setReceivingModalOpen] = useState(true);

  const [direction, setDirection] = useState({
    vertical: "bottom",
    horizontal: "left",
  });
  const { vertical, horizontal } = direction;
  return (
    <div className="d-sm-flex justify-content-around align-items-center">
      <div>
        <h2 className="grey-text">Call a user</h2>
        <form className="">
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
          <button
            type="button"
            onClick={() => callUser(idToCall)}
            className="btn callButton"
          >
            Call
          </button>
        </form>
      </div>
      <div className="d-none d-sm-block headerDivider"></div>
      <div>
        <CopyToClipboard
          text={me}
          onCopy={() => {
            /* setCopied(true); */
            setIdAlertOpen(true);
          }}
        >
          <button>Copy Your ID</button>
        </CopyToClipboard>

        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={idAlertOpen}
          onClose={() => setIdAlertOpen(false)}
          message={`ID copied : ${me}`}
          key={vertical + horizontal}
        />
      </div>
      {call.isReceivingCall && !callAccepted && (
        <CallReceivingNotification
          modalOpen={receivingModalOpen}
          setModalOpen={setReceivingModalOpen}
        />
      )}
      {callAccepted && <Redirect to="/call" />}
    </div>
  );
};

export default OptionsProvider;
