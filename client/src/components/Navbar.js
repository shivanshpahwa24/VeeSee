import React from "react";
import Logo from "../assets/logo.png";
import moment from "moment";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const date = moment().format("ddd, MMM Do");
const time = moment().format("h:mm a");

const Navbar = () => {
  return (
    <div className="navbar shadow px-3">
      <img className="navbar-logo" src={Logo} alt="" />
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
