import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PlaceCard from "../../../../components/PlaceCard";
import Pagination from "react-js-pagination";

import SortOrder from "../../../../components/Filter/SortOrder";
import { connect } from "react-redux";
import "./style.scss";
import Limit from "../../../../components/Filter/Limit";

class SearchList extends Component {
  handlePageChange = pageNumber => {
    this.props.getPlaces(pageNumber);
  };

  render() {
    const { places } = this.props;
    const count = places?.count;
    const placesList = places?.rows;
    return placesList ? (
      <div className="search-page-wrapper">
        {/*<div className={'wrapper_filters'}>*/}
        {/*    <Limit*/}
        {/*        limit={this.props.limit}*/}
        {/*        changeLimitState={this.props.changeLimitState}*/}
        {/*    />*/}
        {/*</div>*/}

        {/*<div className={"sorting"}>*/}
        {/*  <p>Sort by:</p>*/}
        {/*  <SortOrder*/}
        {/*    changeFilterState={this.props.changeFilterState}*/}
        {/*    filter={this.props.filter}*/}
        {/*  />*/}
        {/*</div>*/}

        <div className="search-page-wrapper__list">
          {placesList.map((place, i) => (
            <Link
              key={place.id}
              to={`/place-details/${place.id}`}
              className="place-link"
            >
              <PlaceCard key={`place_card_${i}`} place={place} />
            </Link>
          ))}
        </div>
        <Pagination
          activePage={this.props.offset}
          totalItemsCount={count}
          itemClass={"item-pagination"}
          onChange={this.handlePageChange}
          itemClassPrev={"prev"}
          itemClassNext={"next"}
          prevPageText="Previous"
          nextPageText="Next"
        />
      </div>
    ) : (
      <h1>venues is not found</h1>
    );
  }
}

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = {
  // setCurrentPage
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchList);
