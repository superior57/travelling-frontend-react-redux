import React from "react";
import { connect } from "react-redux";
import { Form } from "reactstrap";
import {
  categoriesList,
  venueCapacities,
  venueAreas,
  createPlaces,
  getCurrentExchangeRate,
  getLocation
} from "../../../../redux/actions/places.actions/places.thunk";

import { getEvents } from "../../../../redux/actions/places.actions/searchPlace.thunk";

import { isAuthenticated } from "../../../../redux/selectors/auth/auth.select";
import "./style.scss";
import InputControl from "../../../../components/InputControls/InputControl";
import TextAreaControl from "../../../../components/TextArea";
import CustomDropdown from "../../../../components/Dropdown/CustomDropdown";
import MultiselectInputAddOn from "../../../../components/InputControls/SelecteInputAddOn/multiselectInputAddOn";
import AddMedia from "../addmedia/add-media";
import AddAmenities from "../addamenities/add-amenities";
import styled from "styled-components";
import swal from "sweetalert";

// GOOGLE
import Autocomplete from "react-google-autocomplete";
// import { latest } from "immer/dist/common";
// map View
import MapContainer from "../../../../components/MapView/mapComponent";
import AddressExtracter from "../../../../components/MapView/addressExtractor";

import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField/TextField";
import FormControl from "@material-ui/core/FormControl/FormControl";
import { validationError } from "../../../../redux/actions/places.actions/places.actions";
import VenueType from "../../../../components/Filter/Venue/VenueType";

import DropdownTreeSelect from "react-dropdown-tree-select";
import "react-dropdown-tree-select/dist/styles.css";
import TreeSelect from "../components/TreeSelect";
import { setValid } from "../../../../redux/actions/users.actions/profile.actions";

const AutocompleteStyled = styled(Autocomplete)`
  border: solid 1px #e9e9e9;
  height: 40px;
  display: block;
  width: 100%;
  padding: 6px 12px;
  border-radius: 5px;
  font-size: 13px;
  font-weight: 300;
  line-height: normal;
  letter-spacing: normal;
  color: #a5a5a5;
`;

class BasicInfo extends React.PureComponent {
  state = {
    suite: "",
    currency: "",
    rateType: "",
    details: null,
    isOpen: false,
    venueType: "",
    venue: { id: "", name: "" },
    event: [],
    capacityType: "",
    capacity: "",
    areaType: "",
    area: { id: "", name: "" },
    name: "",
    rate: "",
    venueAddress: "",
    formatted_address: "n/a",
    venueState: "",
    city: "",
    zipCode: "",
    // googleProof: "",
    lat: "n/a",
    lng: "n/a",
    country: "",
    description: "",
    cleaningTime: 1,
    rateTimeItem: "Hourly",
    rateExcItem: "EUR",
    exchangeRatelist: [],
    features: {},
    images: [],
    amenities: [],
    specialFeatures: [],
    operatingHours: [],
    rules: "",
    step: 1,
    dropdownStatus: [
      { name: "currency", status: false },
      { name: "chargeType", status: false },
      { name: "area", status: false },
      { name: "vanueType", status: false },
      { name: "capacity", status: false },
      { name: "rateType", status: false }
    ],
    random: false,
    coordinates: { lat: 38.09, lng: -101.71 },
    venueTypeStatus: false,
    eventTypeStatus: false,
    capacityStatus: false,
    areaStatus: false,
    rateStatus: false,
    currencyStatus: false,
    chargeTypeStatus: false
  };

  componentDidMount() {
    this.props.getLocation();
    this.props.getCurrentExchangeRate();
    this.props.categoriesList();
    this.props.venueCapacities();
    this.props.venueAreas();
    this.props.getEvents();
    this.props.validationError(false);
  }

  componentDidUpdate() {
    const { allRates, saveVenue } = this.props;
    const { exchangeRatelist, coordinates } = this.state;
    if (allRates && exchangeRatelist.length === 0) {
      this.handleExchangeData();
    }
    if (saveVenue && coordinates.lat == 38.09 && coordinates.lng == -101.71) {
      this.setCurrentLocation();
    }
  }

  handleExchangeData = () => {
    const { allRates } = this.props;
    const { exchangeRatelist } = this.state;
    let keys = Object.keys(allRates);
    if (exchangeRatelist.length < 1) this.setState({ exchangeRatelist: keys });
  };

  setCurrentLocation = () => {
    const { saveVenue } = this.props;
    const { coordinates } = this.state;
    // console.log("Locaion from props-->,",saveVenue)
    let tmpObj = {
      lat: saveVenue.location.latitude,
      lng: saveVenue.location.longitude
    };
    this.setState({ coordinates: tmpObj });
  };

