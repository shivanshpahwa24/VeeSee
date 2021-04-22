import React from "react";
import Sidebar from "./Sidebar";

const Landing = () => {
  return (
    <div className="container text-center mx-auto">
      <div className="landing-text">
        <h1>Remote connection with your team</h1>
        <p className="grey-text">
          Work together in ways that go beyond with easy video from anywhere
        </p>
      </div>
      <Sidebar />
    </div>
  );
};
export default Landing;
