import React from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import Helmet from 'react-helmet';
import { DayPickerRangeController } from 'react-dates';
import { START_DATE, END_DATE } from 'react-dates/constants';

export class AirbnbCalendarOnly extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      focusedInput: props.autoFocusEndDate ? END_DATE : START_DATE,
      startDate: props.initialStartDate,
      endDate: props.initialEndDate
    };

    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }

  onDatesChange = ({ startDate, endDate }) => {
    let { focusedInput } = this.state;

    if (focusedInput === START_DATE) {
      endDate = startDate;
    }

    if (focusedInput === END_DATE && endDate === null) {
      endDate = startDate;
    }

    this.setState({ startDate, endDate }, () => {
      this.props.liftUpDates(
        new Date(this.state.startDate).getTime(),
        new Date(this.state.endDate).getTime()
      );
    });
  };

  onFocusChange(focusedInput) {
    this.setState({
      // Force the focusedInput to always be truthy so that dates are always selectable
      focusedInput: !focusedInput ? START_DATE : focusedInput
    });
  }

  render() {
    const { focusedInput, startDate, endDate } = this.state;

    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <DayPickerRangeController
          onDatesChange={this.onDatesChange}
          onFocusChange={this.onFocusChange}
          focusedInput={focusedInput}
          startDate={startDate}
          endDate={endDate}
          noBorder
        />
      </div>
    );
  }
}
