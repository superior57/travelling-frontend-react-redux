import React, { Component } from "react";
import moment from "moment";
import "./style.scss";
import { DaySlots } from "./DaySlots";

export default class TimeSlots extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newStartTime: "",
      newEndTime: "",
      newStartTimeFirstDay: "",
      newEndTimeFirstDay: "",
      newStartTimeEndDay: "",
      newEndTimeEndDay: "",
      timeSlotsError: false
    };
  }

  onConfirmTime = (newStartTime, newEndTime, day) => {
    if (newStartTime == "empty") {
      this.setState({ timeSlotsError: true });
      return false;
    }

    let overlapTimeSlots =
      this.props.timeException[day]?.time.filter(
        e =>
          (moment(e.startTime, "H:mm:ss").format() >=
            moment(newStartTime).format() &&
            moment(e.startTime, "H:mm:ss").format() <=
              moment(newEndTime).format()) ||
          (moment(e.endTime, "H:mm:ss").format() >=
            moment(newStartTime).format() &&
            moment(e.endTime, "H:mm:ss").format() <=
              moment(newEndTime).format()) ||
          (moment(e.startTime, "H:mm:ss").format() <=
            moment(newStartTime).format() &&
            moment(e.endTime, "H:mm:ss").format() >=
              moment(newEndTime).format())
      ).length > 0;

    if (newStartTime > newEndTime || overlapTimeSlots) {
      this.setState({ timeSlotsError: true });
      return false;
    }
    if (this.state.timeSlotsError) this.setState({ timeSlotsError: false });
    this.props.setSTime(moment(newStartTime).format("H:mm"));
    this.props.setETime(moment(newEndTime).format("H:mm"));
    this.props.setShowTimeSlots(false);
  };
  onConfirmTimeTwoDays = (newStartTimeFirstDay, newEndTimeEndDay) => {
    let { timeException } = this.props;
    if (!newStartTimeFirstDay || newStartTimeFirstDay === "empty") {
      this.onConfirmTime(newStartTimeFirstDay, newEndTimeEndDay, 0);
      this.props.onChangeDay(0);
    }

    if (
      timeException[0].time.filter(
        e =>
          moment(e.endTime, "H:mm:ss").format() >=
          moment(newStartTimeFirstDay).format()
      ).length > 0 ||
      timeException[1].time.filter(
        e =>
          moment(e.startTime, "H:mm:ss").format() <=
          moment(newEndTimeEndDay).format()
      ).length > 0
    ) {
      this.setState({ timeSlotsError: true });
      return false;
    }

    if (this.state.timeSlotsError) this.setState({ timeSlotsError: false });

    this.props.setSTime(moment(newStartTimeFirstDay).format("H:mm"));
    this.props.setETime(moment(newEndTimeEndDay).format("H:mm"));

    this.props.setShowTimeSlots(false);
  };

  changeStartTime = newStartTime => {
    this.setState({ newStartTime });
  };
  changeStartTimeFirstDay = newStartTime => {
    this.setState({ newStartTimeFirstDay: newStartTime });
  };
  changeEndTime = newEndTime => {
    this.setState({ newEndTime });
  };

  render() {
    let {
      text,
      timeException,
      startTime,
      endTime,
      operationTime,
      sameDay
    } = this.props;
    startTime = moment(startTime, "H:mm").format();
    endTime = moment(endTime, "H:mm").format();
    let { timeSlotsError, newStartTime, newEndTime } = this.state;
    return (
      <div className="timeChoice">
        <h4 className="timeChoice__title">{text}</h4>

        {sameDay && (
          <div className="timeChoice__timeSlots">
            <div className="timeChoice__day">
              <div className="timeChoice__date">
                {moment(timeException[0]?.date).format("L")}
              </div>
              <DaySlots
                timeException={timeException[0]?.time}
                beginLimit={operationTime[0]?.start}
                endLimit={operationTime[0]?.end}
                startTime={startTime}
                endTime={endTime}
                onChangeStartTime={newStartTime =>
                  this.changeStartTime(newStartTime)
                }
                onChangeEndTime={newEndTime => this.changeEndTime(newEndTime)}
              />
            </div>
          </div>
        )}
        {!sameDay && (
          <div className="timeChoice__timeSlots">
            <div className="timeChoice__day">
              <div className="timeChoice__date">
                {moment(timeException[0]?.date).format("L")}
              </div>
              <DaySlots
                startPoint={true}
                timeException={timeException[0]?.time}
                beginLimit={operationTime[0]?.start}
                endLimit={operationTime[0]?.end}
                startTime={startTime}
                endTime={operationTime[0]?.end}
                onChangeStartTime={newStartTime =>
                  this.changeStartTime(newStartTime)
                }
                onChangeEndTime={newEndTime => this.changeEndTime(newEndTime)}
                sameDay={sameDay}
              />
            </div>
            <div className="timeChoice__day">
              <div className="timeChoice__date">
                {moment(timeException[1]?.date).format("L")}
              </div>
              <DaySlots
                endPoint={true}
                timeException={timeException[1]?.time}
                beginLimit={operationTime[1]?.start}
                endLimit={operationTime[1]?.end}
                startTime={operationTime[1]?.start}
                endTime={endTime}
                onChangeEndTime={newEndTime => this.changeEndTime(newEndTime)}
                onChangeStartTime={newStartTime =>
                  this.changeStartTime(newStartTime)
                }
                sameDay={sameDay}
              />
            </div>
          </div>
        )}

        <div className="timeChoice__error">
          {timeSlotsError && (
            <div>
              Please choose time diapason from available (green colored)
            </div>
          )}
        </div>
        <button
          type="button"
          className="timeChoice__confirm"
          onClick={
            this.props.sameDay
              ? () => this.onConfirmTime(newStartTime, newEndTime, 0)
              : () => this.onConfirmTimeTwoDays(newStartTime, newEndTime)
          }
        >
          Confirm
        </button>
      </div>
    );
  }
}
