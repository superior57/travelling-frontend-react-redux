import TextField from "@material-ui/core/TextField";
import NumberFormat from "react-number-format";

import React, { useState } from "react";

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            name: props.name,
            value: values.value
          }
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
}

function CustomInput({ type, customInput, handlerFilterChange }) {
  const [active, setActive] = useState(false);
  const handleChange = ({ target }) => {
    handlerFilterChange(target.value, type);
    setActive(Boolean(target.value.trim()) || false);
  };

  return (
    <div className={`filter-input ${active && "active"}`}>
      <TextField
        onChange={handleChange}
        placeholder={"Input price ($)"}
        name="price"
        id="formatted-numberformat-input"
        InputProps={{
          disableUnderline: true,
          inputComponent: NumberFormatCustom
        }}
      />
    </div>
  );
}

export default CustomInput;
