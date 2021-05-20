import React, { useState, useEffect } from "react";
import moment from "moment";
import { connect } from "react-redux";
import {
  chosenNewSlots,
  chosenNewPositions,
  setChosenDate
} from "../../../../redux/actions/booking.actions/booking.actions";
import useOnclickOutside from "react-cool-onclickoutside";
import "./style.scss";

const Slots = ({
  slotList,
  chosenNewSlots,
  newPositions,
  chosenNewPositions,
  chosenSlotList,
  handlerTimeSlot,
  setChosenDate,
  showTimeSlots
}) => {
  const [startTimeSlots, setStartTimeSlots] = useState([]);

  const [newStartTimeSlots, setNewStartTimeSlots] = useState([]);
  const [endTimeSlots, setEndTimeSlots] = useState([]);
  const [timeSlotsError, setTimeSlotsError] = useState(false);
  const [startSlotPosition, setStartSlotPosition] = useState(null);
  const [endSlotPosition, setEndSlotPosition] = useState(null);

  const [startDayForbidden, setStartDayForbidden] = useState(false);
  const [endDayForbidden, setEndDayForbidden] = useState(false);

  const ref = useOnclickOutside(() => {
    if (showTimeSlots) {
      handlerTimeSlot(false);
      setTimeSlotsError(false);
    }
  });

  useEffect(() => {
    if (chosenSlotList) {
      setDataTime(null, null, "endDay", chosenSlotList.endTimeSlots);
      setDataTime(null, null, "startDay", chosenSlotList.newStartTimeSlots);
    } else if (slotList && slotList.operationHours) {
      if (
        slotList.operationHours.endDay.end === "00:00:00" &&
        slotList.operationHours.endDay.start === "00:00:00"
      ) {
        setEndDayForbidden(true);
      }
      if (
        slotList.operationHours.startDay.end === "00:00:00" &&
        slotList.operationHours.startDay.start === "00:00:00"
      ) {
        setStartDayForbidden(true);
      }

      if (
        slotList.operationHours.endDay.day !==
        slotList.operationHours.startDay.day
      ) {
        setDataTime(
          slotList.operationHours.endDay,
          slotList.exceptions?.endDay,
          "endDay"
        );
      }
      setDataTime(
        slotList.operationHours.startDay,
        slotList.exceptions?.startDay,
        "startDay"
      );
    }
  }, [slotList]);

  useEffect(() => {
    setStartTimeSlots(newStartTimeSlots.concat(endTimeSlots));
  }, [newStartTimeSlots, endTimeSlots]);

  const setDataTime = (day, exception, type, chosenSlotList) => {
    let timeArray = [];
    let timeArrayExceptions = [];
    if (day) {
      let time =
        moment(day.day).month() +
        "-" +
        moment(day.day).date() +
        "-" +
        moment(day.day).year();
      let startCurrentTime = moment(time + " " + day.start).format();
      let endCurrentTime = moment(time + " " + day.end).format();

      while (startCurrentTime <= endCurrentTime) {
        timeArray.push({
          exception: false,
          checked: false,
          timeValue: startCurrentTime
        });
        startCurrentTime = moment(startCurrentTime)
          .add(30, "minutes")
          .format();
      }

      if (exception && exception.length) {
        timeArrayExceptions = exception.map(value => {
          let time =
            moment(value.day).month() +
            "-" +
            moment(value.day).date() +
            "-" +
            moment(value.day).year();
          let start = moment(time + " " + value.start).format();
          let end = moment(time + " " + value.end).format();
          return { start, end };
        });
        timeArrayExceptions.map(valEx => {
          timeArray.map(value => {
            if (
              valEx.start <= value.timeValue &&
              valEx.end >= value.timeValue
            ) {
              value.exception = true;
            }
          });
        });
      }
    }
    if (chosenSlotList) {
      timeArray = chosenSlotList.map((val, index) => {
        return {
          exception: val.exception,
          checked: val.checked,
          timeValue: val.timeValue
        };
      });

      setStartSlotPosition(newPositions.startSlotPosition);
      setEndSlotPosition(newPositions.endSlotPosition);
    }

    if (type === "startDay") {
      setNewStartTimeSlots(timeArray);
    }
    if (type === "endDay") {
      setEndTimeSlots(timeArray);
    }
  };

  const cancelSlots = () => {
    handlerTimeSlot();
    setTimeSlotsError(false);

    chosenNewSlots(false);
    chosenNewPositions(false);
    setChosenDate(false);
  };

  const setArrayNewSlots = () => {
    if (
      startSlotPosition !== null &&
      endSlotPosition !== null &&
      startSlotPosition !== endSlotPosition
    ) {
      let chosenDate = [];
      startTimeSlots.map(value => {
        if (value.checked) chosenDate.push(value);
      });

      chosenNewSlots({ newStartTimeSlots, endTimeSlots });
      chosenNewPositions({ startSlotPosition, endSlotPosition });
      setChosenDate({
        start: chosenDate[0].timeValue,
        end: chosenDate[chosenDate.length - 1].timeValue
      });
      handlerTimeSlot();
    } else {
      setTimeSlotsError(true);
    }
  };

  const handleChangeChecked = (value, event) => {
    setTimeSlotsError(false);

    if (startSlotPosition === null && !event.target.disabled) {
      let changeSlot = startTimeSlots[event.target.name];
      changeSlot.checked = true;
      setStartSlotPosition(event.target.name);
    } else if (endSlotPosition === null && !event.target.disabled) {
      let start = null;
      let end = null;
      let changeSlot = startTimeSlots;

      if (Number(startSlotPosition) < Number(event.target.name)) {
        start = Number(startSlotPosition);
        end = Number(event.target.name);
      } else {
        start = Number(event.target.name);
        end = Number(startSlotPosition);
      }
      setStartSlotPosition(start);
      setEndSlotPosition(end);

      while (start <= end) {
        changeSlot[start].checked = true;
        start++;
      }
      setStartTimeSlots(changeSlot);
    }

    if (
      endSlotPosition !== null &&
      startSlotPosition !== null &&
      !event.target.disabled
    ) {
      let changeSlot = startTimeSlots.map(value => {
        value.checked = false;
        return value;
      });
      changeSlot[event.target.name].checked = true;

      setEndSlotPosition(null);
      setStartSlotPosition(event.target.name);
      setStartTimeSlots(changeSlot);
    }
  };

  return (
    <div className="timeChoice" ref={ref}>
      <div className="timeChoice__timeSlots">
        <div className="timeChoice__day">
          <div className="timeChoice__daySlots">
            {startTimeSlots.length ? (
              <div className={"wraperCurrentDaySlots"}>
                <label htmlFor="">
                  {moment(slotList.operationHours.startDay.day).format("L")}
                </label>
                {!startDayForbidden ? (
                  newStartTimeSlots.map((item, index) => {
                    let key = Date.now() + moment(item.timeValue) + index;

                    return (
                      <div key={key} className="timeChoice__slot">
                        <input
                          type="checkbox"
                          name={index}
                          id={key}
                          value={item.timeValue}
                          disabled={item.exception}
                          checked={item.checked}
                          onChange={event => handleChangeChecked(item, event)}
                        />
                        <label htmlFor={key}>
                          {moment(item.timeValue).format("hh:mm a")}
                        </label>
                      </div>
                    );
                  })
                ) : (
                  <p>reservation on the day is forbidden</p>
                )}
              </div>
            ) : (
              <></>
            )}

            {endTimeSlots.length ? (
              <div className={"wraperCurrentDaySlots"} ref={ref}>
                <label htmlFor="">
                  {moment(slotList.operationHours.endDay.day).format("L")}
                </label>
                {!endDayForbidden ? (
                  endTimeSlots.map((item, index) => {
                    let key = Date.now() + moment(item.timeValue) + index;
                    return (
                      <div key={key} className="timeChoice__slot">
                        <input
                          type="checkbox"
                          name={index + newStartTimeSlots.length}
                          id={key}
                          value={item.timeValue}
                          disabled={item.exception}
                          checked={item.checked}
                          onChange={event => handleChangeChecked(item, event)}
                        />
                        <label htmlFor={key}>
                          {moment(item.timeValue).format("hh:mm a")}
                        </label>
                      </div>
                    );
                  })
                ) : (
                  <p>reservation on the day is forbidden</p>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div className="timeChoice__error">
        {timeSlotsError && (
          <div>Please choose time diapason from available (green colored)</div>
        )}
      </div>
      <div className={"timeChoiceBtn-wrapper"}>
        <button
          type="button"
          onClick={setArrayNewSlots}
          className="timeChoiceBtn__confirm"
        >
          Confirm
        </button>

        <button
          type="button"
          onClick={cancelSlots}
          className="timeChoiceBtn__cancel"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    slotList: state.booking.slotList,
    chosenSlotList: state.booking.chosenSlotList,
    newPositions: state.booking.newPositions
  };
};

export default connect(mapStateToProps, {
  chosenNewSlots,
  chosenNewPositions,
  setChosenDate
})(Slots);
