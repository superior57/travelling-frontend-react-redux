import React, { useEffect } from "react";

import "./index.scss";
import ExploreIcon from "../../../../assets/icons/explore-icon.png";

import Art from "../../../../assets/discover/art.png";
import Graduation from "../../../../assets/discover/graduation.png";
import Concert from "../../../../assets/discover/concert.png";
import Kickstarter from "../../../../assets/discover/kickstarter.png";
import Wedding from "../../../../assets/discover/wedding.png";
import Charity from "../../../../assets/discover/charity.png";
import Conference from "../../../../assets/discover/conference.png";
import Press from "../../../../assets/discover/press.png";
import Roof from "../../../../assets/discover/roof.png";
import Product from "../../../../assets/discover/product.png";
import history from "../../../../history";
import { connect } from "react-redux";

import {
  getPopularEventType,
  getPopularEventTypeAll
} from "../../../../redux/actions/places.actions/places.thunk";

import NoImage from "../../../../assets/NoImage.jpg";

const DiscoverPlaces = ({
  getPopularEventType,
  popularEventType,
  getPopularEventTypeAll
}) => {
  const discoverImages = [
    Product,
    Roof,
    Press,
    Conference,
    Charity,
    Wedding,
    Kickstarter,
    Concert,
    Graduation,
    Art
  ];

  useEffect(() => {
    getPopularEventType();
  }, []);

  const handlerByEventTypeAll = () => {
    getPopularEventTypeAll();
  };

  const handlerByEventType = event => {
    const eventType = event.target.getAttribute("data-name");
    let searchString = "?";

    if (eventType) {
      searchString += `event=${eventType}&`;
    }

    history.push({ pathname: `/listing`, search: searchString });
  };

  return (
    <div className="discover-places">
      <div className="container-home">
        <h1 className="PopularSearches__headline">
          Discover Venues<span> | By Event Type</span>
        </h1>
        <h2 className="PopularSearches__subheadline">
          Discover your perfect venues according to event type across the world
        </h2>
        <div className="explore-wrapper" onClick={handlerByEventTypeAll}>
          <div className="stroke"></div>
          <div class="explore">
            <img src={ExploreIcon} alt="explore icon" />
            <span className="explore__text">Explore all</span>
          </div>
        </div>
        <div className="discover-places__list">
          {popularEventType &&
            popularEventType.map((place, index) => (
              <div
                data-name={place.id}
                onClick={handlerByEventType}
                style={{
                  backgroundImage: `url(${discoverImages[index] || NoImage})`
                }}
                className="discover-places__card"
              >
                <div
                  data-name={place.id}
                  className="discover-places__card-info"
                >
                  <span
                    data-name={place.id}
                    className="discover-places__card-name"
                  >
                    {place.name}
                  </span>
                  <span
                    data-name={place.id}
                    className="discover-places__card-venues"
                  >
                    {place.buildings.length} Venues
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  popularEventType: state.place.popularEventType
});

export default connect(mapStateToProps, {
  getPopularEventType,
  getPopularEventTypeAll
})(DiscoverPlaces);
