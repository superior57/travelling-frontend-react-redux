import React, { useState } from "react";
import onClickOutside from "react-onclickoutside";
import PropTypes from "prop-types";
import ArrowDown from "./ArrowDown";
import "./style.scss";

function CustomDropdown(props) {
  const {
    item,
    changeItem,
    list,
    type,
    openStatus,
    customRef,
    classes
  } = props;

  const change = value => {
    changeItem(value);
    openStatus({ value: customRef, status: false });
    props.onClickHandle();
  };

  CustomDropdown.handleClickOutside = () => {
    props.onClickHandleOutside();
  };

  return (
    <div
      className={`ignore-react-onclickoutside ${classes} item ${props.status &&
        "active"}`}
      onClick={() => props.onClickHandle()}
    >
      <div className="item-input">
        <span className="item-input-text">
          {type === "object" ? item?.value || item?.name : item}
        </span>
        <ArrowDown />
      </div>
      {props.status && (
        <ul className="item-menu-custom">
          {type === "object" &&
            list &&
            list.map((item, i) => (
              <li
                className="item-menu-li"
                onMouseDown={() => change(item)}
                key={`event_${i}`}
              >
                <span>{item.value || item.name}</span>
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
                <span className="item-menu-li-pi">{item}</span>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

CustomDropdown.propTypes = {
  item: PropTypes.string,
  changeItem: PropTypes.func,
  list: PropTypes.array
};

const clickOutsideConfig = {
  handleClickOutside: () => CustomDropdown.handleClickOutside
};

export default onClickOutside(CustomDropdown, clickOutsideConfig);
