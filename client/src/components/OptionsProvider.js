import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Snackbar from "@material-ui/core/Snackbar";
import CallReceivingNotification from "./CallReceivingNotification";
import CallOutgoingNotification from "./CallOutgoingNotification";
import { SocketContext } from "../Context";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import CallIcon from "@material-ui/icons/Call";

const OptionsProvider = () => {
  const {
    me,
    callAccepted,
    name,
    setName,
    callUser,
    call,
    calling,
  } = useContext(SocketContext);
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
    <div className="d-sm-flex justify-content-between align-items-center">
      <div className="w-sm-50 w-100 separator py-sm-5">
        <div className="col-sm-8 mx-auto">
          <h4 className="options-heading grey-text text-center mb-5">
            Call a user by specifying their ID
          </h4>
          <form
            className="mx-2"
            onSubmit={(e) => {
              e.preventDefault();
              callUser(idToCall);
            }}
          >
            <div className="d-flex my-2">
              <input
                className="form-control mr-2"
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
            </div>
            <button type="submit" className="callButton">
              <CallIcon fontSize="small" style={{ margin: "0" }} /> Call User
            </button>

            <hr className="my-5" />
          </form>
        </div>
      </div>
      {/* <div className="d-none d-sm-block headerDivider p-5"></div> */}
      <div className="w-sm-50 w-100 text-center mb-5 mb-sm-0">
        <div className="col-sm-8 mx-auto">
          <h4 className="options-heading grey-text text-center mb-5">
            Copy your id and provide it to the person you are trying to
            communicate with
          </h4>
          <CopyToClipboard
            text={me}
            onCopy={() => {
              /* setCopied(true); */
              setIdAlertOpen(true);
            }}
          >
            <button className="callButton">
              <FileCopyIcon fontSize="small" /> Copy Your ID
            </button>
          </CopyToClipboard>
        </div>

        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={idAlertOpen}
          onClose={() => setIdAlertOpen(false)}
          message={`ID copied : ${me}`}
          key={vertical + horizontal}
        />
      </div>
      {calling && !callAccepted && (
        <CallOutgoingNotification
          modalOpen={callingModalOpen}
          setModalOpen={setCallingModalOpen}
          id={idToCall}
        />
      )}
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
