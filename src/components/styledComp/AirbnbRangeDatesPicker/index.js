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
import {
  chosenNewPositions,
  chosenNewSlots,
  setChosenDate
} from "../../../redux/actions/booking.actions/booking.actions";
import { connect } from "react-redux";

const LabelStyled = styled(Label)`
  width: 50% !important;
  font-size: 13px !important;
  font-weight: 400 !important;
  padding-left: 11px !important;
  margin-bottom: 0px !important;
`;

class AirbnbRangeDatesPicker extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      focusedInput: null,
      startDate: props.startDate || moment(),
      endDate: props.endDate || moment().add(1, "days")
    };
  }

  onDatesChange = ({ startDate, endDate }) => {
    let { focusedInput } = this.state;

    this.props.chosenNewSlots(false);
    this.props.chosenNewPositions(false);
    this.props.setChosenDate(false);

    this.props.liftUpDates(startDate, endDate);

    this.setState({ startDate, endDate, focusedInput });
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ endDate: nextProps.endDate });
  }

  render() {
    console.log(this.props.mobileType);

    const { focusedInput, startDate, endDate } = this.state;
    let { minimumNights, maximumNights } = this.props;
    let maximumEndDate;

    let condition;

    if (maximumNights) {
      maximumEndDate = moment().add(maximumNights, "days");
      if (startDate) {
        maximumEndDate = startDate.clone().add(maximumNights, "days");
      }

      if (focusedInput === END_DATE) {
        condition = day =>
          !isInclusivelyAfterDay(day, moment()) ||
          isInclusivelyAfterDay(day, maximumEndDate);
      }
    }

    if (focusedInput === START_DATE) {
      condition = day => !isInclusivelyAfterDay(day, moment());
    }
    return (
      <>
        <div className="label-wrapper">
          <label className={`top_form__form-groop-label ${this.props.classes}`}>
            Start date to Completion Date
          </label>
        </div>

        <DateRangePicker
          startDate={startDate} // momentPropTypes.momentObj or null,
          startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
          endDate={endDate} // momentPropTypes.momentObj or null,
          endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
          onDatesChange={this.onDatesChange} // PropTypes.func.isRequired,
          focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired
          minimumNights={minimumNights}
          isOutsideRange={condition}
          readOnly
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
          `}</style>
        </Helmet>
      </>
    );
  }
}

// AirbnbRangeDatesPicker.propTypes = {
//   liftUpDates: PropTypes.func,
//   startDate: PropTypes.object, // moment object
//   endDate: PropTypes.object // moment object
// };

export default connect("", {
  chosenNewSlots,
  chosenNewPositions,
  setChosenDate
})(AirbnbRangeDatesPicker);
