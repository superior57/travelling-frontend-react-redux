import React from "react";
import TimeKeeper from "react-timekeeper";
import PropTypes from "prop-types";
import moment from "moment";
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

class CommonTimePiker extends React.Component {
  handleClickOutside = () => {
    if (!this.props.multiPicker && this.props.showTime) {
      this.props.setShowTime(false);
    }
  };

  handleDoneClick = newTime => {
    this.props.setTime(newTime.formatted24);
    this.props.setShowTime(false);
  };

  render() {
    const { time, showTime, setShowTime, text, id, classes } = this.props;

    return (
      <div className={`timekeeper ${classes}`}>
        <LabelStyled>{text}</LabelStyled>
        {/*{showTime && (*/}
        {/*  <div className="timekeeper-modal">*/}
        {/*    <TimeKeeper*/}
        {/*      time={time}*/}
        {/*      onDoneClick={newTime => this.handleDoneClick(newTime)}*/}
        {/*      switchToMinuteOnHourSelect*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*)}*/}
        {/*{!showTime && (*/}
        {/*  <div*/}
        {/*    className={`${classes} timekeeper-btn timekeeper-btn--${id}`}*/}
        {/*    onClick={() => setShowTime(true)}*/}
        {/*  >*/}
        {/*    {moment(time, "H:mm").format("hh:mm a")}*/}
        {/*    <img src={arrowDownPng} alt="arrow-down" />*/}
        {/*  </div>*/}
        {/*)}*/}

        {/*{showTime && (*/}
        {/*  <div className="timekeeper-modal">*/}
        {/*    <TimeKeeper*/}
        {/*      time={time}*/}
        {/*      onDoneClick={newTime => this.handleDoneClick(newTime)}*/}
        {/*      switchToMinuteOnHourSelect*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*)}*/}

        <div
          className={`${classes} timekeeper-btn timekeeper-btn--${id}`}
          onClick={this.props.handlerSlot}
        >
          {moment(time, "H:mm").format("hh:mm a")}
        </div>
      </div>
    );
  }
}

export default onClickOutside(CommonTimePiker);
