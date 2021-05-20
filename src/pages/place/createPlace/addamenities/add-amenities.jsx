import React from "react";
import { connect } from "react-redux";
import { Form } from "reactstrap";

import {
  getPlaceDetails,
  amenitiesList,
  featuresList,
  getCronofyEvents,
  sendCronofy
} from "../../../../redux/actions/places.actions/places.thunk";
import { isAuthenticated } from "../../../../redux/selectors/auth/auth.select";
import TextAreaControl from "../../../../components/TextArea";

import Dropdown from "../../../../components/Dropdown";
import "./style.scss";
import { validationError } from "../../../../redux/actions/places.actions/places.actions";
import { Link } from "react-router-dom";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import placesReducer from "../../../../redux/reducers/placesReducers/placesReducers";
import moment from "moment";

const times = [
  "12:00 am",
  "12:30 am",
  "01:00 am",
  "01:30 am",
  "02:00 am",
  "02:30 am",
  "03:00 am",
  "03:30 am",
  "04:00 am",
  "04:30 am",
  "05:00 am",
  "05:30 am",
  "06:00 am",
  "06:30 am",
  "07:00 am",
  "07:30 am",
  "08:00 am",
  "08:30 am",
  "09:00 am",
  "09:30 am",
  "10:00 am",
  "10:30 am",
  "11:00 am",
  "11:30 am",
  "12:00 pm",
  "12:30 pm",
  "01:00 pm",
  "01:30 pm",
  "02:00 pm",
  "02:30 pm",
  "03:00 pm",
  "03:30 pm",
  "04:00 pm",
  "04:30 pm",
  "05:00 pm",
  "05:30 pm",
  "06:00 pm",
  "06:30 pm",
  "07:00 pm",
  "07:30 pm",
  "08:00 pm",
  "08:30 pm",
  "09:00 pm",
  "09:30 pm",
  "10:00 pm",
  "10:30 pm",
  "11:00 pm",
  "11:30 pm"
];

class AddAmenities extends React.PureComponent {
  state = {
    clientId: "",
    secret: "",
    accessToken: "",
    timezone: "",
    chosenDay: "",
    open: true,
    details: null,
    isOpen: false,
    amenities: [],
    specialFeatures: [],
    rules: "",
    time1: "Select",
    time2: "Select",
    time3: "Select",
    time4: "Select",
    time5: "Select",
    time6: "Select",
    time7: "Select",
    time8: "Select",
    time9: "Select",
    time10: "Select",
    time11: "Select",
    time12: "Select",
    time13: "Select",
    time14: "Select"
  };

  submitVenue = () => {
    const {
      time1,
      time2,
      time3,
      time4,
      time5,
      time6,
      time7,
      time8,
      time9,
      time10,
      time11,
      time12,
      time13,
      time14,
      specialFeatures,
      amenities,
      rules
    } = this.state;
    const operatingHours = [
      {
        day: 1,
        start: time1 !== "Select" ? time1 : "00:00",
        end: time2 !== "Select" ? time2 : "00:00",
        allDay: false
      },
      {
        day: 2,
        start: time3 !== "Select" ? time3 : "00:00",
        end: time4 !== "Select" ? time4 : "00:00",
        allDay: false
      },
      {
        day: 3,
        start: time5 !== "Select" ? time5 : "00:00",
        end: time6 !== "Select" ? time6 : "00:00",
        allDay: false
      },
      {
        day: 4,
        start: time7 !== "Select" ? time7 : "00:00",
        end: time8 !== "Select" ? time8 : "00:00",
        allDay: false
      },
      {
        day: 5,
        start: time9 !== "Select" ? time9 : "00:00",
        end: time10 !== "Select" ? time10 : "00:00",
        allDay: false
      },
      {
        day: 6,
        start: time11 !== "Select" ? time11 : "00:00",
        end: time12 !== "Select" ? time12 : "00:00",
        allDay: false
      },
      {
        day: 7,
        start: time13 !== "Select" ? time13 : "00:00",
        end: time14 !== "Select" ? time14 : "00:00",
        allDay: false
      }
    ];

    if (!(specialFeatures.length && amenities.length && rules)) {
      this.props.validationError(true);
    } else {
      this.props.amenitiesData(this.state.amenities);
      this.props.specialFeaturesData(this.state.specialFeatures);
      this.props.operatingHoursData(operatingHours);
      this.props.rulesData(this.state.rules);

      setTimeout(() => {
        this.props.saveVenueData(true);
      }, 500);
    }
  };

