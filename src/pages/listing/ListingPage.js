import React from "react";
import {
  getCities,
  getSearchPlace,
  getEvents
} from "../../redux/actions/places.actions/searchPlace.thunk";
import { Container, Form } from "reactstrap";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { checkAuth } from "../../redux/actions/users.actions/auth.thunk";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SearchList from "./components/SearchList/index";
import "./components/MainBlock.scss";
import Filter from "../../components/Filter";
import history from "../../history";
import SortOrder from "../../components/Filter/SortOrder";
import { categoriesList } from "../../redux/actions/places.actions/places.thunk";

import fullLogo from "../../assets/Full_Logo.png";

class ListingPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.query = new URLSearchParams(this.props.location.search);
    this.state = {
      state: this.query.get("state") || "",
      event: this.query.get("event") || "",
      locationSelected: this.query.get("location") || "",
      startDate: this.query.get("date_from"),
      endDate: this.query.get("date_to"),
      guests: [5, 500],
      price: [this.query.get("price_min"), this.query.get("price_max")],
      skip: 0,
      offset: 1,
      limit: 12,
      filter: "",
      filterName: this.query.get("filterName"),
      filterOrder: this.query.get("filterOrder"),
      space: this.query.get("space") || ""
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
  changeSpaceTypeState = value => {
    this.setState({ space: value });
  };

  onPlaceSelected = place => {
    const { formatted_address } = place;
    this.setState(
      { location: formatted_address, locationSelected: formatted_address },
      () => this.change()
    );
  };

  change() {
    const {
      event,
      locationSelected,
      startDate,
      endDate,
      space,
      filter
    } = this.state;
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

    if (filter.Name) {
      searchString += `filterName=${filter.Name}&`;
    }
    if (filter.Value) {
      searchString += `filterOrder=${filter.Value}&`;
    }

    if (event === "Please check event") {
      searchString += "event=null&";
    } else if (event) {
      searchString += `event=${event}&`;
    }

    history.replace({ pathname: "", search: searchString });
    this.props.getSearchPlace(this.state);
  }

  componentDidMount() {
    this.props.getCities();
    this.props.getEvents();
    this.props.checkAuth();
    this.props.categoriesList();

    this.props.getSearchPlace(this.state);
  }

  onChangePaging = number => {
    this.setState({ offset: number });
    this.props.getSearchPlace({ ...this.state, offset: number });
  };
  changeLimitState = limit => {
    this.setState({ limit });
  };
  changeFilterState = filter => {
    this.setState({ filterName: filter.Name, filterOrder: filter.Value });
    this.setState({ filter });
  };

  render() {
    const { isAuthenticated, places } = this.props;
    const {
      event,
      locationSelected,
      startDate,
      endDate,
      guests,
      price,
      filter,
      offset,
      limit,
      space,
      filterName,
      filterOrder
    } = this.state;
    return (
      <div className="wrapper">
        <div className="0000">
          <Header
            fullLogo={fullLogo}
            classes={"top_header"}
            isAuthenticated={isAuthenticated}
            find={true}
          />
        </div>

        <Filter
          classes={"listing"}
          onChangeFilters={(value, valueType) =>
            this.changeState(value, valueType)
          }
          title={"Search Results"}
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
          changeFilterState={this.changeFilterState}
          filter={filter}
          filterName={filterName}
          filterOrder={filterOrder}
          changeSpaceTypeState={this.changeSpaceTypeState}
          space={space}
        />
        <SearchList
          limit={limit}
          changeLimitState={this.changeLimitState}
          changeFilterState={this.changeFilterState}
          filter={filter}
          places={places}
          offset={offset}
          getPlaces={this.onChangePaging}
        />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.searchPlace.place.filteredBuildingsInfo,
    loading: state.searchPlace.place.searchPlaceLoading,
    error: state.searchPlace.place.searchPlaceLoading,
    isAuthenticated: state.auth.isAuthenticated,
    checkAuthError: state.auth.checkAuthError,
    loginError: state.auth.loginError,
    places: state.searchPlace.places
  };
};

const ListingPageWithRouter = withRouter(ListingPage);

export default connect(mapStateToProps, {
  getSearchPlace,
  checkAuth,
  getCities,
  getEvents,
  categoriesList
})(ListingPageWithRouter);
