import React, { useState } from "react";
import Input from "../Input";
import onClickOutside from "react-onclickoutside";

import "./style.scss";

function Attendees({ changeState, type }) {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("Wedding, Business meeting, Party etc.");
  const fontColor =
    value !== "Wedding, Business meeting, Party etc." ? "black" : "#99979cb3";
  const change = value => {
    changeState(value);
    setValue(value);
    setShow(false);
  };

  const toggleModal = () => {
    setShow(!show);
  };

  Attendees.handleClickOutside = evt => {
    setShow(false);
  };

  return (
    <div className="attendees" onClick={toggleModal}>
      <Input>
        <span style={{ color: fontColor }} className={type !== 'home' ? 'attendees-text' : ''}>
          {value}
        </span>
      </Input>
      {show && (
        <ul className="attendees-menu">
          <li className="attendees-menu-li" onClick={() => change("Wedding")}>
            <span>Wedding</span>
          </li>
          <li
            className="attendees-menu-li"
            onClick={() => change("Business meeting")}
          >
            <span>Business meeting</span>
          </li>
          <li className="attendees-menu-li" onClick={() => change("Party")}>
            <span>Party</span>
          </li>
        </ul>
      )}
    </div>
  );
}

const clickOutsideConfig = {
  handleClickOutside: () => Attendees.handleClickOutside
};

export default onClickOutside(Attendees, clickOutsideConfig);