  submitVenue = submit => {
    if (submit) {
      //   debugger;
      const {
        name,
        venueType,
        rateTimeItem,
        capacityType,
        rate,
        areaType,
        venueAddress,
        city,
        venueState,
        zipCode,
        description,
        cleaningTime,
        images,
        amenities,
        specialFeatures,
        operatingHours,
        rules,
        country,
        lat,
        lng,
        formatted_address,
        features,
        suite,
        event,
        capacity,
        // googleProof,
        currency
      } = this.state;
      // const zipData = {
      //   zip_code: zipCode,
      //   street: venueAddress,
      //   floor: 1
      // };
      const data = {
        country_name: country,
        city_name: city,
        UserId: localStorage.getItem("id"),
        amenities: amenities,
        description: description,
        cleaningTime: cleaningTime,
        street: venueAddress,
        formatted_address: formatted_address,
        // guests: capacityType,
        mediaLinks: [],
        name: name,
        operatingHours: operatingHours,
        price: rate,
        rules: features,
        specialFeatures: specialFeatures,
        // square: areaType,
        zipCode: zipCode,
        lat: lat,
        lon: lng,
        renter_email: "",
        category_name: venueType,
        event_ids: event,
        currency: currency,
        area_id: areaType,
        capacity_id: capacity,
        images: images,
        rulemsg: rules,
        priceType: rateTimeItem,
        state: venueState,
        suite: suite
        // googleProof: googleProof
      };

      if (this.props.valid === undefined) {
        this.props.createPlaces(data);
      } else {
        this.props.setValid({ valid: true, open: true });
      }

      // swal("Sucess", "Venue created successfully.", "success").then(() => {
      //   window.location.href = "/";
      // });
      //alert('Venue created successfully.');
    }
  };

  changeSuite = e => {
    this.setState({ suite: e.target.value });
  };

  changeVenueName = e => {
    this.setState({ name: e.target.value });
  };

  changeItemVenueType = (item, data, currentName) => {
    this.setState({ venueType: currentName });
  };
  changeItemEventType = e => {
    //this.setState({ eventType: item.id, event: [...this.state.event, item] });
    //this.setState({ eventType: item.id, event: item });

    this.setState({
      event: e.target.value
    });
  };

  rateTimeChange = item => {
    this.setState({ rateTimeItem: item });
  };

  currencyRateChange = item => {
    this.setState({ rateExcItem: item });
  };

  changeItemCapacity = e => {
    this.setState({ capacity: e.target.value });
  };

  changeItemRateType = item => {
    this.setState({ currency: item });
  };

  changeItemRate = e => {
    this.setState({ rate: e.target.value });
  };

  disableDropdown = param => {
    console.log("Params for disabling-->", param);
  };

  // clickDropDown=(entity)=>{
  //  const {dropdownStatus} = this.state;
  //  let ind = dropdownStatus.findIndex((ele)=>ele.name == entity)
  //  let flag = dropdownStatus[ind].status
  //  dropdownStatus[ind].status= !flag;
  // }

  handleOutSide = type => {
    this.setState({
      areaStatus: false,
      rateStatus: false,
      venueTypeStatus: false,
      eventTypeStatus: false,
      capacityStatus: false,
      currencyStatus: false,
      chargeTypeStatus: false
    });
  };

  onClickHandle = type => {
    const {
      areaStatus,
      rateStatus,
      venueTypeStatus,
      eventTypeStatus,
      capacityStatus,
      currencyStatus,
      chargeTypeStatus
    } = this.state;
    switch (type) {
      case "currency":
        this.setState({
          areaStatus: false,
          rateStatus: false,
          venueTypeStatus: false,
          eventTypeStatus: false,
          capacityStatus: false,
          currencyStatus: !currencyStatus,
          chargeTypeStatus: false
        });
        break;
      case "chargeType":
        this.setState({
          areaStatus: false,
          rateStatus: false,
          venueTypeStatus: false,
          capacityStatus: false,
          currencyStatus: false,
          chargeTypeStatus: !chargeTypeStatus
        });
        break;
      case "area":
        this.setState({
          rateStatus: false,
          areaStatus: !areaStatus,
          venueTypeStatus: false,
          capacityStatus: false,
          currencyStatus: false,
          chargeTypeStatus: false,
          eventTypeStatus: false
        });
        break;
      case "capacity":
        this.setState({
          areaStatus: false,
          rateStatus: false,

          venueTypeStatus: false,
          capacityStatus: !capacityStatus,
          currencyStatus: false,
          chargeTypeStatus: false,
          eventTypeStatus: false
        });
        break;
      case "vanueType":
        this.setState({
          rateStatus: false,

          areaStatus: false,
          venueTypeStatus: !venueTypeStatus,
          capacityStatus: false,
          currencyStatus: false,
          chargeTypeStatus: false,
          eventTypeStatus: false
        });
        break;
      case "eventType":
        this.setState({
          rateStatus: false,

          areaStatus: false,
          venueTypeStatus: false,
          capacityStatus: false,
          currencyStatus: false,
          chargeTypeStatus: false,
          eventTypeStatus: !eventTypeStatus
        });
        break;
      case "rateType":
        this.setState({
          rateStatus: !eventTypeStatus,
          areaStatus: false,
          venueTypeStatus: false,
          capacityStatus: false,
          currencyStatus: false,
          chargeTypeStatus: false,
          eventTypeStatus: false
        });
        break;
      default:
    }
  };

