import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Snackbar from "@material-ui/core/Snackbar";
import CallReceivingNotification from "./CallReceivingNotification";
import CallOutgoingNotification from "./CallOutgoingNotification";
import { SocketContext } from "../Context";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import VideoCallIcon from "@material-ui/icons/VideoCall";

const OptionsProvider = () => {
  const {
    me,
    callAccepted,
    name,
    setName,
    callUser,
    call,
    calling,
    setMe,
  } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState("");
  const [nameForCall, setNameForCall] = useState("");
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
          <h4 className="options-heading grey-text text-center pb-5">
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
              <VideoCallIcon fontSize="small" style={{ margin: "0" }} /> Call
              User
            </button>

            <hr className="my-5" />
          </form>
        </div>
      </div>
      {/* <div className="d-none d-sm-block headerDivider p-5"></div> */}
      <div className="w-sm-50 w-100 pb-5 pb-sm-0">
        <div className="col-sm-8 d-flex flex-column justify-content-center align-items-center">
          <h4 className="options-heading grey-text text-center mb-5">
            Enter your name and then copy your id to provide it to the person
            you are trying to communicate with
          </h4>
          <div className="options">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setMe({ ...me, name: nameForCall });
                setIdAlertOpen(true);
              }}
              className="form-inline"
            >
              <input
                className="form-control mr-1"
                name="nameForCall"
                placeholder="Enter your name"
                value={nameForCall}
                onChange={(e) => setNameForCall(e.target.value)}
                id="nameForCall"
                type="text"
                required
              />
              <CopyToClipboard
                text={me.id}
                /* onCopy={() => {
                  setIdAlertOpen(true);
                }} */
              >
                <button type="submit" className="callButton ml-1">
                  <FileCopyIcon fontSize="small" /> Copy Your ID
                </button>
              </CopyToClipboard>
            </form>
          </div>
        </div>

        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={idAlertOpen}
          onClose={() => setIdAlertOpen(false)}
          message={`ID copied : ${me.id}`}
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
