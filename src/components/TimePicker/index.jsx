import React from "react";
import TimeKeeper from "react-timekeeper";
import PropTypes from "prop-types";
import "./style.scss";
import moment from "moment";
import arrowDownPng from "./assets/check-box.png";
import onClickOutside from "react-onclickoutside";
import styled from "styled-components";
import { Label } from "reactstrap";

const LabelStyled = styled(Label)`
  font-family: Inter;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 13px;
`;

class TimePicker extends React.Component {
  handleClickOutside = () => {
    if (!this.props.multiPicker && this.props.showTime) {
      this.props.setShowTime(false);
    }
  };

  handleSDoneClick = newTime => {
    this.props.setSTime(newTime.formatted24);
    this.props.setShowSTime(false);
  };

  handleEDoneClick = newTime => {
    this.props.setETime(newTime.formatted24);
    this.props.setShowETime(false);
  };

  render() {
    const {
      text,
      id,
      classes,
      startTime,
      setSTime,
      showSTime,
      setShowSTime,
      endTime,
      setETime,
      showETime,
      setShowETime,
      timeSlot
    } = this.props;

    return !timeSlot ? (
      <div className={`timekeeper ${classes}`}>
        <label className="top_form__form-groop-label">{text}</label>

        <div className={`timekeeper-btn`}>
          <div className={"timekeeper-time"} onClick={() => setShowSTime(true)}>
            <label>From</label>
            {moment(startTime, "H:mm").format("hh:mm a")}
          </div>

          <div className={"timekeeper-time"} onClick={() => setShowETime(true)}>
            <label>To</label>
            {moment(endTime, "H:mm").format("hh:mm a")}
          </div>

          <img src={arrowDownPng} alt="arrow-down" />
        </div>

        {showSTime && (
          <div className="timekeeper-modal">
            <TimeKeeper
              time={startTime}
              onDoneClick={newTime => this.handleSDoneClick(newTime)}
              switchToMinuteOnHourSelect
            />
          </div>
        )}

        {showETime && (
          <div className="timekeeper-modal">
            <TimeKeeper
              time={endTime}
              onDoneClick={newTime => this.handleEDoneClick(newTime)}
              switchToMinuteOnHourSelect
            />
          </div>
        )}

        {/*<div*/}
        {/*  className={`${classes} timekeeper-btn timekeeper-btn--${id}`}*/}
        {/*  onClick={this.props.handlerSlot}*/}
        {/*>*/}
        {/*  <>*/}
        {/*    {moment(time, "H:mm").format("hh:mm a")}*/}
        {/*    <img src={arrowDownPng} alt="arrow-down" />*/}
        {/*  </>*/}
        {/*</div>*/}
      </div>
    ) : (
      <></>
    );
  }
}

export default onClickOutside(TimePicker);

TimePicker.propType = {
  time: PropTypes.string,
  setTime: PropTypes.func
};