  changeTimeOne = time => {
    this.setState({ time1: time });
  };

  changeTimeTwo = time => {
    this.setState({ time2: time });
  };

  changeTimeThree = time => {
    this.setState({ time3: time });
  };

  changeTimeFour = time => {
    this.setState({ time4: time });
  };

  changeTimeFive = time => {
    this.setState({ time5: time });
  };

  changeTimeSix = time => {
    this.setState({ time6: time });
  };

  changeTimeSeven = time => {
    this.setState({ time7: time });
  };

  changeTimeEight = time => {
    this.setState({ time8: time });
  };

  changeTimeNine = time => {
    this.setState({ time9: time });
  };

  changeTimeTen = time => {
    this.setState({ time10: time });
  };

  changeTimeEleven = time => {
    this.setState({ time11: time });
  };

  changeTimeTwelve = time => {
    this.setState({ time12: time });
  };

  changeTimeThirteen = time => {
    this.setState({ time13: time });
  };

  changeTimeFourteen = time => {
    this.setState({ time14: time });
  };

  checkAmenities = e => {
    let amenities = this.state.amenities;
    if (amenities.indexOf(e.target.value) == -1) {
      amenities.push(e.target.value);
    } else {
      const idx = amenities.indexOf(e.target.value);
      amenities.splice(idx, 1);
    }
    this.setState({
      amenities: amenities
    });
  };

  checkSpecialFeatures = e => {
    let specialFeatures = this.state.specialFeatures;
    if (specialFeatures.indexOf(e.target.value) == -1) {
      specialFeatures.push(e.target.value);
    } else {
      const idx = specialFeatures.indexOf(e.target.value);
      specialFeatures.splice(idx, 1);
    }
    this.setState({
      specialFeatures: specialFeatures
    });
  };

  changeRules = event => {
    this.setState({ rules: event.target.value });
  };

  componentDidMount() {
    this.props.amenitiesList();
    this.props.featuresList();
    this.props.validationError(false);

    this.props.getCronofyEvents();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.cronofy !== prevProps.cronofy) {
      this.props.getCronofyEvents();
    }
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handlerClickCronofy = () => {
    const { clientId, secret, accessToken, timezone } = this.state;
    this.props.sendCronofy({ clientId, secret, accessToken, timezone });
    this.setState({ open: false });
  };

  handlerChangeCronofyField = event => {
    switch (event.target.name) {
      case "clientId":
        this.setState({ clientId: event.target.value });
        break;
      case "secret":
        this.setState({ secret: event.target.value });
        break;
      case "accessToken":
        this.setState({ accessToken: event.target.value });
        break;
      case "timezone":
        this.setState({ timezone: event.target.value });
        break;
      default:
    }
  };

  handlerChooseEvent = event => {
    let day = moment(event.currentTarget.getAttribute("data-start")).format(
      "dddd"
    );

    let sTime = moment(event.currentTarget.getAttribute("data-start")).format(
      "hh:mm A"
    );
    let eTime = moment(event.currentTarget.getAttribute("data-end")).format(
      "hh:mm A"
    );

    switch (day) {
      case "Monday":
        this.setState({ time1: sTime, time2: eTime });
        break;
      case "Tuesday":
        this.setState({ time3: sTime, time4: eTime });
        break;
      case "Wednesday":
        this.setState({ time5: sTime, time6: eTime });
        break;
      case "Thursday":
        this.setState({ time7: sTime, time8: eTime });
        break;
      case "Friday":
        this.setState({ time9: sTime, time10: eTime });
        break;
      case "Saturday":
        this.setState({ time11: sTime, time12: eTime });
        break;
      default:
        this.setState({ time13: sTime, time14: eTime });
        break;
    }
  };

