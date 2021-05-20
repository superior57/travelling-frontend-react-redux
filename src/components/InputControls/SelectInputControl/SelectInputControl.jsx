import React, { useState } from "react";
import PropTypes from "prop-types";

import Input from "../../Filter/Input";
import onClickOutside from "react-onclickoutside";
import "./style.scss";

function SelectInputControl({
  label,
  placeHolder,
  value,
  selectOptions,
  onDropDownChange
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const fontColor = value ? "black" : "#99979cb3";

  const onSelectionChange = newValue => {
    onDropDownChange(newValue);
    setSelectedValue(newValue);
    setShowDropdown(false);
  };

  SelectInputControl.handleClickOutside = () => setShowDropdown(false);

  return (
    <div className="selectInput" onClick={() => setShowDropdown(!showDropdown)}>
      <div className="selectInput-label">{label}</div>
      <Input>
        <span style={{ color: fontColor }} className="selectInput-text">
          {selectedValue ? selectedValue : placeHolder}
        </span>
      </Input>
      {showDropdown && (
        <ul className="selectInput-menu">
          {[...selectOptions].map((option, index) => {
            return (
              <li
                key={index}
                className="selectInput-menu-li"
                onClick={() => onSelectionChange(option)}
              >
                <span>{option}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

const clickOutsideConfig = {
  handleClickOutside: () => SelectInputControl.handleClickOutside
};

SelectInputControl.propTypes = {
  label: PropTypes.string,
  placeHolder: PropTypes.string,
  value: PropTypes.string,
  selectOptions: PropTypes.array,
  onDropDownChange: PropTypes.func
};

export default onClickOutside(SelectInputControl, () => clickOutsideConfig);
