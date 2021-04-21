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
  const answerCall = () => {};

  const callUser = () => {};

  const leaveCall = () => {};
};
