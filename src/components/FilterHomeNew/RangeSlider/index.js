import React from "react";
import { Range } from "rc-slider";
import "rc-slider/assets/index.css";

import "./styles.scss";

class RangeSlider extends React.Component {
  render() {
    const {
      validMax,
      title,
      max,
      min,
      currentValue,
      handleRangeChange,
      type,
      handleInputChangeMin,
      handleInputChangeMax
    } = this.props;
    return (
      <div className="range-slider">
        <div className="range-slider__title">{title}</div>
        <div className="range-slider__input">
          <Range
            onChange={value => handleRangeChange(type, value)}
            value={currentValue}
            min={min}
            max={max}
          />
        </div>
        <div className="range-slider__values">
          <div className="range-slider__value range-slider__value_min">
            <input
              className="range-slider__value-input"
              type="text"
              value={currentValue[0]}
              onChange={evt => handleInputChangeMin(evt, type)}
            />
          </div>
          <div className={`range-slider__value ${validMax ? "" : "error"}`}>
            <input
              className="range-slider__value-input"
              type="text"
              value={currentValue[1]}
              onChange={evt => handleInputChangeMax(evt, type)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default RangeSlider;
