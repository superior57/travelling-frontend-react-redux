import React from "react";
import PropTypes from "prop-types";
// import avatrPng from './assets/avatar.png';
import avatrPng from "./assets/rick.jpeg";
import "./style.scss";

export default function Avatar(props) {
  return (
    <div className="avatar">
      <img
        src={props.image}
        alt="avatar"
        className={props.account ? "account-avatar" : "avatar-img"}
        width={props.width}
        height={props.height}
      ></img>
    </div>
  );
}

Avatar.propTypes = {
  href: PropTypes.string
};
