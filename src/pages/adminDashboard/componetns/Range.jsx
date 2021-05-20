import React from "react";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";

const CustomSlider = withStyles({
  root: {
    color: "#10A5AD",
    height: 8
  },
  thumb: {
    backgroundColor: "#10A5AD"
  }
})(Slider);

function ValueLabelComponent({ children, open, value }) {
  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

function Range({
  type,
  range,
  label,
  step,
  defaultValue,
  setCombineRange,
  combineRange,
  selectRange,
  setSelectRange
}) {
  const handlerChange = (event, newValue) => {
    let val = newValue;
    if (newValue === 0) {
      val = null;
    }
    setCombineRange({ ...combineRange, [type]: val });

    if (newValue === 0) {
      setSelectRange(
        selectRange.filter(function(name) {
          return name !== type;
        })
      );
    } else {
      if (!selectRange.includes(type)) {
        setSelectRange([...selectRange, type]);
      }
    }
  };

  return (
    <div className={`range-wrapper`}>
      <Typography className={"range-title"} gutterBottom>
        {label}
      </Typography>
      <CustomSlider
        onChange={handlerChange}
        ValueLabelComponent={ValueLabelComponent}
        aria-label="custom thumb label"
        defaultValue={defaultValue}
        min={range.start}
        max={range.end}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        marks={[
          { value: range.start, label: range.start },
          { value: range.end, label: range.end }
        ]}
        step={step}
      />
    </div>
  );
}

export default Range;
