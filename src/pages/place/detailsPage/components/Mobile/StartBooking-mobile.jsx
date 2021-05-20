import React, { Component, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import {
  saveBookingDataLocally,
  getExceptionHoursStartDay,
  getExceptionHoursEndDay,
  getPriceType,
  getHoursDay
} from "../../../../../redux/actions/booking.actions/booking.thunk";
import history from "../../../../../history";

import { SelectInputControl } from "../../../../../components/InputControls";
import { setBookingParameters } from "../../../../../redux/actions/booking.actions/booking.actions";
import { Reviews } from "../../../../../pages/place/detailsPage/components/Reviews";
import { getReviewsFromState } from "../../../../../redux/selectors/reviews";

import AirbnbRangeDatesPicker from "../../../../../components/styledComp/AirbnbRangeDatesPicker";
import Slots from "../../../../../components/container/StartBooking/components/Slots";
import styled from "styled-components";

const StyledDatePickerWrapper = styled.div`
  @media (max-width: 992px) {
    .DateRangePicker_picker {
      &__directionLeft {
        left: -20px !important;
      }
    }
  }
`;

class StartBookingMobile extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();

    this.state = {
      priceType: "Hourly",
      startDate: moment(),
      endDate: moment().add(0, "days"),
      operationTime: [
        {
          start: "00:00:00",
          end: "00:00:00"
        }
      ],
      operationStartTime: moment("00:00", "HH:mm").format(),
      operationEndTime: moment("23:59", "HH:mm").format(),
      startTime: "",
      endTime: "",
      guest: "10-20",
      showSTime: false,
      showETime: false,
      isOpenDropdown: false,
      dateError: false,
      message: "",
      showTimeSlots: false,
      startChecked: "",
      endChecked: "",
      sameDay: true,
      timeException: [],
      counter: "",
      slots: null,
      slotsError: false
    };
  }

  setShowTimeSlots = value => {
    this.setState({ showTimeSlots: value });
  };

  onDropDownChange = value => {
    this.setState({
      guest: value
    });
  };

  componentDidMount() {
    this.props.getHoursDay(this.props.placeId, {
      startDate: this.state.startDate,
      endDate: this.state.startDate
    });
    this.props.getPriceType(this.props.placeId);
  }

  onChangeDay(day) {
    let { startDate, endDate } = this.state;
    day == 0
      ? this.liftUpDates(startDate, startDate)
      : this.liftUpDates(endDate, endDate);
  }

  liftUpDates = (startDate, endDate) => {
    let { placeId } = this.props;
    let sameDay = moment(startDate).format("L") === moment(endDate).format("L");
    this.setState({
      startDate,
      endDate,
      sameDay
    });

    if (startDate && endDate) {
      this.props.getHoursDay(placeId, { startDate, endDate });
    }
  };

  checkOperationHours() {
    if (this.props.newChosenDate?.start && this.props.newChosenDate?.end) {
      this.props.saveBookingDataLocally({
        startDate: this.props.newChosenDate.start,
        endDate: this.props.newChosenDate.end,
        placeId: this.props.placeId,
        guest: this.state.guest,
        events: this.props.place.events,
        message: this.state.message
      });
      history.push(`/request-booking/${this.props.placeId}`);
    } else {
      this.setState({
        slotsError: true
      });
    }
  }

  onChangeMessage = ({ target }) => {
    this.setState({
      message: target.value
    });
  };

  handlerTimeSlot = close => {
    if (close) {
      this.setState({ showTimeSlots: close });
    } else {
      this.setState({ showTimeSlots: !this.state.showTimeSlots });
    }
    this.setState({
      slotsError: false
    });
  };

  render() {
    const { price, reviews, slotListFailure } = this.props;
    const {
      priceType,
      startDate,
      endDate,
      startTime,
      endTime,
      dateError,
      timeException,
      showTimeSlots,
      slots
    } = this.state;
    return (
      <div className="startBooking">
        <div className="startBooking-content">
          {priceType === "Hourly" ? (
            <StyledDatePickerWrapper>
              <AirbnbRangeDatesPicker
                classes={"request-booking"}
                startDate={startDate}
                endDate={endDate}
                liftUpDates={this.liftUpDates}
                minimumNights={0}
                maximumNights={2}
                mobileType={this.props.mobileType}
              />
            </StyledDatePickerWrapper>
          ) : (
            <StyledDatePickerWrapper>
              <AirbnbRangeDatesPicker
                classes={"request-booking"}
                startDate={startDate}
                endDate={endDate}
                liftUpDates={this.liftUpDates}
                minimumNights={1}
                mobileType={this.props.mobileType}
              />
            </StyledDatePickerWrapper>
          )}

          <div className="startBooking-time">
            <button
              disabled={slotListFailure}
              className={`slotsTime startBooking-content-booking-btn ${slotListFailure &&
                "back"}`}
              onClick={this.handlerTimeSlot}
            >
              {startTime && endTime
                ? moment(startTime, "H:mm").format("hh:mm a") +
                  " - " +
                  moment(endTime, "H:mm").format("hh:mm a")
                : "Set Timeslots"}
            </button>

            {dateError && (
              <div className="startBooking-content-error">
                <span className="startBooking-content-error-text">
                  Please choice another Date and Time
                </span>
              </div>
            )}
          </div>

          {showTimeSlots && (
            <Slots
              handlerTimeSlot={this.handlerTimeSlot}
              showTimeSlots={this.state.showTimeSlots}
            />
          )}

          <div className="startBooking-people">
            <SelectInputControl
              label="People range"
              selectOptions={["10-20", "20-30", "30-50", "50-100", "100-500"]}
              onDropDownChange={this.onDropDownChange}
              placeHolder="10-20"
              handleClickOutside={() => {}}
            />
          </div>

          <textarea
            onChange={this.onChangeMessage}
            placeholder="Your message here"
            className="booking-page__input-field booking-page__input-field_textarea"
          />
          <div className="startBooking-btn">
            <button
              disabled={slotListFailure}
              className={`startBooking-content-booking-btn ${slotListFailure &&
                "back"}`}
              onClick={() => this.checkOperationHours(timeException)}
            >
              Request to book
            </button>
            {slotListFailure && (
              <div className={"error-msg"}>
                <p>{"You are not authorized! Sign in please as guest"}</p>
              </div>
            )}
            {this.state.slotsError && (
              <div className={"error-msg"}>
                <p>{"Select time slots"}</p>
              </div>
            )}
            <div className="startBooking-content-booking-info">
              <span>Cancel for free within 24 hours</span>
            </div>
          </div>
          <div className="startBooking-content-review">
            {reviews && reviews.rows.length ? (
              <Reviews reviews={reviews} onToggleModal={this.onToggleModal} />
            ) : (
              <div className="reviews">
                <div className="header">
                  <p className="heading-2">No reviews</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

StartBookingMobile.propTypes = {
  placeId: PropTypes.string,
  operatingHours: PropTypes.array,
  price: PropTypes.string
};

const mapStateToProps = state => {
  return {
    reviews: getReviewsFromState(state),
    place: state.place.placeDetails,
    booking: state.booking,
    timeExceptionStartDay: state.booking.timeExceptionStartDay,
    timeExceptionEndDay: state.booking.timeExceptionEndDay,
    priceType: state.booking.priceType,
    newChosenDate: state.booking.newChosenDate,
    slotListFailure: state.booking.slotListFailure
  };
};

export default connect(mapStateToProps, {
  saveBookingDataLocally,
  setBookingParameters,
  getExceptionHoursStartDay,
  getExceptionHoursEndDay,
  getPriceType,
  getHoursDay
})(StartBookingMobile);
