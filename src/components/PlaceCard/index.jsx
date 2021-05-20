import React from "react";
import PropType from "prop-types";
import starPng from "./assets/star.png";
import Slider from "react-slick";
import ReactPlayer from "react-player";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.scss";
import InfoIcon from "../../assets/icons/info-icon.png";
import HeartIcon from "../../assets/icons/heart-icon.png";

import DefaultPhoto from "../../assets/default_photo_search.png";

export default function PlaceCard({ place, order, popularPlace, classes }) {
  const SlickButtonFix = ({ currentSlide, slideCount, ...props }) => (
    <span {...props}></span>
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    prevArrow: <SlickButtonFix />,
    nextArrow: <SlickButtonFix />,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className={`place-card ${classes}`}>
      <div className={`place-card-image ${classes}`}>
        <img
          src={place.image || DefaultPhoto}
          alt={place.name}
          className={`place-card-image-img ${classes}`}
        />
      </div>
      <div className={`place-card-title-wrapper  ${classes}`}>
        <span className={`place-card-title  ${classes}`} title={place?.name}>
          {place?.name}
        </span>
      </div>

      {!popularPlace && (
        <>
          <p
            className="place-card-text"
            title={
              place?.city?.city_name +
              ", " +
              place?.address?.zip_code +
              ", " +
              place?.country?.country_name
            }
          >
            {place
              ? place.city?.city_name +
                ", " +
                place.address?.zip_code +
                ", " +
                place.country?.country_name
              : "address doesn't exist"}
          </p>
          <div className="place-card__price-and-capacity">
            <div className="place-card-price-wrapper">
              <span className="place-card-price">${place.price || "0"}</span>/
              <span className="place-card-persons">
                {place.priceType || "none"}
              </span>
            </div>
            <div className="place-card-capacity">
              <span className="place-card-capacity-amount">
                {place.persons || ""}
              </span>
              |
              <div className="place-card-rate-wrapper">
                <span className="place-card-rate">{place.rating || "0"}</span>
                <img src={HeartIcon} alt="heart icon" />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

PlaceCard.propType = {
  place: PropType.object
};
