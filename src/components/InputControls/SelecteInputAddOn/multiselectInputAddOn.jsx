import React from "react";
// import Dropdown from "../../Dropdown";
import CustomDropdown from "../../Dropdown/CustomDropdown";
import "./style.scss";

const MultiselectInputAddOn = prop => {
  const {
    label,
    placeHolder,
    value,
    onTextChange,
    onDropDownChange,
    onCurrencyDropDownChange,
    item,
    listOfItem,
    openStatus,
    enableThroughPropChargeType,
    chargeTypeOnClickHandleOutside,
    chargeTypeOnClickHandle,
    chargeTypeStatus,
    classes,

    list,
    currency,
    rateStatus,
    getCountry,
    changeItemRateType,
    onClickHandleOutside,
    onClickHandle
  } = prop;
  const onInputChange = value => {
    onTextChange(value);
  };

  const dropDownChange = value => {
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
          type={"number"}
          className="inputfield rates"
          onChange={onInputChange}
          value={value}
          placeholder={placeHolder}
        ></input>
        <CustomDropdown
          changeItem={changeItemRateType}
          item={currency}
          list={list}
          type={"array"} //array
          status={rateStatus}
          customRef="rateType"
          openStatus={openStatus}
          onClickHandleOutside={onClickHandleOutside}
          onClickHandle={onClickHandle}
          enableThroughProp={false}
        />
        <CustomDropdown
          classes={classes}
          changeItem={dropDownChange}
          item={item}
          list={listOfItem}
          customRef="chargeType"
          openStatus={openStatus}
          enableThroughProp={enableThroughPropChargeType}
          onClickHandleOutside={chargeTypeOnClickHandleOutside}
          onClickHandle={chargeTypeOnClickHandle}
          status={chargeTypeStatus}
        ></CustomDropdown>
      </div>
    </div>
  );
};
export default MultiselectInputAddOn;
