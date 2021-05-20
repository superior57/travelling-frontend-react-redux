import React from "react";
import PlaceCard from "../PlaceCard";
import { Link } from "react-router-dom";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./style.scss";

function SliderBlock(props) {
  const { places, slider } = props;

  // const SlickButtonLeft = ({ currentSlide, slideCount, ...props }) => {
  //   const { className } = props;
  //   return <span {...props} className={className + " prev-arrow"}></span>;
  // };

  // const SlickButtonRight = ({ currentSlide, slideCount, ...props }) => {
  //   const { className } = props;
  //   return <span {...props} className={className + " next-arrow"}></span>;
  // };

  const settings = {
    dots: false,
    infinite: false,
    speed: 700,
    slidesToShow: 5,
    slidesToScroll: 1
  };

  return (
    <>
      {places && (
        <Slider ref={slider} {...settings}>
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
    </>
  );
}

export default SliderBlock;
