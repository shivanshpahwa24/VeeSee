import React, { useContext } from "react";
import "./App.css";
import Landing from "./components/Landing";
import VideoPlayer from "./components/VideoPlayer";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import { SocketContext } from "./Context";

const App = () => {
  const { renderLanding, renderCall } = useContext(SocketContext);
  return (
    <>
      <Navbar />
      <div style={{ display: renderLanding() }}>
        <Landing />
      </div>
      <div style={{ display: renderCall() }}>
        <VideoPlayer />
      </div>
    </>
  );
};

export default App;
