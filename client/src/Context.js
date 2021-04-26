import React, { createContext, useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [calling, setCalling] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [noCall, setNoCall] = useState(true);
  const [stream, setStream] = useState();
  const [userStream, setUserStream] = useState();
  const [callRejected, setCallRejected] = useState(false);
  const [name, setName] = useState("");
  const [call, setCall] = useState({});
  const [audioMuted, setAudioMuted] = useState(false);
  const [videoMuted, setVideoMuted] = useState(false);
  const [userAudioMuted, setUserAudioMuted] = useState(false);
  const [userVideoMuted, setUserVideoMuted] = useState(false);

  const [me, setMe] = useState({
    id: "",
    name: "",
  });
  const [nameOfCalledUser, setNameOfCalledUser] = useState("");
  const [idOfOtherUser, setIdOfOtherUser] = useState("");
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  const socket = useRef();

  useEffect(() => {
    socket.current = io.connect("/");

    getmyVideo();

    return () => {
      socket.current.emit("disconnect");

      socket.current.close();
    };
  }, []);
  useEffect(() => {
    socket.current.on("me", (id) => setMe({ ...me, id }));

    socket.current.on("callUser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, [me]);

  const answerCall = () => {
    setCallAccepted(true);
    setNoCall(false);
    const peer = new Peer({ initiator: false, trickle: false, stream });

    connectionRef.current = peer;

    peer.on("signal", (data) => {
      socket.current.emit("answerCall", {
        signal: data,
        to: call.from,
        myName: me.name,
      });
    });
    setIdOfOtherUser(call.from);
    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });
    peer.on("error", (err) => {
      leaveCall();
    });

    socket.current.on("close", () => {
      setCallEnded(true);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    });

    peer.signal(call.signal);
  };

  const callUser = (id) => {
    setCalling(true);
    setIdOfOtherUser(id);
    const peer = new Peer({ initiator: true, trickle: false, stream });
    connectionRef.current = peer;

    peer.on("signal", (data) => {
      socket.current.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me.id,
        name,
      });
    });
    peer.on("stream", (currentStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = currentStream;
      }
    });
    peer.on("error", (err) => {
      leaveCall();
    });

    socket.current.on("callAccepted", (signal, myName) => {
      setNameOfCalledUser(myName);
      peer.signal(signal);
      setNoCall(false);
      setCallAccepted(true);
    });
    socket.current.on("close", () => {
      setCallEnded(true);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    });

    socket.current.on("rejected", () => {
      setCallRejected(true);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    });

    socket.current.on("audioMuted", () => {
      setUserAudioMuted(!userAudioMuted);
    });
    socket.current.on("videoMuted", () => {
      setUserVideoMuted(!userVideoMuted);
    });
  };

  const leaveCall = () => {
    socket.current.emit("close", { to: idOfOtherUser });

    connectionRef.current.destroy();
    setCallEnded(true);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const rejectCall = () => {
    socket.current.emit("rejected", { to: idOfOtherUser });

    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const renderLanding = () => {
    if (!callAccepted && noCall) return "block";
    return "none";
  };

  const renderCall = () => {
    if (!callAccepted && noCall) return "none";
    return "block";
  };

  const getmyVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((thisStream) => {
        setStream(thisStream);
        if (myVideo.current) {
          myVideo.current.srcObject = thisStream;
        }
      });
  };

  const toggleMuteAudio = () => {
    if (stream) {
      setAudioMuted(!audioMuted);
      stream.getAudioTracks()[0].enabled = audioMuted;
      socket.current.emit("audioMuted", { to: idOfOtherUser });
    }
  };

  const toggleMuteVideo = () => {
    if (stream) {
      setVideoMuted(!videoMuted);
      stream.getVideoTracks()[0].enabled = videoMuted;
      socket.current.emit("videoMuted", { to: idOfOtherUser });
    }
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
        userVideo,
        nameOfCalledUser,
        setStream,
        userStream,
        renderLanding,
        renderCall,
        callRejected,
        setCallRejected,
        toggleMuteVideo,
        toggleMuteAudio,
        audioMuted,
        videoMuted,
        userAudioMuted,
        userVideoMuted,
        rejectCall,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