  openStatus = data => {
    const { dropdownStatus } = this.state;
    if (data) {
      dropdownStatus.forEach(
        (ele, ind) => {
          if (data.status) {
            if (ele.name !== data.name) {
              ele.status = false;
            } else {
              ele.status = true;
            }
          } else {
            ele.status = false;
          }
        },
        () => {
          this.setState({
            random: !this.state.random
          });
        }
      );
    }
  };

  changeItemArea = e => {
    // this.setState({ areaType: item.id, area: item });

    this.setState({ areaType: Number(e.target.value) });
  };

  changeVenueAddress = e => {
    // `https://maps.googleapis.com/maps/api/js?key=${`AIzaSyDI6ER8zACWkCG3oVhNHkOXqLkai7wVNao`}&libraries=places`,

    //https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY

    this.setState({ venueAddress: e.target.value });
  };

  changeCityInput = event => {
    this.setState({ city: event.target.value });
  };

  changeStateInput = event => {
    this.setState({ venueState: event.target.value });
  };

  changeCountryInput = event => {
    this.setState({ country: event.target.value });
  };

  changeZipCode = event => {
    this.setState({ zipCode: event.target.value });
  };

  changeGoogleProof = event => {
    this.setState({ googleProof: event.target.value });
  };

  changeMessage = event => {
    this.setState({ description: event.target.value });
  };

