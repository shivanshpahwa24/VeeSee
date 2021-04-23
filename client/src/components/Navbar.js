import React, { useState, useEffect } from "react";
import Logo from "../assets/logo.png";
import moment from "moment";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const Navbar = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  useEffect(() => {
    //For updating time as it changes
    setDate(moment().format("ddd, MMM Do"));
    setTime(moment().format("h:mm a"));
  }, []);

  return (
    <div className="navbar shadow px-3">
      <div>
        <img className="navbar-logo" src={Logo} alt="" />
      </div>
      <div className="navbar-date-format">
        <span>
          {time}
          <span className="m-1">&#183;</span>
          {date}
        </span>
        <AccountCircleIcon className="ml-3" fontSize="large" />
      </div>
    </div>
  );
};

export default Navbar;
