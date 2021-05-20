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
import SearchLocationInput from "./SearchLocationInput";

class FilterHomeNew extends Component {
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

    return (
      <div className="filter-main-wrapper">
        <Container className="filter">
          <h1 className={"title-for-mobile"}>Enter activity</h1>

          <div className={`filter-row ${classes}`}>
            {title && <h1 className="title-search">{title}</h1>}

            <div className="home-searh-element-wrapper">
              <SearchLocationInput />
            </div>

            {/*<Location*/}
            {/*placesName={placesName}*/}
            {/*changeState={changeLocationState}*/}
            {/*onPlaceSelected={onPlaceSelected}*/}
            {/*location={location}*/}
            {/*/>*/}
            <Event changeState={onChangeFilters} event={event} />
            <Dates
              changeState={onChangeFilters}
              startDate={startDate}
              endDate={endDate}
            />
            {window.location.pathname !== "/" && (
              <>
                {/*<People changeState={onChangeFilters} guests={guests} />*/}
                <SpaceType
                  changeSpaceTypeState={changeSpaceTypeState}
                  space={space}
                />
                <SortOrder
                  filterName={filterName}
                  filterOrder={filterOrder}
                  changeFilterState={changeFilterState}
                  filter={filter}
                />
              </>
            )}

            <input
              type="submit"
              className="search_btn search_btn_with-icon"
              onClick={searchHandler}
              value=" "
            />
          </div>
        </Container>
      </div>
    );
  }
}

export default FilterHomeNew;
