import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SeparateLine from '../../../../../components/SeparateLine';
import './style.scss';

const days = {
  '1': 'Monday',
  '2': 'Tuesday',
  '3': 'Wednesday',
  '4': 'Thursday',
  '5': 'Friday',
  '6': 'Saturday',
  '7': 'Sunday'
};

class OperatingHours extends Component {
  get renderOperatingHours() {
    const { operatingHours } = this.props;
    const isNotAllDay = operatingHours.some((item) => item.allDay === false);

    if (isNotAllDay) {
      return (
        <div className="content-column">
          {operatingHours.map((item, index) => {
            return (
              <div key={index} className="content-container">
                <div className="content-container-row">{days[item.day]}</div>
                {item.allDay ? (
                  <div>All day (24 hours)</div>
                ) : (
                  <div>
                    {item.start} - {item.end}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <div className="content-container">
          <div className="content-container-row">{`Monday - Sunday`}</div>
          <div>{`All day(24 hours)`}</div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="OperatingHours">
        <div className="title-operating-hours">Operating Hours</div>
        <div className="content"> {this.renderOperatingHours}</div>
        <SeparateLine />
      </div>
    );
  }
}

OperatingHours.propTypes = {
  // operatingHours: PropTypes.shape({
  //   availableDays: PropTypes.arrayOf(PropTypes.string),
  //   availableTime: PropTypes.number
  // })
};

export default OperatingHours;
