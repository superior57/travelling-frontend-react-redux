import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import AirbnbRangeDatesPicker from "../styledComp/AirbnbRangeDatesPicker";
import TimePiker from "../TimePicker";
import "./style.scss";

export default class DateTimePiker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: props.startDate ? moment(props.startDate) : moment(),
      endDate: props.endDate ? moment(props.endDate) : moment().add(1, "days"),
      startTime: props.startDate
        ? moment(props.startDate).format("HH:mm")
        : "00:00",
      endTime: props.endDate ? moment(props.endDate).format("HH:mm") : "23:59",
      showSTime: false,
      showETime: false,
      dateError: false
    };
  }

  handleClickOutside = evt => {
    if (this.state.showSTime || this.state.showETime) {
      this.setState({
        showSTime: false,
        showETime: false
      });
    }
  };

  liftUpDates = (startDate, endDate) => {
    this.setState({
      startDate,
      endDate,
      dateError: true
    });
    this.props.checkValid(false);
  };

  changeSTime(newTime) {
    this.setState(prevState => ({ startTime: newTime }));
  }

  changeETime(newTime) {
    this.setState(prevState => ({ endTime: newTime }));
  }

  changeShowSTime(value) {
    if (!this.state.showETime) {
      this.setState(prevState => ({ showSTime: value }));
    }
  }

  changeShowETime(value) {
    if (!this.state.showSTime) {
      this.setState(prevState => ({ showETime: value }));
    }
  }

  formatDateTime() {
    const startDateSec = this.state.startDate / 1000;
    const endDateSec = this.state.endDate / 1000;

    const startDateTime = moment.unix(startDateSec);
    const endDateTime = moment.unix(endDateSec);

    const startTime = moment(this.state.startTime, "HH:mm");
    const endTime = moment(this.state.endTime, "HH:mm");

    const startDate = startDateTime
      .clone()
      .set({ hour: startTime.hours(), minute: startTime.minutes() })
      .toISOString();
    const endDate = endDateTime
      .clone()
      .set({ hour: endTime.hours(), minute: endTime.minutes() })
      .toISOString();
    return { startDate, endDate };
  }

  sendResult() {
    this.props.setDateTime(this.formatDateTime());
  }
  clear() {
    this.props.setDateTime({ startDate: null, endDate: null });
  }
  render() {
    const {
      startTime,
      endTime,
      showSTime,
      showETime,
      startDate,
      endDate
    } = this.state;
    return (
      <div className="dateTime">
        <AirbnbRangeDatesPicker
          startDate={startDate || ""}
          endDate={endDate || ""}
          liftUpDates={this.liftUpDates}
          mobileType={this.props.mobileType}
        />

        <div className="startBooking-content-time">
          <TimePiker
            text={"select time"}
            startTime={startTime}
            setSTime={value => this.changeSTime(value)}
            showSTime={showSTime}
            setShowSTime={value => this.changeShowSTime(value)}
            endTime={endTime}
            setETime={value => this.changeETime(value)}
            showETime={showETime}
            setShowETime={value => this.changeShowETime(value)}
          />
        </div>
        <div className="dateTime-btn">
          <button
            className="dateTime-btn-search"
            onClick={() => this.sendResult()}
          >
            set date
          </button>

          <button
            className="dateTime-btn-search clear"
            onClick={() => this.clear()}
          >
            clear
          </button>
        </div>
      </div>
    );
  }
}

DateTimePiker.propTypes = {
  serDateTime: PropTypes.func
};
