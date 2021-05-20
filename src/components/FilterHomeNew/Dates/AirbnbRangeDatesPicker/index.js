import React from "react";
import PropTypes from "prop-types";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import Helmet from "react-helmet";
import {
  DateRangePicker,
  isInclusivelyBeforeDay,
  isInclusivelyAfterDay
} from "react-dates";
import { START_DATE, END_DATE } from "react-dates/constants";
import moment from "moment";
import { Label } from "reactstrap";
import styled from "styled-components";
import "./style.scss";

const LabelStyled = styled(Label)`
  width: 50% !important;
  font-size: 13px !important;
  font-weight: 400 !important;
  padding-left: 11px !important;
  margin-bottom: 0px !important;
`;

export class AirbnbRangeDatesPicker extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      focusedInput: null,
      startDate: props.adminTransactions
        ? props.startDate
        : props.startDate || moment(),
      endDate: props.adminTransactions
        ? props.endDate
        : props.endDate || moment().add(1, "days")
    };
  }

  onDatesChange = ({ startDate, endDate }) => {
    let { focusedInput } = this.state;

    if (focusedInput === START_DATE) {
      endDate = startDate;
    }

    if (focusedInput === END_DATE && endDate === null) {
      endDate = startDate;
    }

    this.setState({ startDate, endDate, focusedInput });

    let dateTo = moment(endDate)
      .utcOffset(0)
      .set({ hour: 23, minute: 59 });
    let dateFrom = moment(startDate)
      .utcOffset(0)
      .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
      .startOf("month");

    this.props.liftUpDates(dateFrom, dateTo);
  };

  render() {
    const { focusedInput, startDate, endDate } = this.state;
    return (
      <>
        <div className="label-wrapper">
          <label className={`top_form__form-groop-label ${this.props.classes}`}>
            Select date:
          </label>
        </div>
        <DateRangePicker
          className={`admin-transaction`}
          startDate={startDate} // momentPropTypes.momentObj or null,
          startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
          endDate={endDate} // momentPropTypes.momentObj or null,
          endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
          onDatesChange={this.onDatesChange} // PropTypes.func.isRequired,
          focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired
          readOnly={this.props.changedDate ? false : true}
          noBorder={this.props.noBorder}
          // showClearDates={this.props.showClearDates}
          isOutsideRange={this.props.isOutsideRange}
          verticalHeight={this.props.mobileType ? 370 : null}
          orientation={this.props.mobileType ? "vertical" : "horizontal"}
          numberOfMonths={this.props.mobileType ? 1 : 2}
        />
        <Helmet>
          <style>{`
          .DateRangePicker div .DateRangePickerInput {
            width: 100%;
            margin-top: 1px;

            display: flex;
            justify-content: space-between;
          }
          .DateRangePicker div .DateRangePickerInput .DateInput{
            width: 50%;
          }
          `}</style>
        </Helmet>
      </>
    );
  }
}

AirbnbRangeDatesPicker.propTypes = {
  liftUpDates: PropTypes.func,
  startDate: PropTypes.object, // moment object
  endDate: PropTypes.object // moment object
};
