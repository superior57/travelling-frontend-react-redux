import React, { useState } from "react";
import onClickOutside from "react-onclickoutside";
import PropTypes from "prop-types";
import ArrowDown from "./ArrowDown";
import "./style.scss";

function Dropdown(props) {
  const { item, changeItem, list, type } = props;
  const [show, setShow] = useState(false);

  const change = value => {
    changeItem(value);
    setShow(false);
  };

  Dropdown.handleClickOutside = () => {
    setShow(false);
  };

  const onClickHandle = () => {
    setShow(!show);
  };

  return (
    <div
      className={`ignore-react-onclickoutside item ${show && "active"}`}
      onClick={onClickHandle}
    >
      <div className="item-input">
        <span className="item-input-text">
          {type === "object" ? item?.name : item}
        </span>
        <ArrowDown />
      </div>
      {show && (
        <ul className="item-menu">
          {type === "object" &&
            list &&
            list.map((item, i) => (
              <li
                className="item-menu-li"
                onMouseDown={() => change(item)}
                key={`event_${i}`}
              >
                <span>{item.name}</span>
              </li>
            ))}
          {type !== "object" &&
            list &&
            list.map((item, i) => (
              <li
                className="item-menu-li"
                onMouseDown={() => change(item)}
                key={`event_${i}`}
              >
                <span>{item}</span>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

Dropdown.propTypes = {
  item: PropTypes.string,
  changeItem: PropTypes.func,
  list: PropTypes.array
};

const clickOutsideConfig = {
  handleClickOutside: () => Dropdown.handleClickOutside
};

export default onClickOutside(Dropdown, clickOutsideConfig);
