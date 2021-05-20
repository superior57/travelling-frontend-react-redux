import React, { useState } from "react";
import PropTypes from "prop-types";

import "./style.scss";

function InputControl({
  label,
  placeHolder,
  value,
  onTextChange,
  type,
  min,
  max
}) {
  const onInputChange = value => {
    onTextChange(value);
  };

  return (
    <div className="input-control">
      <div className="input-control-label">{label}</div>
      <input
        min={min}
        max={max}
        type={type}
        className="inputfield"
        onChange={onInputChange}
        value={value}
        placeholder={placeHolder}
      />
    </div>
  );
}

InputControl.propTypes = {
  label: PropTypes.string,
  placeHolder: PropTypes.string,
  value: PropTypes.string
};

export default InputControl;