  render() {
    // console.log(this.props.cronofyEvents?.events);

    // debugger;
    const { amenities, features } = this.props;
    const {
      time1,
      time2,
      time3,
      time4,
      time5,
      time6,
      time7,
      time8,
      time9,
      time10,
      time11,
      time12,
      time13,
      time14,
      rules,
      cronofy
    } = this.state;
    return (
      <section className="">
        <div className="product-box">
          <h2>Amenties</h2>
          <div className="custom_radio_group">
            {amenities.map((item, i) => (
              <label
                className={`custom_radio ${"custom_radio-active"}`}
                key={i}
              >
                <input
                  value={item.id}
                  onChange={this.checkAmenities}
                  type="checkbox"
                  name="root"
                />
                <span></span>
                <img src={item.path} />
                {item.name}
              </label>
            ))}
          </div>
        </div>
        <div className="product-box">
          <h2>Special features</h2>
          <div className="custom_radio_group">
            {features.map((item, i) => (
              <label className="custom_radio" key={i}>
                <input
                  value={item.id}
                  onChange={this.checkSpecialFeatures}
                  type="checkbox"
                  name="root"
                />
                <span></span>
                <img src={item.path} />
                {item.name}
              </label>
            ))}
          </div>
        </div>

        <div className="product-box">
          <div className="row">
            <div className="col-sm-6">
              <div className="hours-box">
                <h2>Operating Hours</h2>
                <div className="hours-list">
                  <div className="row">
                    <div className="col-2">Monday</div>
                    <div className="col-5 pr-1">
                      <div
                        className={`form-group ddlWrapper ${time1 !==
                          "Select" && "active"}`}
                      >
                        <Dropdown
                          changeItem={this.changeTimeOne}
                          item={time1}
                          list={times}
                        />
                      </div>
                    </div>
                    <div className="col-5 pl-0">
                      <div
                        className={`form-group ddlWrapper ${time2 !==
                          "Select" && "active"}`}
                      >
                        <Dropdown
                          changeItem={this.changeTimeTwo}
                          item={time2}
                          list={times}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hours-list">
                  <div className="row">
                    <div className="col-2">Tuesday</div>
                    <div className="col-5 pr-1">
                      <div
                        className={`form-group ddlWrapper ${time3 !==
                          "Select" && "active"}`}
                      >
                        <Dropdown
                          changeItem={this.changeTimeThree}
                          item={time3}
                          list={times}
                        />
                      </div>
                    </div>
                    <div className="col-5 pl-0">
                      <div
                        className={`form-group ddlWrapper ${time4 !==
                          "Select" && "active"}`}
                      >
                        <Dropdown
                          changeItem={this.changeTimeFour}
                          item={time4}
                          list={times}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hours-list">
                  <div className="row">
                    <div className="col-2">Wednesday</div>
                    <div className="col-5 pr-1">
                      <div
                        className={`form-group ddlWrapper ${time5 !==
                          "Select" && "active"}`}
                      >
                        <Dropdown
                          changeItem={this.changeTimeFive}
                          item={time5}
                          list={times}
                        />
                      </div>
                    </div>
                    <div className="col-5 pl-0">
                      <div
                        className={`form-group ddlWrapper ${time6 !==
                          "Select" && "active"}`}
                      >
                        <Dropdown
                          changeItem={this.changeTimeSix}
                          item={time6}
                          list={times}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hours-list">
                  <div className="row">
                    <div className="col-2">Thursday</div>
                    <div className="col-5 pr-1">
                      <div
                        className={`form-group ddlWrapper ${time7 !==
                          "Select" && "active"}`}
                      >
                        <Dropdown
                          changeItem={this.changeTimeSeven}
                          item={time7}
                          list={times}
                        />
                      </div>
                    </div>
                    <div className="col-5 pl-0">
                      <div
                        className={`form-group ddlWrapper ${time8 !==
                          "Select" && "active"}`}
                      >
                        <Dropdown
                          changeItem={this.changeTimeEight}
                          item={time8}
                          list={times}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hours-list">
                  <div className="row">
                    <div className="col-2">Friday</div>
                    <div className="col-5 pr-1">
                      <div
                        className={`form-group ddlWrapper ${time9 !==
                          "Select" && "active"}`}
                      >
                        <Dropdown
                          changeItem={this.changeTimeNine}
                          item={time9}
                          list={times}
                        />
                      </div>
                    </div>
                    <div className="col-5 pl-0">
                      <div
                        className={`form-group ddlWrapper ${time10 !==
                          "Select" && "active"}`}
                      >
                        <Dropdown
                          changeItem={this.changeTimeTen}
                          item={time10}
                          list={times}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hours-list">
                  <div className="row">
                    <div className="col-2">Saturday</div>
                    <div className="col-5 pr-1">
                      <div
                        className={`form-group ddlWrapper ${time11 !==
                          "Select" && "active"}`}
                      >
                        <Dropdown
                          changeItem={this.changeTimeEleven}
                          item={time11}
                          list={times}
                        />
                      </div>
                    </div>
                    <div className="col-5 pl-0">
                      <div
                        className={`form-group ddlWrapper ${time12 !==
                          "Select" && "active"}`}
                      >
                        <Dropdown
                          changeItem={this.changeTimeTwelve}
                          item={time12}
                          list={times}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hours-list">
                  <div className="row">
                    <div className="col-2">Sunday</div>
                    <div className="col-5 pr-1">
                      <div
                        className={`form-group ddlWrapper ${time13 !==
                          "Select" && "active"}`}
                      >
                        <Dropdown
                          changeItem={this.changeTimeThirteen}
                          item={time13}
                          list={times}
                        />
                      </div>
                    </div>
                    <div className="col-5 pl-0">
                      <div
                        className={`form-group ddlWrapper ${time14 !==
                          "Select" && "active"}`}
                      >
                        <Dropdown
                          changeItem={this.changeTimeFourteen}
                          item={time14}
                          list={times}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="hours-box">
                <h2>Rules</h2>
                <div className="form-group">
                  <TextAreaControl
                    placeHolder="Enter Rules"
                    value={rules}
                    changeText={this.changeRules}
                    label="Description"
                  />
                </div>
              </div>
              {this.props?.cronofyEvents?.events ? (
                <div className={"cronofy-events"}>
                  <h3>Events</h3>
                  {this.props.cronofyEvents.events.map(event => (
                    <div
                      data-start={event.start}
                      data-end={event.end}
                      onClick={this.handlerChooseEvent}
                    >
                      <span>Name: {event.summary}</span>
                      <span>Day: {moment(event.start).format("dddd")}</span>

                      <span>
                        Time:{" "}
                        {moment(event.start).format("hh:mm A") +
                          "-" +
                          moment(event.end).format("hh:mm A")}
                      </span>

                      <span>Status: {event.event_status}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          {this.props.validError && (
            <div className={"error-msg"}>
              <p>please fill in all fields</p>
            </div>
          )}
          <div className="row">
            <div className="col-md-12 text-center">
              <button onClick={this.submitVenue} className="btn-venue">
                Save
              </button>
            </div>
          </div>
        </div>

        {this.props.cronofyEvents !== undefined &&
          !this.props.cronofyEvents?.events && (
            <Dialog onClose={this.handleClose} open={this.state.open}>
              <DialogTitle
                className={"dialog-cronofy"}
                onClose={this.handleClose}
              >
                <h3>Input your cronofy data</h3>
                <IconButton aria-label="close" onClick={this.handleClose}>
                  X
                </IconButton>
              </DialogTitle>

              <div className={"wrapper-dialog-cronofy"}>
                <TextField
                  onChange={this.handlerChangeCronofyField}
                  name="clientId"
                  label="client id"
                />
                <TextField
                  onChange={this.handlerChangeCronofyField}
                  name="secret"
                  label="secret"
                />
                <TextField
                  onChange={this.handlerChangeCronofyField}
                  name="accessToken"
                  label="access token"
                />
                <TextField
                  onChange={this.handlerChangeCronofyField}
                  name="timezone"
                  label="timezone"
                />

                <Button onClick={this.handlerClickCronofy} variant="contained">
                  Send
                </Button>
              </div>
            </Dialog>
          )}
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: isAuthenticated(state),
    amenities: state.place.amenities,
    features: state.place.features,
    validError: state.place.validError,
    cronofyEvents: state.place.cronofyEvents,
    cronofy: state.place.cronofy
  };
};

export default connect(mapStateToProps, {
  validationError,
  amenitiesList,
  featuresList,
  getCronofyEvents,
  sendCronofy
})(AddAmenities);
