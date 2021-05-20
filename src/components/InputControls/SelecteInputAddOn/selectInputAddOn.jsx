import React from "react";
import Dropdown from "../../Dropdown";

import "./style.scss";

const SelectInputAddOn = prop => {
  const {
    label,
    placeHolder,
    value,
    onTextChange,
    onDropDownChange,
    onCurrencyDropDownChange,
    item,
    listOfItem,
    RateItem,
    listOfAllRates
  } = prop;
  const onInputChange = value => {
    onTextChange(value);
  };

  const dropDownChange = value => {
    // console.log("DropDown Values -->", value);
    onDropDownChange(value);
  };

  const dropDownChangeCurrency = currency => {
    onCurrencyDropDownChange(currency);
  };
  return (
    <div className="input-control">
      <div className="input-control-label">{label}</div>
      <div className="addOnDdlWrapper">
        <input
          className="inputfield"
          onChange={onInputChange}
          value={value}
          placeholder={placeHolder}
        ></input>
        <Dropdown
          className="addOnDdl"
          changeItem={dropDownChangeCurrency}
          item={RateItem}
          list={listOfAllRates}
        ></Dropdown>
        <Dropdown
          className="addOnDdl"
          changeItem={dropDownChange}
          item={item}
          list={listOfItem}
        ></Dropdown>
      </div>
    </div>
  );
};
export default SelectInputAddOn;
