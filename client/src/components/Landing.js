import React from "react";
import Navbar from "./Navbar";

const Landing = () => {
  return (
    <div>
      <Navbar />
      <div className="landing-text">
        <h1 className="font-weight-normal">
          Premium video meetings.
          <br />
          Now free for everyone.
        </h1>
        <p className="grey-text">
          We re-engineered the service we built for secure business meetings,
          VeeSee, to make it free and available for all.
        </p>
      </div>
      <div></div>
    </div>
  );
};
export default Landing;
