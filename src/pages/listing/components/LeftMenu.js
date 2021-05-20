import React from "react";

import styled from "styled-components";
import { checkAuth } from "../../../redux/actions/users.actions/auth.thunk";
import { connect } from "react-redux";
import { Form, FormGroup, Container, Row, Col, Label } from "reactstrap";
import { Toggle } from "react-toggle-component";
import Autocomplete from "react-google-autocomplete";
import "./LeftMenu.scss";
import { Field, reduxForm, getFormValues } from "redux-form";
import { RangeSlider } from "../../../components/styledComp/RangeSlider";
import VenueButton from "../../../components/styledComp/VenueButton";
import {
  eventsList,
  amenitiesList,
  categoriesList
} from "../../../redux/actions/places.actions/places.thunk";
import {
  checkEvents,
  checkAmenities,
  checkRadioCategories,
  categoriesRequest
} from "../../../redux/actions/places.actions/places.actions";
import { AirbnbRangeDatesPicker } from "../../../components/styledComp/AirbnbRangeDatesPicker";
import { AirbnbCalendarOnly } from "../../../components/styledComp/AirbnbCalendarOnly";
import {
  getSearchPlace,
  searchCity,
  searchFilter
} from "../../../redux/actions/places.actions/searchPlace.thunk";
import { searchCityReset } from "../../../redux/actions/places.actions/searchPlace.actions";

import { PlusFilter, MinusFilter, SeparationLine } from "./FilterToggleButtons";

const SearchButton = styled(VenueButton)`
  background: #04d2ff;
  padding: 10px 0;
  width: 100%;
`;

const LabelStyled = styled(Label)`
  display: flex;
  align-items: center;
  > div {
    display: flex;
    align-items: center;
    margin-right: 5px !important;
    > input {
      -webkit-appearance: none;
      appearance: none;
      width: 16px;
      height: 16px;
      border: 1px solid #dde2eb;
      border-radius: 5px;
      &:checked {
        background: #04d2ff;
      }
      &:checked::before {
        height: 16px;
        width: 16px;
        color: #fff;
        content: "✔";
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
`;

const LabelClickable = styled(Label)`
  width: 100%;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
`;

const FormStyled = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const FormGroupStyled = styled(FormGroup)`
  display: flex;
  flex-direction: column;
`;

const RadioLabel = styled(Label)`
  display: flex;
  align-items: center;
  > div {
    display: flex;
    align-items: center;
    margin-right: 5px !important;
  }
`;

