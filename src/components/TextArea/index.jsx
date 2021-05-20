import React from "react";

const TextAreaControl = (prop) => {
  const { label, value, changeText, placeHolder } = prop;

  const change = (value) => {
    changeText(value);
  };

  return (
    <div className="input-control">
      <div className="input-control-label">{label}</div>
      <textarea className="form-control" rows="5" onChange={change} value={value} placeholder={placeHolder} />
    </div>
  );
};

export default TextAreaControl;
