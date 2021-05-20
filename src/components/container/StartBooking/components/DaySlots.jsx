import React, { useState, useEffect } from "react";
import moment from "moment";
import "./style.scss";

const DaySlots = props => {
  const [timeSlots, setTimeSlots] = useState([]);
  const [newStartTime, setStartTime] = useState();
  const [newEndTime, setEndTime] = useState();

  let timeValue = props.beginLimit || moment("00:00").format(),
    lastValue,
    endLimit = props.endLimit || moment("23:59").format(),
    step = 30,
    {
      timeException,
      sameDay,
      startTime,
      endTime,
      startPoint,
      endPoint
    } = props,
    options = [];

  const isEarlierThanEndLimit = (timeValue, endLimit, lastValue) => {
    let timeValueIsEarlier = moment(timeValue).diff(moment(endLimit)) < 0;
    let timeValueIsLaterThanLastValue =
      lastValue === undefined
        ? true
        : moment(lastValue).diff(moment(timeValue)) < 0;
    return timeValueIsEarlier && timeValueIsLaterThanLastValue;
  };
  options.push({ timeValue: timeValue, checked: false });

  while (isEarlierThanEndLimit(timeValue, endLimit, lastValue)) {
    lastValue = timeValue;
    timeValue = moment(timeValue)
      .add(step, "minutes")
      .format();
    let checked = false;
    if (!(startPoint || endPoint) === true) {
      let exception =
        timeException?.filter(
          e =>
            moment(e.startTime, "H:mm:ss").format() <= timeValue &&
            moment(e.endTime, "H:mm:ss").format() >= timeValue
        ).length > 0;
      options.push({
        timeValue: timeValue,
        checked: checked,
        exception: exception
      });
    } else {
      options.push({
        timeValue: timeValue,
        checked: checked,
        exception: false
      });
    }
  }

  useEffect(() => {
    if (endPoint && timeException?.length) {
      let i = 0;
      let endCurrentTime = moment(timeException[0].endTime, "H:mm:ss")
        .add(1, "minutes")
        .format();
      while (endCurrentTime >= options[0].timeValue) {
        options[i].exception = true;
        endCurrentTime = moment(endCurrentTime)
          .add(-30, "minutes")
          .format();
        i++;
      }
    }
    if (startPoint && timeException?.length) {
      let i = options.length - 1;
      let startCurrentTime = moment(
        timeException[0].startTime,
        "H:mm:ss"
      ).format();
      while (startCurrentTime <= options[options.length - 1].timeValue) {
        options[i].exception = true;
        startCurrentTime = moment(startCurrentTime)
          .add(30, "minutes")
          .format();
        i--;
      }
    }

    let sTime = startTime;
    let fTime = moment(endTime)
      .add(1, "minutes")
      .format();
    const currentPoint = options.findIndex(val => {
      if (val.timeValue === startTime) {
        return val;
      }
    });
    if (currentPoint !== -1) {
      let i = currentPoint;
      while (sTime <= fTime) {
        if (options[i]) options[i].checked = true;

        sTime = moment(sTime)
          .add(30, "minutes")
          .format();
        i++;
      }
    }
    setTimeSlots(options);
  }, []);

  useEffect(() => {
    setStartTime(newStartTime);
    if (newStartTime) {
      newStartTime != "empty"
        ? props.onChangeStartTime(moment(newStartTime, "H:mm").format())
        : props.onChangeStartTime(newStartTime);
    } else {
      let firstSlot = options
        .map(e => {
          return e.checked;
        })
        .indexOf(true);
      if (firstSlot >= 0) props.onChangeStartTime(options[firstSlot].timeValue);
    }
  }, [newStartTime]);

  useEffect(() => {
    setEndTime(newEndTime);
    if (newEndTime) {
      newEndTime != "empty"
        ? props.onChangeEndTime(moment(newEndTime, "H:mm").format())
        : props.onChangeEndTime(newEndTime);
    } else {
      let lastSlot = options
        .map(e => {
          return e.checked;
        })
        .lastIndexOf(true);
      if (lastSlot >= 0)
        props.onChangeEndTime(
          moment(options[lastSlot].timeValue)
            .subtract(1, "minutes")
            .format()
        );
    }
  }, [newEndTime]);

  const handleChangeChecked = changeItem => {
    const newTimeSlots = timeSlots.map(item => {
      let updatedItem;
      if (changeItem == item) {
        updatedItem = {
          ...item,
          checked: !item.checked
        };
        return updatedItem;
      }
      return item;
    });
    let firstSlot, lastSlot;
    if (startPoint)
      firstSlot = newTimeSlots
        .map(e => {
          return e.checked;
        })
        .indexOf(true);

    if (endPoint)
      lastSlot = newTimeSlots
        .map(e => {
          return e.checked;
        })
        .lastIndexOf(true);

    if (startPoint === undefined && endPoint === undefined) {
      firstSlot = newTimeSlots
        .map(e => {
          return e.checked;
        })
        .indexOf(true);
      lastSlot = newTimeSlots
        .map(e => {
          return e.checked;
        })
        .lastIndexOf(true);
    }

    let sortedTimeSlots = newTimeSlots.map((item, index) => {
      let updatedItem;
      if (index < firstSlot || index > lastSlot || item.exception) {
        updatedItem = {
          ...item,
          checked: false
        };
      } else {
        updatedItem = {
          ...item,
          checked: true
        };
      }
      return updatedItem;
    });

    if (startPoint === undefined && endPoint === undefined) {
      if (firstSlot !== -1 || lastSlot !== -1) {
        setStartTime(moment(newTimeSlots[firstSlot].timeValue).format("H:mm"));
        setEndTime(
          moment(newTimeSlots[lastSlot].timeValue)
            .subtract(1, "minutes")
            .format("H:mm")
        );
      } else {
        setStartTime("empty");
        setEndTime("empty");
      }
    } else {
      if (firstSlot) {
        if (firstSlot !== -1) {
          setStartTime(
            moment(newTimeSlots[firstSlot].timeValue).format("H:mm")
          );
        } else {
          setStartTime("empty");
        }
      }
      if (lastSlot) {
        if (lastSlot !== -1) {
          setEndTime(
            moment(newTimeSlots[lastSlot].timeValue)
              .subtract(1, "minutes")
              .format("H:mm")
          );
        } else {
          setEndTime("empty");
        }
      }
    }
    setTimeSlots(sortedTimeSlots);
  };

  return (
    <div className="timeChoice__daySlots">
      {timeSlots.map((item, index) => {
        let key = Date.now() + moment(item.timeValue) + index;

        return (
          <div key={key} className="timeChoice__slot">
            <input
              type="checkbox"
              name={key}
              id={key}
              value={item.timeValue}
              disabled={item.exception}
              checked={item.checked}
              onChange={() => handleChangeChecked(item)}
            />
            <label htmlFor={key}>
              {moment(item.timeValue).format("hh:mm a")}
            </label>
          </div>
        );
      })}
    </div>
  );
};
export { DaySlots };