class LeftMenu extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   formatted_address: '',
    //   lng: '',
    //   lat: '',
    //   events: [],
    //   amenities: [],
    //   categories: []
    // }
    this.state = {
      formatted_address: "",
      // lng: '',
      // lat: '',
      capacity_min: 0,
      capacity_max: 0,
      price_min: 0,
      price_max: 0,
      date_min: 0,
      date_max: 0,
      square_min: 0,
      square_max: 0,
      toggleLocation: true,
      toggleCategories: true,
      toggleEvents: true,
      toggleCapacity: true,
      toggleSquare: true,
      togglePrice: true,
      toggleCalendar: true
    };
  }
  // state = {
  //   formatted_address: '',
  //   lng: '',
  //   lat: '',
  //   events: [],
  //   amenities: [],
  //   categories: []
  // };
  componentDidMount() {
    this.props.eventsList();
    this.props.amenitiesList();
    this.props.categoriesList();
    this.getDataPayload();

    // console.log('payload', payload)
  }

  getDataPayload = () => {
    const url = new URL(window.location.href);
    const formatted_address = url.searchParams.get("formatted_address");
    const date_from = url.searchParams.get("date_from");
    const date_to = url.searchParams.get("date_to");
    const price_min = +url.searchParams.get("price_min");
    const price_max = +url.searchParams.get("price_max");
    const capacity_min = +url.searchParams.get("capacity_min");
    const capacity_max = +url.searchParams.get("capacity_max");
    const square_min = +url.searchParams.get("square_min");
    const square_max = +url.searchParams.get("square_max");

    this.setState(
      {
        formatted_address,
        date_from,
        date_to,
        price_min,
        price_max,
        capacity_min,
        capacity_max,
        square_min,
        square_max
      },
      () =>
        console.log(
          "eprfhwieufguowerfghuyiewfguywerfguywerfgouwegfoewg",
          this.state
        )
    );
    this.onPlaceSelected({ formatted_address });
  };

  getInitialState() {
    return {
      formatted_address: "",
      lng: "",
      lat: "",
      date: { from: null, to: null },
      price: { min: null, max: null },
      capacity: { min: null, max: null },
      square: { min: null, max: null }
    };
  }

  onToggleLocation = () => {
    this.setState({
      toggleLocation: !this.state.toggleLocation
    });
  };

  onToggleCategories = () => {
    this.setState({
      toggleCategories: !this.state.toggleCategories
    });
  };

  onToggleEvents = () => {
    this.setState({
      toggleEvents: !this.state.toggleEvents
    });
  };

  onToggleCapacity = () => {
    this.setState({
      toggleCapacity: !this.state.toggleCapacity
    });
  };

  onToggleSquare = () => {
    this.setState({
      toggleSquare: !this.state.toggleSquare
    });
  };

  onTogglePrice = () => {
    this.setState({
      togglePrice: !this.state.togglePrice
    });
  };

  onToggleCalendar = () => {
    this.setState({
      toggleCalendar: !this.state.toggleCalendar
    });
  };

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

  componentWillUnmount() {
    this.props.searchCityReset();
  }

  searchHandler = () => {
    const {
      searchFilter,
      checkedEvents,
      radioCategories
      // price,
      // capacity,
      // square,
    } = this.props;
    const {
      formatted_address,
      date,
      price_min,
      price_max,
      capacity_min,
      capacity_max,
      square_min,
      square_max
    } = this.state;

    const data = {
      formatted_address,
      date_from: date && date.from,
      date_to: date && date.to,
      price_min: price_min,
      price_max: price_max,
      capacity_min: capacity_min,
      capacity_max: capacity_max,
      square_min: square_min,
      square_max: square_max,
      category_name: radioCategories,
      checkedEvents: checkedEvents
    };
    console.log("data", data);

    let formDataTemp = {};
    for (const field in data) {
      if (data[field] !== null && data[field] && data[field].length !== 0) {
        formDataTemp = { ...formDataTemp, [field]: data[field] };
        console.log("data[field]", data[field]);
      }
    }
    console.log("formDataTemp", formDataTemp);
    searchFilter(formDataTemp);
  };

  renderInput = ({
    input,
    meta,
    type,
    placeholder,
    key,
    id,
    name,
    value,
    checked
  }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <input
          {...input}
          autoComplete="off"
          type={type}
          placeholder={placeholder}
          key={key}
          id={id}
          name={name}
          value={value}
          checked={!!checked}
        />
        {this.renderError(meta)}
      </div>
    );
  };

  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  onPlaceSelected = async place => {
    const { formatted_address } = place;
    // const lng = place.geometry.location.lng();
    // const lat = place.geometry.location.lat();
    console.log("formatted_address", formatted_address);
    this.setState({
      formatted_address,
      capacity_min: 0,
      capacity_max: 0,
      price_min: 0,
      price_max: 0,
      date_min: 0,
      date_max: 0,
      square_min: 0,
      square_max: 0
    });
    this.props.searchCity({ formatted_address });
  };

  onHandleChangeEvent = (index, event) => {
    // console.log('onHandleChangeEvent');
    const { events } = this.props;
    const eventsList = [];
    Object.assign(events[index], { isChecked: event.target.checked });
    events.map(item => {
      if (item.isChecked) {
        eventsList.push(item.id);
      }
    });
    // console.log('start checkEvents', eventsList);
    this.props.checkEvents(eventsList);
    // console.log('finish checkEvents');
  };

  onHandleCategories = (index, event) => {
    const { categories } = this.props;

    // let clearCategories = categories.find(item => item.isChecked);
    // clearCategories && delete clearCategories.isChecked;
    let category = [];
    Object.assign(categories[index], { isChecked: event.target.checked });
    categories.find(item => {
      if (item.isChecked) {
        category.push(item.id);
      }
    });
    console.log("category=============", category);
    // console.log('start radioCategories', category);
    this.props.checkRadioCategories(category);
    // console.log('finish radioCategories');
  };

  liftUpDates = (from, to) => {
    // this.props.change('datepickersssss', { from, to })
    this.setState({ date: { from, to } });
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

  render() {
    const {
      isAuthenticated,
      events,
      amenities,
      checkedEvents,
      checkedAmenities,
      capacity,
      square,
      price,
      categories
    } = this.props;
    const {
      capacity_min,
      capacity_max,
      price_min,
      price_max,
      date_from,
      date_to,
      square_min,
      square_max,
      toggleLocation,
      toggleCategories,
      toggleEvents,
      toggleCapacity,
      toggleSquare,
      togglePrice,
      toggleCalendar
    } = this.state;
    return (
      <>
        <FormStyled
          onSubmit={e => {
            e.preventDefault();
          }}
          // {this.props.handleSubmit(this.searchHandler)}
          className="ui form error"
        >
          {/* <Col className="leftMenuListing" > */}
          <p className="filtersWord">Filters</p>

          {/* <Col xs="4 my-auto pr-0 text-right">
            <p className="subtext">Show a map</p>
          </Col> */}

          {/* <Col xs="3 pl-0">
            <Toggle
              leftBackgroundColor="#DDE2EB"
              leftBorderColor="#DDE2EB"
              rightBackgroundColor="#04D2FF"
              rightBorderColor="#04D2FF"
              knobColor="white"
              name="toggle-3"
              height="30px"
              width="45px"
              knobWidth="26px"
              knobHeight="26px"
              onToggle={e => // console.log('onToggle', e.target.checked)}
            />
          </Col> */}
          {/* <Col xs="6"> */}

          <FormGroup>
            <LabelClickable onClick={this.onToggleLocation}>
              Location
              {toggleLocation ? <MinusFilter /> : <PlusFilter />}
            </LabelClickable>
            {toggleLocation && (
              <Autocomplete
                onPlaceSelected={this.onPlaceSelected}
                types={["(regions)"]}
                componentRestrictions={{ country: "us" }}
                placeholder="Santa Monica, Los Angeles"
                value={
                  this.state.formatted_address
                    ? this.state.formatted_address
                    : undefined
                }
                onChange={() => this.setState({ formatted_address: "" })}
              />
            )}
            <SeparationLine />
          </FormGroup>

          <FormGroup>
            <LabelClickable onClick={this.onToggleCategories}>
              Venue type
              {toggleCategories ? <MinusFilter /> : <PlusFilter />}
            </LabelClickable>
            {toggleCategories && (
              <Row>
                <Col xs="6" className="pr-0">
                  {categories.length &&
                    categories.map((category, index) => {
                      while (index < 6)
                        return (
                          <RadioLabel key={index}>
                            <Field
                              id={category.id}
                              name="categories"
                              component={this.renderInput}
                              type="checkbox"
                              value={category.id}
                              checked={category.isChecked}
                              onChange={this.onHandleCategories.bind(
                                this,
                                index
                              )}
                            />
                            {category.category_name}
                          </RadioLabel>
                        );
                    })}
                </Col>
                <Col xs="6" className="pl-0">
                  {categories.length &&
                    categories.map((category, index) => {
                      while (index > 5 && index < categories.length) {
                        return (
                          <RadioLabel key={index}>
                            <Field
                              id={category.id}
                              name="categories"
                              component={this.renderInput}
                              type="checkbox"
                              value={category.id}
                              checked={category.isChecked}
                              onChange={this.onHandleCategories.bind(
                                this,
                                index
                              )}
                            />
                            {category.category_name}
                          </RadioLabel>
                        );
                      }
                    })}
                </Col>
              </Row>
            )}
            <SeparationLine />
          </FormGroup>

          <FormGroup>
            <LabelClickable onClick={this.onToggleEvents}>
              Type of event
              {toggleEvents ? <MinusFilter /> : <PlusFilter />}
            </LabelClickable>
            {toggleEvents && (
              <Row>
                <Col xs="6" className="pr-0">
                  {events.length &&
                    events.map((event, index) => {
                      while (index < 6)
                        return (
                          <LabelStyled key={index}>
                            <Field
                              component={this.renderInput}
                              type="checkbox"
                              name={`${event.id}-event`}
                              id={`${event.id}-event`}
                              checked={event.isChecked}
                              onChange={this.onHandleChangeEvent.bind(
                                this,
                                index
                              )}
                            />
                            {event.event}
                          </LabelStyled>
                        );
                    })}
                </Col>
                <Col xs="6" className="pl-0">
                  {events.length &&
                    events.map((event, index) => {
                      while (index > 5 && index < categories.length)
                        return (
                          <LabelStyled key={index}>
                            <Field
                              component={this.renderInput}
                              type="checkbox"
                              name={`${event.id}-event`}
                              id={`${event.id}-event`}
                              checked={event.isChecked}
                              onChange={this.onHandleChangeEvent.bind(
                                this,
                                index
                              )}
                            />
                            {event.event}
                          </LabelStyled>
                        );
                    })}
                </Col>
              </Row>
            )}
            <SeparationLine />
          </FormGroup>

          <FormGroup>
            <LabelClickable onClick={this.onToggleCapacity}>
              Guest count
              {toggleCapacity ? <MinusFilter /> : <PlusFilter />}
            </LabelClickable>
            {toggleCapacity && (
              // {capacity && (
              // <FormGroup>
              // {console.log('capacity_min', capacity_min, capacity_max)}
              // {console.log('capacity******', capacity.min, capacity.max)}

              // <Label for="Guests">Guest count</Label>
              <RangeSlider
                width="31"
                min={capacity.min}
                max={capacity.max}
                value_min={!!capacity_min ? capacity_min : capacity.min}
                value_max={!!capacity_max ? capacity_max : capacity.max}
                isDisabled={!!capacity.min ? false : true}
                liftUpCapacity={this.liftUpCapacity}
              />
            )}
            <SeparationLine />
          </FormGroup>

          {square && (
            <FormGroup>
              <LabelClickable onClick={this.onToggleSquare}>
                FT Square
                {toggleSquare ? <MinusFilter /> : <PlusFilter />}
              </LabelClickable>
              {toggleSquare && (
                <RangeSlider
                  width="31"
                  min={square.min}
                  max={square.max}
                  value_min={!!square_min ? square_min : square.min}
                  value_max={!!square_max ? square_max : square.max}
                  isDisabled={!!square.min ? false : true}
                  liftUpSquare={this.liftUpSquare}
                />
              )}
              <SeparationLine />
            </FormGroup>
          )}

          <FormGroup>
            <LabelClickable onClick={this.onTogglePrice}>
              Price
              {togglePrice ? <MinusFilter /> : <PlusFilter />}
            </LabelClickable>
            {togglePrice && (
              <RangeSlider
                width="31"
                min={price.min}
                max={price.max}
                value_min={!!price_min ? price_min : price.min}
                value_max={!!price_max ? price_max : price.max}
                isDisabled={!!price.min ? false : true}
                liftUpPrice={this.liftUpPrice}
              />
            )}
            <SeparationLine />
          </FormGroup>

          <FormGroupStyled>
            <LabelClickable onClick={this.onToggleCalendar}>
              Date of your event
              {toggleCalendar ? <MinusFilter /> : <PlusFilter />}
            </LabelClickable>
            {toggleCalendar && (
              <AirbnbCalendarOnly liftUpDates={this.liftUpDates} />
            )}
            <SeparationLine />
          </FormGroupStyled>

          <div style={{ textAlign: "center" }}>
            <SearchButton onClick={this.searchHandler}>Search</SearchButton>
          </div>
        </FormStyled>
      </>
    );
  }
}

const formWrapped = reduxForm({
  form: "LeftMenu"
})(LeftMenu);

const mapStateToProps = state => ({
  // data: state.searchPlace.place.filteredBuildingsInfo,
  isAuthenticated: state.auth.isAuthenticated,
  checkAuthError: state.auth.checkAuthError,
  loginError: state.auth.loginError,
  checkedEvents: state.place.checkedEvents,
  checkedAmenities: state.place.checkedAmenities,
  events: state.place.events,
  amenities: state.place.amenities,
  price: state.searchPlace.properties.price,
  capacity: state.searchPlace.properties.capacity,
  square: state.searchPlace.properties.square,
  categories: state.place.categories,
  radioCategories: state.place.radioCategories,
  formValues: getFormValues("LeftMenu")(state),
  searchCityError: state.searchPlace.searchCityError
});

export default connect(mapStateToProps, {
  checkAuth,
  checkEvents,
  checkAmenities,
  eventsList,
  amenitiesList,
  getSearchPlace,
  searchCity,
  searchFilter,
  categoriesList,
  checkRadioCategories,
  searchCityReset
})(formWrapped);
