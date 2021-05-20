import React from "react";
import {
  getCities,
  getSearchPlace,
  getEvents
} from "../../redux/actions/places.actions/searchPlace.thunk";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { checkAuth } from "../../redux/actions/users.actions/auth.thunk";

import FilterHomeNew from "../../components/FilterHomeNew";
import history from "../../history";

import "./style.scss";
import Location from "../FilterHomeNew/Location/index";
import Event from "../FilterHomeNew/Event/index";
import TimePicker from "../TimePicker";

class ListingPageHome extends React.PureComponent {
  constructor(props) {
    super(props);
    this.query = new URLSearchParams(this.props.location.search);

    this.state = {
      event: this.query.get("event") || "",
      locationSelected: this.query.get("location") || "",
      startDate: this.query.get("date_from"),
      endDate: this.query.get("date_to"),
      guests: [5, 500],
      price: [this.query.get("price_min"), this.query.get("price_max")],
      skip: 0,
      limit: 4
    };
  }

  changeState(value, valueType) {
    this.setState(state => ({ ...state, [valueType]: value }));
  }

  searchHandler = () => {
    this.change();
  };

  changeLocationState = value => {
    this.setState({ locationSelected: value });
  };

  onPlaceSelected = place => {
    const { formatted_address } = place;
    this.setState(
      { location: formatted_address, locationSelected: formatted_address },
      () => this.change()
    );
  };

  change() {
    const { event, locationSelected, startDate, endDate, space } = this.state;
    let searchString = "?";

    if (startDate) {
      searchString += `date_from=${startDate}&`;
    }

    if (endDate) {
      searchString += `date_to=${endDate}&`;
    }

    if (locationSelected) {
      searchString += `location=${locationSelected}&`;
    }
    if (space) {
      searchString += `space=${space}&`;
    }
    if (event === "Please check event") {
      searchString += "event=null&";
    } else if (event) {
      searchString += `event=${event}&`;
    }

    history.push({ pathname: `/listing`, search: searchString });
  }

  componentDidMount() {
    this.props.getCities();
    this.props.getEvents();
    this.props.checkAuth();
    console.log(this.state);
    this.props.getSearchPlace(this.state);
  }

  onChangePaging = skip => {
    this.setState({ skip });
    this.props.getSearchPlace(this.state);
    // this.props.getSearchPlace(skip);
  };

  render() {
    const { isAuthenticated, places, classes } = this.props;
    const {
      event,
      locationSelected,
      startDate,
      endDate,
      guests,
      price
    } = this.state;
    return (
      <div className="listingPageHome">
        <FilterHomeNew
          classes={classes || ""}
          onChangeFilters={(value, valueType) =>
            this.changeState(value, valueType)
          }
          title={""}
          onPlaceSelected={this.onPlaceSelected}
          changeLocationState={this.changeLocationState}
          event={event}
          startDate={startDate}
          endDate={endDate}
          guests={guests}
          price={price}
          location={locationSelected}
          searchHandler={this.searchHandler}
          placesName={places}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.searchPlace.place.filteredBuildingsInfo,
    loading: state.searchPlace.place.searchPlaceLoading,
    error: state.searchPlace.place.searchPlaceLoading,
    places: state.searchPlace.places,
    isAuthenticated: state.auth.isAuthenticated,
    checkAuthError: state.auth.checkAuthError,
    loginError: state.auth.loginError
  };
};

const ListingPageWithRouter = withRouter(ListingPageHome);

export default connect(mapStateToProps, {
  getSearchPlace,
  checkAuth,
  getCities,
  getEvents
})(ListingPageWithRouter);
