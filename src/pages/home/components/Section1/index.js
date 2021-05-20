import React from "react";
import { connect } from "react-redux";
import history from "../../../../history";
import { reduxForm } from "redux-form";
import {
  getSearchPlace,
  searchCity
} from "../../../../redux/actions/places.actions/searchPlace.thunk";
import moment from "moment";

import { searchCityReset } from "../../../../redux/actions/places.actions/searchPlace.actions";

// COMPONENTS AND STYLES
import styled from "styled-components";
import { Container, Row, Col, Form, FormGroup, Label } from "reactstrap";
import VenueButton from "../../../../components/styledComp/VenueButton";
import AirbnbRangeDatesPicker from "../../../../components/styledComp/AirbnbRangeDatesPicker";
// import DatePicker from '../../../../components/DatePicker';
import RangeSlider from "../../../../components/Filter/RangeSlider";

import "./styles.scss";

// GOOGLE
import Autocomplete from "react-google-autocomplete";

// IMAGES
import TimePiker from "../../../../components/TimePicker";
import Attendees from "../../../../components/Filter/Attendees";

const SectionStyled = styled.section`
  padding: 130px 0;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: right;
`;

const FormStyled = styled(Form)`
  padding: 35px 35px;
`;

const FooterCopyright = styled.div`
  position: absolute;
  bottom: -130px;
  left: 0;
  padding-bottom: 1px;
  color: #ffffff;
  font-size: 18px;
`;

const SectionTitle = styled.h1`
  font-style: normal;
  font-weight: bold;
  font-size: 30px;
  font-family: Inter;
`;

const AutocompleteStyled = styled(Autocomplete)`
  height: 50px !important;
  border: 1px solid #cdcfdb !important;
  font-family: "Averta", sans-serif !important;
  font-size: 18px !important;
  font-weight: 300;
  letter-spacing: 0.16px;
`;

const ColStyled = styled(Col)`
  background-color: white;
  max-width: 450px;
  width: 100%;
  border-radius: 5px;
  padding: 0;
  height: 600px;
`;

const RowStyled = styled(Row)`
  display: flex;
  align-items: center;
  height: 90%;
`;

const DataPicker = styled(FormGroup)`
  display: flex;
  flex-direction: column;
`;

const SearchButton = styled(VenueButton)`
  background: #d7011a !important;
  border-radius: 24px;
  padding: 14px 35px;
  width: 123px;
  color: #ffffff;
  font-family: Inter;
  font-size: 14px;
  font-weight: 700;
`;

const LabelStyled = styled(Label)`
  font-family: Inter;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
`;

