import React from 'react';
import TimePiker from '../../../../components/TimePicker';

export default function TimeRangePicker({
  startTime,
  endTime,
  showSTime,
  showETime,
  dayOfWeek,
  changeTime,
  changeShowTime
}) {
  return (
    <div className="startBooking-content-time">
      <TimePiker
        time={startTime}
        setTime={(time) => changeTime(time, 'start', dayOfWeek)}
        showTime={showSTime}
        setShowTime={(value) => changeShowTime('showSTime', dayOfWeek, value)}
        multiPicker={true}
      />
      <TimePiker
        time={endTime}
        setTime={(time) => changeTime(time, 'end', dayOfWeek)}
        showTime={showETime}
        setShowTime={(value) => changeShowTime('showETime', dayOfWeek, value)}
        multiPicker={true}
      />
    </div>
  );
}
