import React, { useState, useContext } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Snackbar from "@material-ui/core/Snackbar";
import CallReceivingNotification from "./CallReceivingNotification";
import CallOutgoingNotification from "./CallOutgoingNotification";
import CallEndedNotification from "./CallEndedNotification";
import CallRejectedNotification from "./CallRejectedNotification";
import { SocketContext } from "../Context";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import VideoCallIcon from "@material-ui/icons/VideoCall";

const OptionsProvider = () => {
  const {
    me,
    callAccepted,
    callRejected,
    name,
    setName,
    callUser,
    callEnded,
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
    <div className="d-sm-flex justify-content-between">
      <div className="w-sm-50 w-100 separator py-sm-5 ">
        <div className="col-sm-8 mx-auto">
          <h4 className="options-heading grey-text text-center pb-5">
            Call a user by specifying their ID
          </h4>
          <form
            className="mx-2 mb-5 mb-sm-0"
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

            {/*  <hr className="my-5" /> */}
          </form>
        </div>
      </div>
      <div className="w-sm-50 w-100 pb-5 py-sm-5 mt-5 mt-sm-0">
        <div className="col-sm-8 d-flex flex-column justify-content-center align-items-center mx-auto">
          <h4 className="options-heading grey-text text-center mb-5">
            Share your id with the user you wish to communicate with
            {/* Enter your name and then copy your id to provide it to the person
            you are trying to communicate with */}
          </h4>
          <div className="options">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setMe({ ...me, name: nameForCall });
                setIdAlertOpen(true);
                setInterval(() => {
                  setIdAlertOpen(false);
                }, 5000);
              }}
              className="form-inline"
            >
              <input
                className="form-control mr-lg-1"
                name="nameForCall"
                placeholder="Enter your name"
                value={nameForCall}
                onChange={(e) => setNameForCall(e.target.value)}
                id="nameForCall"
                type="text"
                required
              />
              {/* Enter your name and then copy your id to provide 
              it to the person you are trying to communicate with */}
              <CopyToClipboard text={me.id}>
                <button
                  type="submit"
                  className="callButton ml-lg-1 mt-lg-0 mt-2"
                >
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
      {calling && !callAccepted && !callRejected && (
        <CallOutgoingNotification
          modalOpen={callingModalOpen}
          setModalOpen={setCallingModalOpen}
          id={idToCall}
        />
      )}
      {callRejected && (
        <CallRejectedNotification
          modalOpen={callingModalOpen}
          setModalOpen={setCallingModalOpen}
        />
      )}
      {call.isReceivingCall && !callAccepted && (
        <CallReceivingNotification
          modalOpen={receivingModalOpen}
          setModalOpen={setReceivingModalOpen}
        />
      )}
      {callEnded && (
        <CallEndedNotification
          modalOpen={receivingModalOpen}
          setModalOpen={setReceivingModalOpen}
        />
      )}
    </div>
  );
};

export default OptionsProvider;
