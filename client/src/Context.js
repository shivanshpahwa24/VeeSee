import React, { createContext, useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();

let ENDPOINT;

if (process.env.NODE_ENV === "development") {
  ENDPOINT = "http://localhost:5000";
}

if (process.env.NODE_ENV === "production") {
  ENDPOINT = "https://veesee.herokuapp.com/";
}

const socket = io(ENDPOINT);

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [calling, setCalling] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [userStream, setUserStream] = useState();

  const [name, setName] = useState("");
  const [call, setCall] = useState({});
  const [me, setMe] = useState({
    id: "",
    name: "",
  });
  const [nameOfCalledUser, setNameOfCalledUser] = useState("");
  const myVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    socket.on("me", (id) => setMe({ ...me, id }));

    socket.on("callUser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, [me]);

  const answerCall = () => {
    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answerCall", {
        signal: data,
        to: call.from,
        myName: me.name,
      });
    });

    peer.on("stream", (currentStream) => {
      setUserStream(currentStream);
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
    setCallAccepted(true);
  };

  const callUser = (id) => {
    setCalling(true);
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me.id,
        name,
      });
    });
    peer.on("stream", (currentStream) => {
      setUserStream(currentStream);
    });
    socket.on("callAccepted", (signal, myName) => {
      setNameOfCalledUser(myName);
      peer.signal(signal);
      setCallAccepted(true);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    connectionRef.current.destroy();
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        stream,
        name,
        setName,
        callEnded,
        setCallEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
        calling,
        setCalling,
        setMe,
        nameOfCalledUser,
        setStream,
        userStream,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