  changeCleaningTime = event => {
    this.setState({ cleaningTime: event.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    let stop = false;

    const {
      name,
      rate,
      area,
      description,
      event,
      zipCode,
      country,
      venueState,
      city,
      venueAddress,
      capacity,
      cleaningTime,
      venue,
      rateTimeItem,
      rateExcItem
    } = this.state;

    const stepOne = [
      name,
      rate,
      area,
      description,
      event,
      zipCode,
      country,
      venueState,
      city,
      venueAddress,
      capacity,
      cleaningTime,
      venue,
      rateTimeItem,
      rateExcItem
    ];

    for (let value of stepOne) {
      if (typeof value === "object" && value.length === 0) {
        stop = true;
        break;
      } else if (value === "") {
        stop = true;
        break;
      }
    }

    if (stop) {
      this.props.validationError(true);
    } else {
      this.setState({
        step: 2
      });
      this.props.step(this.state.step);
    }
  };

  onPlaceSelected = async place => {
    // debugger;
    const { formatted_address } = place;
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    let state_code = formatted_address.split(",")[1];
    if (state_code.includes(" ")) {
      state_code = state_code.split(" ")[1];
    }
    var state_name = "";
    place.address_components.forEach(rec => {
      if (rec.short_name == state_code) {
        state_name = rec.long_name;
      }
    });
    const city_name = formatted_address.split(",")[0];
    const country_name = formatted_address.split(",")[2].split(" ")[1];
    this.setState({
      formatted_address: formatted_address,
      city: city_name,
      venueState: state_name,
      lat: lat,
      lng: lng,
      country: country_name || this.state.country
    });
  };

  getFeatures = features => {
    this.setState({ features: features });
  };

  getMedia = media => {
    if (media.length !== 0) {
      //   debugger;
      let files = [];
      media.forEach(file => {
        files.push({
          type: file.type,
          link: file.Key
        });
      });
      this.setState({ images: files });
    }
  };

  getStep = step => {
    // console.log("Get STep==>", step);
    this.setState({
      step: step
    });
    this.props.step(step);
  };

  getAmenities = amenities => {
    // debugger;
    this.setState({
      amenities: amenities
    });
  };

  getSpecialFeatures = features => {
    this.setState({
      specialFeatures: features
    });
  };

  getOperatingHours = hours => {
    this.setState({
      operatingHours: hours
    });
  };

  getRules = rules => {
    this.setState({
      rules: rules
    });
  };
  onPositionChange = e => {
    // console.log("Event=-->", e);
    const { coordinates, venueAddress } = this.state;
    this.setState({
      coordinates: e.center
    });
    // console.log(res.data.CustomAddress);

    AddressExtracter(coordinates.lat, coordinates.lng).then(res => {
      // console.log("response -->", res);

      if (res && res.status === "Success") {
        const {
          city1,
          country,
          locality,
          postal_code,
          state,
          street_number
        } = res.data.CustomAddress;
        if (typeof (parseInt(street_number) === "number")) {
          // this.setState({
          //   venueAddress: street_number + "," + city1
          // });
        }
        this.setState({
          // venueAddress: city1,
          zipCode: postal_code,
          venueState: state,
          city: locality,
          country: country
        });
      }
    });
  };

  UNSAFE_componentWillReceiveProps = props => {
    let location = {
      lat: props.saveVenue.location.latitude,
      lng: props.saveVenue.location.longitude
    };

    if (location !== this.state.coordinates) {
      this.setState({ coordinates: location });
    }
  };

  onChange = (currentNode, selectedNodes) => {
    let eventArray = [];

    if (selectedNodes) {
      selectedNodes.map(item => {
        if (item._children) {
          eventArray = [...eventArray, ...item._children];
        }
        if (item.id) {
          eventArray = [...eventArray, item.id];
        }
      });
    }

    this.setState({
      event: eventArray
    });
  };

  render() {
    const { categories, capacities, areas, events, location } = this.props;

    const getCountry = require("country-currency-map").getCountry;
    const rateYourCountry =
      location.country_name && getCountry(location.country_name).currency;
    let rateList = [];
    if (rateYourCountry === "USD") {
      rateList = [rateYourCountry];
    } else {
      rateList = ["USD", rateYourCountry];
    }

    const {
      name,
      rate,
      zipCode,
      venueState,
      venueAddress,
      description,
      areaType,
      venue,
      venueType,
      capacity,
      cleaningTime,
      rateTimeItem,
      rateExcItem,
      exchangeRatelist,
      city,
      dropdownStatus,
      currencyStatus,
      chargeTypeStatus,
      venueTypeStatus,
      areaStatus,
      capacityStatus,
      country,
      // googleProof,
      rateStatus,
      rateType,
      currency,
      suite
    } = this.state;
    return (
      <div className="create-place-container-venuesection-baseClass">
        {this.state.step === 1 ? (
          <>
            <div className="create-place-container-venuesection-baseClass-heading mobile-hidden">
              About Venue
            </div>
            <Form onSubmit={this.handleSubmit} className="form-block__form">
              <div className="row">
                <div className="col-md-6 col-md-6-first">
                  <InputControl
                    placeHolder="Enter name of venue"
                    value={name}
                    onTextChange={this.changeVenueName}
                    label="Venue Name"
                  />
                  <div className="row">
                    <div className="col-md-12">
                      <MultiselectInputAddOn
                        currency={currency || "Type"}
                        rateStatus={rateStatus}
                        list={rateList}
                        changeItemRateType={this.changeItemRateType}
                        onClickHandleOutside={() =>
                          this.handleOutSide("rateType")
                        }
                        onClickHandle={() => this.onClickHandle("rateType")}
                        classes={"time"}
                        onTextChange={this.changeItemRate}
                        value={rate}
                        label="Rates"
                        placeHolder="Enter"
                        onDropDownChange={this.rateTimeChange}
                        item={rateTimeItem}
                        listOfItem={["Hourly", "Per Day"]}
                        RateItem={rateExcItem}
                        listOfAllRates={exchangeRatelist}
                        openStatus={this.openStatus}
                        // enableThroughPropCurrency={dropdownStatus[0].status}
                        // enableThroughPropChargeType={dropdownStatus[1].status}
                        chargeTypeStatus={chargeTypeStatus}
                        chargeTypeOnClickHandleOutside={() =>
                          this.handleOutSide("chargeType")
                        }
                        chargeTypeOnClickHandle={() =>
                          this.onClickHandle("chargeType")
                        }
                      ></MultiselectInputAddOn>
                    </div>
                  </div>
                  <div className="row">
                    {events.events?.length && (
                      <div className="col-md-6 ddlWrapper">
                        <span className="ddlWrapper-title-mobile">events</span>
                        <div
                          style={{ width: "100%" }}
                          className="mobile-events"
                        >
                          <TreeSelect
                            placeholder={"What are you planning ..."}
                            data={events.events}
                            onChange={this.onChange}
                          />
                        </div>
                      </div>
                    )}

                    <div className="col-md-6 ddlWrapper">
                      <span>venue type</span>
                      <VenueType
                        AddnewVenueType={true}
                        changeState={this.changeItemVenueType}
                        venue={venueType}
                      />
                    </div>
                    <div className="col-md-6 ddlWrapper">
                      <InputControl
                        min={"5"}
                        max={"500"}
                        placeHolder="Enter capacity"
                        onTextChange={this.changeItemCapacity}
                        value={capacity}
                        label="capacity"
                        type={"number"}
                      />
                    </div>
                    <div className="col-md-6 ddlWrapper">
                      <span>CLEANING TIME ( in hours )</span>
                      <input
                        type="number"
                        className="form-control form-control_cleaning-time"
                        id="cleaningTime"
                        name="cleaningTime"
                        min="1"
                        value={cleaningTime}
                        onChange={this.changeCleaningTime}
                      />
                    </div>
                  </div>
                  <TextAreaControl
                    placeHolder="Enter description"
                    value={description}
                    changeText={this.changeMessage}
                    label="Description"
                  />
                </div>
                <div className="desktop-hidden">
                  <AddMedia
                  // step={this.state.step}
                  />
                </div>
                <div className="col-md-6 col-md-6-second">
                  <div className="row">
                    <div className="col-md-6">
                      <InputControl
                        placeHolder="address"
                        onTextChange={this.changeVenueAddress}
                        value={venueAddress}
                        label="VENUE Address"
                      />
                    </div>

                    <div className="col-md-6">
                      <div className="input-control">
                        <InputControl
                          placeHolder="Suite / Apt number"
                          onTextChange={this.changeSuite}
                          value={suite}
                          label="Apt number"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <InputControl
                        placeHolder="Enter State Name"
                        onTextChange={this.changeStateInput}
                        value={venueState}
                        label="STATE"
                      />
                    </div>
                    <div className="col-md-6">
                      <InputControl
                        placeHolder="Enter Country Name"
                        onTextChange={this.changeCountryInput}
                        value={country}
                        label="Country"
                      />
                    </div>
                    <div className="col-md-6">
                      <InputControl
                        placeHolder="Enter Zip Code"
                        onTextChange={this.changeZipCode}
                        value={zipCode}
                        label="ZIP"
                      />
                    </div>

                    <div className="col-md-6">
                      <InputControl
                        placeHolder="Enter City Name"
                        onTextChange={this.changeCityInput}
                        value={city}
                        label="City"
                      />
                    </div>

                    <div className="col-md-6">
                      <InputControl
                        placeHolder="Enter area"
                        onTextChange={this.changeItemArea}
                        value={areaType}
                        label="Area ( Square Feet )"
                        type={"number"}
                      />
                    </div>
                  </div>

                  <MapContainer
                    onChange={this.onPositionChange}
                    draggable={true}
                    coordinates={this.state.coordinates}
                    // center={this.state.coordinates}
                  />
                  {/* <div className="row">
                    <div className="col-md-12">
                      <button className="btn-venue">Next</button>
                    </div>
                  </div> */}
                </div>
              </div>
              <br className="mobile-hidden" />
              <br className="mobile-hidden" />
              <br className="mobile-hidden" />
              <div className="mobile-hidden">
                <AddMedia
                // step={this.state.step}
                />
              </div>
              <div className="row">
                <div className="col-md-12 text-center">
                  <button onClick={this.saveMedia} className="btn-venue">
                    Next
                  </button>
                </div>
              </div>
            </Form>
          </>
        ) : this.state.step === 2 ? (
          <AddAmenities
            saveVenueData={this.submitVenue}
            amenitiesData={this.getAmenities}
            specialFeaturesData={this.getSpecialFeatures}
            operatingHoursData={this.getOperatingHours}
            rulesData={this.getRules}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: isAuthenticated(state),
    categories: state.place.categories,
    capacities: state.place.capacities,
    areas: state.place.areas,
    saveVenue: state.place,
    allRates: state.allCurrencies.data,
    events: state.searchPlace.events,
    location: state.place.location,
    valid: state.profile.valid
  };
};
// valid: state.profile.valid,
//     setValid
export default connect(mapStateToProps, {
  getLocation,
  categoriesList,
  venueCapacities,
  venueAreas,
  createPlaces,
  getCurrentExchangeRate,
  getEvents,
  validationError,
  setValid
})(BasicInfo);
