import React from "react";
import OptionsProvider from "./OptionsProvider";

const Landing = () => {
  return (
    <div className="container-fluid">
      <div className="landing-text text-center mx-auto">
        <h1>Remote connection with your team</h1>
        <p className="grey-text">
          Work together in ways that go beyond with easy video from anywhere
        </p>
      </div>
      <OptionsProvider />
    </div>
  );
};
export default Landing;