class Section1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formatted_address: "",
      capacity_min: 0,
      capacity_max: 100,
      price_min: 0,
      price_max: 1000,
      price_valid_max: true,
      price_bottom_value: 0,
      price_top_value: 1000,
      date_from: moment(),
      date_to: moment().add(1, "days"),
      square_min: 0,
      square_max: 1000,
      square_valid_max: true,
      square_bottom_value: 0,
      square_top_value: 1000,
      startTime: "00:00",
      endTime: "23:59",
      showSTime: false,
      showETime: false,
      guestsSelect: "5-300",
      guests: "",
      eventType: "",
      event: "null",
      validDateRange: true
    };
  }

  componentWillUnmount() {
    this.props.searchCityReset();
  }

  componentDidUpdate(prevProps) {
    const { capacity, price, square } = this.props;
    const newCapacity = this.compareFieldProps(prevProps.capacity, capacity);
    const newPrice = this.compareFieldProps(prevProps.price, price);
    const newSquare = this.compareFieldProps(prevProps.square, square);
    if (newCapacity) {
      this.setState({
        capacity_min: capacity.min,
        capacity_max: capacity.max
      });
    }
    if (newPrice) {
      this.setState({
        price_min: price.min,
        price_max: price.max
      });
    }
    if (newSquare) {
      this.setState({
        square_min: square.min,
        square_max: square.max
      });
    }
  }

  compareFieldProps = (prev, current) => {
    return JSON.stringify(prev) !== JSON.stringify(current);
  };

  onPlaceSelected = async place => {
    const { formatted_address } = place;
    this.setState({ formatted_address });
    // this.props.searchCity({formatted_address});
  };

  joinDateAndTime = (dateFrom, dateTo, timeFrom, timeTo) => {
    const startDateSec = dateFrom / 1000;
    const endDateSec = dateTo / 1000;

    const startDateTime = moment.unix(startDateSec);
    const endDateTime = moment.unix(endDateSec);

    const startTime = moment(timeFrom, "HH:mm");
    const endTime = moment(timeTo, "HH:mm");

    const startDate = startDateTime
      .hour(startTime.hours())
      .minute(startTime.minutes())
      .toISOString();

    const endDate = endDateTime
      .hour(endTime.hours())
      .minute(endTime.minutes())
      .toISOString();
    return { startDate, endDate };
    // return { startDate: '2019-12-26T10:00:00.000Z', endDate: '2019-12-26T10:00:00.000Z' };
  };

  searchHandler = () => {
    const { getSearchPlace } = this.props;
    const {
      formatted_address,
      date_from,
      date_to,
      startTime,
      endTime,
      event,
      eventType
    } = this.state;
    const { startDate, endDate } = this.joinDateAndTime(
      date_from,
      date_to,
      startTime,
      endTime
    );

    const data = {
      formatted_address,
      date_from: startDate,
      date_to: endDate,
      eventType,
      event
    };

    let formDataTemp = {};
    for (const field in data) {
      if (data[field] !== null) {
        formDataTemp = { ...formDataTemp, [field]: data[field] };
      }
    }

    const paramString = new URLSearchParams(formDataTemp);

    getSearchPlace(formDataTemp);

    history.push(`/listing/?${paramString}`);
  };

  liftUpDates = (fromDate, toDate) => {
    const range = toDate.diff(fromDate, "hours");
    if (range <= 24) {
      this.setState({
        date_from: fromDate,
        date_to: toDate,
        validDateRange: true
      });
    } else {
      this.setState({
        date_from: fromDate,
        date_to: toDate,
        validDateRange: false
      });
    }
  };

  liftUpCapacity = (min, max) => {
    this.setState({
      capacity_min: min || 0,
      capacity_max: max || 0
    });
  };

  liftUpSquare = (min, max) => {
    this.setState({
      square_min: min || 0,
      square_max: max || 0
    });
  };

  liftUpPrice = (min, max) => {
    this.setState({
      price_min: min || 0,
      price_max: max || 0
    });
  };

  changeState(event) {
    this.setState({
      eventType: event
    });
  }

  handleRangeChange = (type, value) => {
    this.setState({
      [`${type}_min`]: value[0],
      [`${type}_max`]: value[1]
    });
  };

  handleInputChangeMin = (evt, type) => {
    if (
      isNaN(evt.target.value) ||
      parseInt(evt.target.value) > this.state[`${type}_max`]
    ) {
      return;
    }

    if (evt.target.value === "") {
      this.setState({
        [`${type}_min`]: this.state[`${type}_bottom_value`]
      });
      return;
    }

    this.setState({
      [`${type}_min`]: parseInt(evt.target.value)
    });
  };

  handleInputChangeMax = (evt, type) => {
    if (isNaN(evt.target.value)) {
      return;
    }

    if (parseInt(evt.target.value) < this.state[`${type}_min`]) {
      this.setState({
        [`${type}_valid_max`]: false,
        canSearch: false
      });
    } else {
      this.setState({
        [`${type}_valid_max`]: true
      });
    }

    if (evt.target.value === "") {
      this.setState({
        [`${type}_max`]: this.state[`${type}_max`]
      });
      return;
    }
    this.setState({
      [`${type}_max`]: parseInt(evt.target.value)
    });
  };

  changeSTime(newTime) {
    this.setState({ startTime: newTime });
  }

  changeETime(newTime) {
    this.setState({ endTime: newTime });
  }

  changeShowSTime(value) {
    if (!this.state.showETime) {
      this.setState({ showSTime: value });
    }
  }

  changeShowETime(value) {
    if (!this.state.showSTime) {
      this.setState({ showETime: value });
    }
  }

  render() {
    const {
      formatted_address,
      price_valid_max,
      square_valid_max,
      startTime,
      showSTime,
      endTime,
      showETime,
      guestsSelect,
      validDateRange,
      eventType
    } = this.state;
    return (
      <SectionStyled>
        <div class="top_form">
          <Form
            onSubmit={e => {
              e.preventDefault();
            }}
          >
            <label className="top_form__big-label">
              Making every event better...
            </label>
            <FormGroup>
              <label className="top_form__form-groop-label">
                Enter city or zip code
              </label>
              <Autocomplete
                className="top_form__form-groop-autocomplete"
                id="city"
                onPlaceSelected={this.onPlaceSelected}
                types={["(regions)"]}
                componentRestrictions={{ country: "us" }}
                placeholder="Enter city or zip-code"
              />
            </FormGroup>
            <FormGroup>
              <label className="top_form__form-groop-label">Event groop</label>
              <Attendees
                type="home"
                changeState={value => this.changeState(value)}
              />
            </FormGroup>
            <DataPicker>
              <AirbnbRangeDatesPicker liftUpDates={this.liftUpDates} />
            </DataPicker>
            <FormGroup className="form-group-wrapper">
              <div className="form-group">
                <label className="top_form__form-groop-label">start time</label>
                {/* <input class="form-control" placeholder="Start Time" type="text" /> */}
                <TimePiker
                  id="start"
                  text=""
                  time={startTime}
                  setTime={value => this.changeSTime(value)}
                  showTime={showSTime}
                  setShowTime={value => this.changeShowSTime(value)}
                />
              </div>
              <div class="form-group">
                <label className="top_form__form-groop-label">
                  finish time
                </label>
                {/* <input class="form-control" placeholder="Finish Time" type="text" /> */}
                <TimePiker
                  id="finish"
                  text=""
                  time={endTime}
                  setTime={value => this.changeETime(value)}
                  showTime={showETime}
                  setShowTime={value => this.changeShowETime(value)}
                />
              </div>
            </FormGroup>
            <input
              type="submit"
              className="top_form__submit"
              value="Search"
              onClick={this.searchHandler}
            />
          </Form>
        </div>
        {/* <FormStyled
                                onSubmit={e => {
                                    e.preventDefault();
                                }}
                                className="ui form error"
                            >
                                <SectionTitle>Making every event better...</SectionTitle>
                                <div class="row">
                                    <div class="col-sm-2">
                                <div className="form-group__row form-group__row_top">
                                    <FormGroup>
                                        <LabelStyled for="city">Enter city or zip-code</LabelStyled>
                                        <AutocompleteStyled
                                            id="city"
                                            onPlaceSelected={this.onPlaceSelected}
                                            types={["(regions)"]}
                                            componentRestrictions={{ country: "us" }}
                                            placeholder="Enter city or zip-code"
                                        />
                                    </FormGroup>
                                </div></div>
                                <div class="col-sm-2">
                                <div className="event-type">
                                    <FormGroup>
                                        <LabelStyled>Event type</LabelStyled>
                                        <Attendees changeState={value => this.changeState(value)} />
                                    </FormGroup>
                                </div></div>
                                <div class="col-sm-2">
                                <Row>
                                    <Col xs="12">
                                        <div className="form-group__row">
                                            <div
                                                className={`form-group__valid-message ${
                                                    validDateRange ? "" : "show"
                                                    }`}
                                            >
                                                <DataPicker>
                                                    <AirbnbRangeDatesPicker
                                                        liftUpDates={this.liftUpDates}
                                                    />
                                                </DataPicker>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                </div>
                                <div class="col-sm-2">
                                <Row className="form-group__time">
                                    <Col xs="12">
                                        <div className="form-group__row">
                                            <TimePiker
                                                id="start"
                                                text="start time"
                                                time={startTime}
                                                setTime={value => this.changeSTime(value)}
                                                showTime={showSTime}
                                                setShowTime={value => this.changeShowSTime(value)}
                                            />
                                            <TimePiker
                                                id="finish"
                                                text="finish time"
                                                time={endTime}
                                                setTime={value => this.changeETime(value)}
                                                showTime={showETime}
                                                setShowTime={value => this.changeShowETime(value)}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                </div>
                                <div class="col-sm-2"></div>
                                <div className="form-group__row">
                                    <div
                                        className={`form-group__search-btn ${
                                            price_valid_max &&
                                                square_valid_max &&
                                                validDateRange &&
                                                formatted_address
                                                ? "ready"
                                                : ""
                                            }`}
                                    >
                                        <SearchButton href="/host" onClick={this.searchHandler}>
                                            Search
                    </SearchButton>
                    </div>
                                    </div>

                                </div>
                            </FormStyled> */}
      </SectionStyled>
    );
  }
}

const formWrapped = reduxForm({
  form: "Section1"
})(Section1);

const mapStateToProps = state => ({
  price: state.searchPlace.properties.price,
  capacity: state.searchPlace.properties.capacity,
  square: state.searchPlace.properties.square
});

export default connect(mapStateToProps, {
  getSearchPlace,
  searchCity,
  searchCityReset
})(formWrapped);
