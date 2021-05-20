import React, { Component } from "react";
import Event from "./Event";
import Location from "./Location";
import Dates from "./Dates";
import Attendees from "./Attendees";
import People from "./People";
import SeparateLine from "../../components/SeparateLine";
import Container from "reactstrap/lib/Container";
import "./style.scss";
import Price from "./Price";
import SortOrder from "./SortOrder";
import SpaceType from "./SpaceType";
import Popper from "@material-ui/core/Popper/Popper";

class Filter extends Component {
  render() {
    const {
      event,
      location,
      startDate,
      endDate,
      guests,
      price,
      onChangeFilters,
      onPlaceSelected,
      changeLocationState,
      searchHandler,
      placesName,
      title,
      changeFilterState,
      filter,
      changeSpaceTypeState,
      space,
      filterName,
      filterOrder,
      classes
    } = this.props;

    const CustomPopper = function(props) {
      return (
        <Popper
          {...props}
          style={{
            overflowWrap: "hidden",
            fontFamily: "Inter",
            fontSize: "14px",
            color: "#000022"
          }}
          placement="bottom-start"
        />
      );
    };

    return (
      <div className="filter-main-wrapper">
        <Container className="filter">
          <div className={`filter-row ${classes}`}>
            {title && <h1 className="title-search">{title}</h1>}
            <Event
              changeState={onChangeFilters}
              event={event}
              PopperComponent={CustomPopper}
            />
            <Location
              PopperComponent={CustomPopper}
              placesName={placesName}
              changeState={changeLocationState}
              onPlaceSelected={onPlaceSelected}
              location={location}
            />
            <Dates
              changeState={onChangeFilters}
              startDate={startDate}
              endDate={endDate}
            />
            {window.location.pathname !== "/" && (
              <>
                {/*<People changeState={onChangeFilters} guests={guests} />*/}
                <SpaceType
                  PopperComponent={CustomPopper}
                  changeSpaceTypeState={changeSpaceTypeState}
                  space={space}
                />
                <SortOrder
                  PopperComponent={CustomPopper}
                  filterName={filterName}
                  filterOrder={filterOrder}
                  changeFilterState={changeFilterState}
                  filter={filter}
                />
              </>
            )}

            <input
              type="submit"
              className="search_btn"
              value="Search"
              onClick={searchHandler}
            />
          </div>
        </Container>
      </div>
    );
  }
}

export default Filter;
