import React from "react";
import { Container } from "reactstrap";
import Rating from "@material-ui/lab/Rating";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import Header from "../../../components/Header";
import { AirbnbRangeDatesPicker } from "../../../components/styledComp/AirbnbRangeDatesPicker";
import TimePiker from "../../../components/TimePicker";
import location from "../../../assets/location.svg";
import user from "../../../assets/user.svg";
import event from "../../../assets/event.svg";
import guest from "../../../assets/guest.svg";
import Footer from "../../../components/Footer";
import Event from "../../../components/Filter/Event";
import {
  changeActivity,
  changeGuests,
  confirmBookingFailure,
  setBookingDatesTime
} from "../../../redux/actions/booking.actions/booking.actions";

import "./styles.scss";
import {
  createBookingConfirm,
  checkPromocode
} from "../../../redux/actions/booking.actions/booking.thunk";
import MsgDialog from "../../../components/MsgForm";
import { getPlaceDetails } from "../../../redux/actions/places.actions/places.thunk";
import { getEvents } from "../../../redux/actions/places.actions/searchPlace.thunk";
import fullLogo from "../../../assets/Full_Logo.png";

import HeartIcon from "../../../assets/icons/heart-icon.png";
import history from "../../../history";

class RequestBookPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: this.props.parameters?.startTime || "00:00",
      endTime: this.props.parameters?.endTime || "23:59",
      showSTime: false,
      showETime: false,
      activity: [],
      date_from: this.props.parameters?.startDate || moment(),
      date_to: this.props.parameters?.endDate || moment().add(1, "days"),
      people: "0",
      currentIdPage: "",
      promocode: "",
      checkPromocode: ""
    };
  }
  formatDateTime() {
    const startDateSec = this.state.date_from / 1000;
    const endDateSec = this.state.date_to / 1000;

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

  componentDidMount() {
    setBookingDatesTime(this.props.parameters);
    let param = window.location.pathname.lastIndexOf("/");
    this.props.getPlaceDetails(window.location.pathname.slice(param + 1));
    this.setState({
      currentIdPage: window.location.pathname.slice(param + 1)
    });

    this.props.confirmBookingFailure({ message: "" });
    this.props.getEvents();
  }

  componentDidUpdate(prevProps, nextProps) {
    if (prevProps.promocode !== this.props.promocode) {
      this.setState({
        checkPromocode: this.props.promocode.checkPromocode
      });
    }
  }

  changeSTime(newTime) {
    this.setState({ startTime: newTime });
  }

  changeETime(newTime) {
    this.setState({ endTime: newTime });
  }

  changeShowSTime = value => {
    this.props.confirmBookingFailure({ message: "" });
    if (!this.state.showETime) {
      this.setState({ showSTime: value });
    }
  };

  changeShowETime = value => {
    this.props.confirmBookingFailure({ message: "" });
    if (!this.state.showSTime) {
      this.setState({ showETime: value });
    }
  };

  liftUpDates = (fromDate, toDate) => {
    this.props.confirmBookingFailure({ message: "" });
    this.setState({
      date_from: fromDate,
      date_to: toDate
    });
  };

  submitBack = () => {
    history.push(`/place-details/${this.state.currentIdPage}`);
  };

  onCheckPromocode = () => {
    const { promocode } = this.state;
    this.props.checkPromocode(promocode);
  };

  submitConfirm = () => {
    const { promocode } = this.state;
    const { place } = this.props;
    const price = (this.getHours() * `${place?.price}`).toFixed(2);

    const dataPlace = this.props.place.events.map((value, i) => {
      return value.id;
    });

    this.props.createBookingConfirm({
      BuildingId: this.props.place.id,
      people: this.props.dataPlace?.guest || this.state.people,
      startDate: this.props.dataPlace.startDate,
      endDate: this.props.dataPlace.endDate,
      event_id: this.state.activity.length
        ? this.state.activity[0]
        : dataPlace[0],
      message: this.props.dataPlace?.message || "",
      summ: Number(price),
      referralCode: promocode
    });
  };

  renderDates = (date_from, date_to, startTime, endTime) => {
    return `${moment(date_from).format("ll")}  – ${moment(date_to).format(
      "ll"
    )} `;
  };

  getHours = () => {
    if (!(this.props.dataPlace?.endDate && this.props.dataPlace?.startDate)) {
      return 0;
    }

    return (
      moment(this.props.dataPlace?.endDate).diff(
        this.props.dataPlace?.startDate,
        "hours"
      ) + 1
    );
  };

  onChangePeople = people => {
    if (people === undefined) {
      this.setState({ people: "10-20" });
    } else {
      this.setState({ people });
    }
  };

  onChangeEvent = eventId => {
    this.setState({
      activity: [+eventId]
    });
  };

  onPromocodeChange = e => {
    this.setState({
      promocode: e.target.value
    });
  };

  render() {
    const {
      parameters,
      changeActivity,
      changeGuests,
      isAuthenticated,
      dataPlace,
      place
    } = this.props;
    const {
      showSTime,
      showETime,
      date_from,
      date_to,
      startTime,
      endTime,
      promocode,
      checkPromocode
    } = this.state;
    return (
      <div className="wrapper">
        <Header
          classes={"home_header"}
          fullLogo={fullLogo}
          isAuthenticated={isAuthenticated}
          find={true}
        />
        <div className="booking-page">
          <div className="booking-page__sidebar">
            <div className="booking-page__sidebar-section-img booking-page__sidebar-section_view">
              <div className="booking-page__view">
                <img
                  className="booking-page__img"
                  src={place?.image}
                  alt="Building view"
                />
              </div>
              <h4 className="booking-page__parameter-header venue-name">
                {place?.name}
              </h4>
            </div>
            <div className="booking-page__sidebar-section">
              <div className="booking-page__location">
                <div className="booking-page__address">
                  <div className="booking-page__location-img">
                    <img src={location} alt="Location icon" />
                  </div>
                  <div className="booking-page__place">
                    {place?.country.country_name &&
                      place?.country.country_name + ", "}
                    {place?.city.city_name && place?.city.city_name + ", "}
                    {place?.address.street}
                  </div>
                </div>

                <div className="booking-page__reviews">
                  <div className="booking-page__stars">
                    {/*<img src="" alt=""/>*/}
                    <img className={"icon"} src={HeartIcon} alt="" />
                    <span>{place?.rating}</span>
                  </div>
                  {/*<div className="booking-page__counter">null reviews</div>*/}
                </div>
              </div>
              <div className="booking-page__host">
                <div className="booking-page__host-img">
                  <img
                    className="booking-page__host-icon"
                    src={user}
                    alt="User icon"
                  />
                </div>

                <div className="booking-page__host-content">
                  {place?.user && (
                    // lin    history.push(`/request-booking/${this.props.placeId}`);
                    <h4 className="booking-page__parameter-header host">
                      <Link to={`/user/${place.user.id}`}>
                        Host -{" "}
                        <span>
                          {place.user.first_name + " " + place.user.last_name}
                        </span>
                      </Link>
                    </h4>
                  )}
                  <div className="booking-page__host-name">
                    &#129351; Super owner
                  </div>
                </div>
              </div>
            </div>
            <div className="booking-page__sidebar-section">
              <div className="booking-page__params booking-page__params_start">
                <div className={"people"}>
                  <div className="booking-page__param-text booking-page__param-text_flex desk-hidden">
                    People Range
                  </div>
                  <div className="booking-page__param-img">
                    <img
                      className="booking-page__param-icon"
                      src={guest}
                      alt="Guest icon"
                    />
                  </div>
                  {/*booking.dataPlace.guest*/}

                  <div className="booking-page__param-text">
                    {`${this.props?.dataPlace?.guest || "0"} People`}
                  </div>
                </div>
                <div className={"date"}>
                  <div className="booking-page__param-img">
                    <img
                      className="booking-page__param-icon"
                      src={event}
                      alt="Event icon"
                    />
                  </div>
                  <div className="booking-page__param-text">
                    {/*startDate: this.props.dataPlace.startDate,*/}
                    {/*endDate: this.props.dataPlace.endDate,*/}

                    {this.props.dataPlace &&
                      this.renderDates(
                        this.props.dataPlace.startDate,
                        this.props.dataPlace.endDate,
                        this.props.dataPlace.startDate,
                        this.props.dataPlace.endDate
                      )}
                  </div>
                </div>
              </div>
              <div className="booking-page__message-text">
                <span className={"title"}>Message text:</span>
                <p className={"description"}>{this.props.dataPlace?.message}</p>
              </div>
              <div className="booking-page__params">
                <div className="booking-page__param-text">
                  {`${place?.price} x ${this.getHours(
                    date_from,
                    date_to,
                    startTime,
                    endTime
                  )}`}
                </div>
                <div className="booking-page__param-text price">
                  {(
                    this.getHours(date_from, date_to, startTime, endTime) *
                    `${place?.price}`
                  ).toFixed(2)}{" "}
                  $
                </div>
              </div>
              <div className="booking-page__params">
                <div className="booking-page__param-text">Service fee</div>
                <div className="booking-page__param-text fee">
                  {(
                    ((this.getHours(date_from, date_to, startTime, endTime) *
                      `${place?.price}`) /
                      100) *
                    place?.user.fee
                  ).toFixed(2)}{" "}
                  $
                </div>
              </div>
              <div className="booking-page__params mobil-hidden">
                <div className="booking-page__param-text promocode">
                  Promocode
                </div>
                <div className="booking-page__param-text promocode">
                  <div>
                    <input
                      onChange={this.onPromocodeChange}
                      value={promocode}
                      placeholder={"Promocode"}
                      type={"text"}
                      className="booking-page__input-field booking-page__input-field_promocode"
                    />
                    {checkPromocode === false && (
                      <div className="error-msg error-msg_promocode">
                        Wrong promocode!
                      </div>
                    )}
                  </div>
                  <button
                    className="booking-page__btn booking-page__btn_promocode"
                    onClick={this.onCheckPromocode}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
            <div className="booking-page__total">
              <span className="booking-page__param-text booking-page__param-text_bold total">
                Total (USD)
              </span>
              <span className="booking-page__param-text booking-page__param-text_bold total-price">
                {!checkPromocode
                  ? (
                      this.getHours(date_from, date_to, startTime, endTime) *
                        `${place?.price}` +
                      ((this.getHours(date_from, date_to, startTime, endTime) *
                        `${place?.price}`) /
                        100) *
                        place?.user.fee
                    ).toFixed(2)
                  : (
                      this.getHours(date_from, date_to, startTime, endTime) *
                        `${place?.price}` +
                      ((this.getHours(date_from, date_to, startTime, endTime) *
                        `${place?.price}`) /
                        100) *
                        place?.user.fee -
                      50
                    ).toFixed(2)}
                $
              </span>
            </div>

            <div className="booking-page__send-request confirm">
              <button
                onClick={this.submitBack}
                className="startBooking-content-review-btn mobil-hidden"
              >
                Back
              </button>
              <button
                disabled={!localStorage.getItem("token")}
                className={`send-request-btn ${!localStorage.getItem("token") &&
                  "back"}`}
                //                () => history.push("/payment")

                onClick={this.submitConfirm}
              >
                Confirm
              </button>
            </div>
            {!localStorage.getItem("token") && (
              <div className={"error-msg"}>
                <p>{"You are not authorized! Sign in please as guest"}</p>
              </div>
            )}
            {this.props.message && (
              <div className={"error-msg"}>
                <p>{this.props.message?.message}</p>
              </div>
            )}
          </div>
        </div>
        <MsgDialog resolve={this.props.bookingResolve} />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { booking } = state;
  return {
    place: state.place.placeDetails,
    parameters: booking.parameters,
    dataPlace: state.booking.dataPlace,
    message: booking.fail,
    bookingResolve: booking.bookingResolve,
    isAuthenticated: state.auth.isAuthenticated,
    events: state.searchPlace.events,
    people: state.searchPlace.people,
    promocode: booking.promocode
  };
};

const requestBookPageWithRouter = withRouter(RequestBookPage);

export default connect(mapStateToProps, {
  changeActivity,
  changeGuests,
  setBookingDatesTime,
  createBookingConfirm,
  getPlaceDetails,
  confirmBookingFailure,
  getEvents,
  checkPromocode
})(requestBookPageWithRouter);
