import React, { useRef } from "react";
// import SliderBlock from "../../../../components/SliderBlock";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import PlaceCard from "../PlaceCard";
import PlaceCard from "../../../../components/PlaceCard";
import { Link } from "react-router-dom";

import Slider from "react-slick";
import "./style.scss";

const settings = {
  dots: false,
  infinite: false,
  speed: 700,
  slidesToShow: 5,
  slidesToScroll: 1
};

class RatedPlaces extends React.PureComponent {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }

  next() {
    this.slider.slickNext();
  }

  previous() {
    this.slider.slickPrev();
  }

  render() {
    const { places } = this.props;

    return (
      <div className="PopularSearches">
        <div className="container-home">
          <h1 className="PopularSearches__headline">
            Top Rated Venues<span> | For Events</span>
          </h1>
          <h2 className="PopularSearches__subheadline">
            Our top rated venues for events across the world
          </h2>
          <div className="stroke__wrapper">
            <div className="stroke"></div>
            <div className="slider__arrows">
              <span className="prev-arrow" onClick={this.previous}></span>
              <span className="next-arrow" onClick={this.next}></span>
            </div>
          </div>
          <div className="PopularSearches__sliders">
            {places && (
              <Slider ref={c => (this.slider = c)} {...settings}>
                {places.map((place, i) => (
                  <Link
                    key={place.id}
                    to={`/place-details/${place.id}`}
                    className="place-link"
                  >
                    <PlaceCard place={place} order={i}></PlaceCard>
                  </Link>
                ))}
              </Slider>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default RatedPlaces;
